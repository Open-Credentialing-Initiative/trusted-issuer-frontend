import {useCallback, useEffect, useState} from 'react';
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

// The RPC provider rejects once a query would return more than ~10,000 results (or takes too long to run).
// Since we can't know the result count up front, fetch optimistically and, if the
// provider rejects the request, split the range in half and retry each half.
async function getHintValueChangedLogsInRange(
  client: PublicClient,
  registryAddress: Address,
  namespace: Address,
  fromBlock: bigint,
  toBlock: bigint
): Promise<HintValueChangedLog[]> {
  try {
    return await client.getLogs({
      address: registryAddress,
      event: HINT_VALUE_CHANGED_ABI_ITEM,
      args: {
        namespace,
      },
      fromBlock,
      toBlock,
    });
  } catch (e) {
    if (fromBlock >= toBlock) {
      throw e;
    }

    const midBlock = fromBlock + (toBlock - fromBlock) / 2n;
    const [lowerLogs, upperLogs] = await Promise.all([
      getHintValueChangedLogsInRange(client, registryAddress, namespace, fromBlock, midBlock),
      getHintValueChangedLogsInRange(client, registryAddress, namespace, midBlock + 1n, toBlock),
    ]);

    return [...lowerLogs, ...upperLogs];
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
/*
 * Returns all Hint events for a given namespace for all Hints that are not removed
 */
function useHintEvents({namespace, registryAddress}: {namespace: Address, registryAddress: Address}) {
  const [events, setEvents] = useState<HintPath[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const client = usePublicClient({ chainId: registryAddress === PRD_REGISTRY_ADDRESS ? 1 : 11155111})

  // useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
  // the refetch function will _not_ be invoked automatically on dependency change or initial render
  // This way we can also stop unnecessary re-renders of the component that uses this hook
  const refetch = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      // Get all events for the given namespace where a hint was added or updated
      const latestBlock = await client.getBlockNumber();
      const deployBlock = REGISTRY_DEPLOY_BLOCKS[registryAddress] ?? 0n;
      const logs = await getHintValueChangedLogsInRange(client, registryAddress, namespace, deployBlock, latestBlock);

      // Map the logs to HintPath objects
      const events = logs.map((log) => ({
        namespace: log.args.namespace as `0x${string}`,
        list: log.args.list as `0x${string}`,
        key: log.args.key as `0x${string}`,
        value: log.args.value as `0x${string}`,
      }));

      const filteredEvents = filterRemovedHints(events);
      setEvents(filteredEvents);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [namespace, registryAddress]);

  // useEffect will run the refetch function on initial render and whenever the refetch function changes
  // the refetch function changes when their dependencies change which triggers a call of refetch itself via useEffect
  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };
    fetchData();
  }, [refetch]);

  // return the events, loading state, error state and the refetch function for external triggering
  return {events, isLoading, isError, refetch}
}

export { useHintEvents };
