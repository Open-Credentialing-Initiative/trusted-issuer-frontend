import {useCallback, useEffect, useRef, useState} from 'react';
import {Address, PublicClient, parseAbiItem} from "viem";
import {usePublicClient} from "wagmi";
import {PRD_REGISTRY_ADDRESS, REGISTRY_DEPLOY_BLOCKS} from "../lib/utils";

export type HintPath = {
  namespace: `0x${string}`;
  list: `0x${string}`;
  key: `0x${string}`;
  value: `0x${string}`;
}

const DELETE_FLAG = "0x0000000000000000000000000000000000000000000000000000000000000000"
const HINT_VALUE_CHANGED_ABI_ITEM = parseAbiItem('event HintValueChanged(address indexed namespace, bytes32 indexed list, bytes32 indexed key, bytes32 value)');

type HintValueChangedLog = {
  args: {
    namespace?: `0x${string}`;
    list?: `0x${string}`;
    key?: `0x${string}`;
    value?: `0x${string}`;
  };
};

// Rate limiting (e.g. Infura's free-tier requests-per-second cap) is retried with
// backoff rather than surfaced as an error straight away.
const isRateLimitError = (e: unknown) => {
  const message = e instanceof Error ? e.message : String(e);
  return /rate limit|too many requests|429/i.test(message);
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_RATE_LIMIT_RETRIES = 5;

// Fetch history in 10,000-block batches, walking backwards from the current tip.
// Each batch's events are merged into the UI as soon as they arrive, instead of
// waiting for the entire history to load before showing anything. Test chains stay
// within this window per request, so we don't need to guard against (and split on)
// the RPC provider's "too many results" rejection here.
const BATCH_BLOCKS = 10_000n;

async function getHintValueChangedLogsInRange(
  client: PublicClient,
  registryAddress: Address,
  namespace: Address,
  fromBlock: bigint,
  toBlock: bigint,
  rateLimitRetries = 0
): Promise<HintValueChangedLog[]> {
  console.log(`[useHintEvents] fetching logs for blocks ${fromBlock}-${toBlock} (${toBlock - fromBlock + 1n} blocks)`);
  try {
    const logs = await client.getLogs({
      address: registryAddress,
      event: HINT_VALUE_CHANGED_ABI_ITEM,
      args: {
        namespace,
      },
      fromBlock,
      toBlock,
    });
    console.log(`[useHintEvents] blocks ${fromBlock}-${toBlock} succeeded with ${logs.length} logs`);
    return logs;
  } catch (e) {
    if (isRateLimitError(e) && rateLimitRetries < MAX_RATE_LIMIT_RETRIES) {
      await sleep(2 ** rateLimitRetries * 250);
      return getHintValueChangedLogsInRange(client, registryAddress, namespace, fromBlock, toBlock, rateLimitRetries + 1);
    }
    throw e;
  }
}

// Function to filter out removed hints from the events array
const filterRemovedHints = (events: HintPath[]) => {
  const seenHints: Record<string, HintPath> = {};

  for (const event of events) {
    const { namespace, list, key, value } = event;
    const hintPath = `${namespace}_${list}_${key}`; // Construct a unique path for the hint

    if (value !== DELETE_FLAG) {
      seenHints[hintPath] = event; // Add the hint to the seenHints object
    } else {
      delete seenHints[hintPath]; // Remove the hint from the seenHints object
    }
  }

  return Object.values(seenHints); // Return an array of the remaining hints
};

const toHintPath = (log: HintValueChangedLog): HintPath => ({
  namespace: log.args.namespace as `0x${string}`,
  list: log.args.list as `0x${string}`,
  key: log.args.key as `0x${string}`,
  value: log.args.value as `0x${string}`,
});

// Walks backwards from `startWindowEnd` in fixed-size batches, invoking `onBatch`
// with each batch's raw logs as soon as it arrives. Stops as soon as a batch
// actually contains events (returning the next windowEnd to resume from later, so
// the caller can pause there and offer a "show more" step) or once it runs out of
// history to walk (returning null). Empty batches don't pause - they're skipped
// silently since there's nothing new to show for them yet.
async function walkBackwardsUntilResults(
  client: PublicClient,
  registryAddress: Address,
  namespace: Address,
  startWindowEnd: bigint,
  deployBlock: bigint,
  onBatch: (windowLogs: HintValueChangedLog[]) => void
): Promise<bigint | null> {
  let windowEnd = startWindowEnd;
  while (windowEnd >= deployBlock) {
    const windowStart = windowEnd - BATCH_BLOCKS + 1n > deployBlock
      ? windowEnd - BATCH_BLOCKS + 1n
      : deployBlock;

    const windowLogs = await getHintValueChangedLogsInRange(client, registryAddress, namespace, windowStart, windowEnd);
    onBatch(windowLogs);

    if (windowStart === deployBlock) {
      return null;
    }

    windowEnd = windowStart - 1n;

    if (windowLogs.length > 0) {
      return windowEnd;
    }
  }
  return null;
}

/*
 * Returns all Hint events for a given namespace for all Hints that are not removed
 */
function useHintEvents({namespace, registryAddress}: {namespace: Address, registryAddress: Address}) {
  const [events, setEvents] = useState<HintPath[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const client = usePublicClient({ chainId: registryAddress === PRD_REGISTRY_ADDRESS ? 1 : 11155111})
  const rawLogsRef = useRef<HintValueChangedLog[]>([]);
  const nextWindowEndRef = useRef<bigint | null>(null);
  const deployBlockRef = useRef<bigint>(0n);

  const mergeBatch = useCallback((windowLogs: HintValueChangedLog[]) => {
    // Prepend, since each batch we walk into is older than everything fetched so far.
    rawLogsRef.current = [...windowLogs, ...rawLogsRef.current];
    setEvents(filterRemovedHints(rawLogsRef.current.map(toHintPath)));
  }, []);

  // useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
  // the refetch function will _not_ be invoked automatically on dependency change or initial render
  // This way we can also stop unnecessary re-renders of the component that uses this hook
  const refetch = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setHasMore(false);
    rawLogsRef.current = [];
    nextWindowEndRef.current = null;
    setEvents([]);
    try {
      const latestBlock = await client.getBlockNumber();
      const deployBlock = REGISTRY_DEPLOY_BLOCKS[registryAddress] ?? 0n;
      deployBlockRef.current = deployBlock;

      if (registryAddress === PRD_REGISTRY_ADDRESS) {
        // PRD has little enough history that it fits in a single request.
        const logs = await getHintValueChangedLogsInRange(client, registryAddress, namespace, deployBlock, latestBlock);
        mergeBatch(logs);
      } else {
        // Test chains accumulate a lot of unrelated QA/integration churn, so walk
        // backwards from the current tip and stop at the first batch with events,
        // leaving the rest of the history to be loaded on demand via loadMore().
        const nextWindowEnd = await walkBackwardsUntilResults(client, registryAddress, namespace, latestBlock, deployBlock, mergeBatch);
        nextWindowEndRef.current = nextWindowEnd;
        setHasMore(nextWindowEnd !== null);
      }
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [namespace, registryAddress, client, mergeBatch]);

  // Resumes the backwards walk from where refetch() (or the previous loadMore())
  // left off, again stopping at the next batch that actually contains events.
  const loadMore = useCallback(async () => {
    if (nextWindowEndRef.current === null) {
      return;
    }
    setIsLoadingMore(true);
    setIsError(false);
    try {
      const nextWindowEnd = await walkBackwardsUntilResults(
        client,
        registryAddress,
        namespace,
        nextWindowEndRef.current,
        deployBlockRef.current,
        mergeBatch
      );
      nextWindowEndRef.current = nextWindowEnd;
      setHasMore(nextWindowEnd !== null);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoadingMore(false);
    }
  }, [namespace, registryAddress, client, mergeBatch]);

  // useEffect will run the refetch function on initial render and whenever the refetch function changes
  // the refetch function changes when their dependencies change which triggers a call of refetch itself via useEffect
  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };
    fetchData();
  }, [refetch]);

  // return the events, loading state, error state and the refetch function for external triggering
  return {events, isLoading, isLoadingMore, isError, hasMore, loadMore, refetch}
}

export { useHintEvents };
