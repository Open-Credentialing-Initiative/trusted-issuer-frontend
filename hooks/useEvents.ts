import {useCallback, useEffect, useState} from 'react';
import {Address, createPublicClient, custom, http, parseAbiItem} from "viem";
import {goerli} from "wagmi/chains";

export type HintPath = {
  namespace: `0x${string}`;
  list: `0x${string}`;
  key: `0x${string}`;
  value: `0x${string}`;
}

const DELETE_FLAG = "0x0000000000000000000000000000000000000000000000000000000000000000"

/*
 * Returns all Hint events for a given namespace for all Hints that are not removed
 */
function useHintEvents({namespace, registryAddress}: {namespace: Address, registryAddress: Address}) {
  const [events, setEvents] = useState<HintPath[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
  // the refetch function will _not_ be invoked automatically on dependency change or initial render
  // This way we can also stop unnecessary re-renders of the component that uses this hook
  const refetch = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const client = createPublicClient({
        chain: goerli,
        // @ts-ignore
        transport: window?.ethereum ? custom(window?.ethereum) : http('https://goerli.infura.io/v3/08172298975c488d9692525adb98d347'),
      })

      // Get all events for the given namespace where a hint was added or updated
      const events = await client.getLogs({
        address: registryAddress,
        event: parseAbiItem('event HintValueChanged(address indexed namespace, bytes32 indexed list, bytes32 indexed key, bytes32 value)'),
        args: {
          namespace,
        },
        fromBlock: 'earliest'
      })

      // Filter out removal events where a hint was updated to 0x0... (delete flag)
      const seenObjects: Record<string, HintPath> = {};
      for (let i = 0; i <= events.length - 1; i++) {
        const event = events[i];
        const { namespace, list, key, value } = event.args;
        const path = `${namespace}_${list}_${key}`;

        // When deleting a hint/ trusted issuer value, it gets overwritten with 0x0...
        if (!seenObjects[path] && value != DELETE_FLAG) {
          seenObjects[path] = {
            namespace: event.args.namespace ?? '0x0',
            list: event.args.list ?? '0x0',
            key: event.args.key ?? '0x0',
            value: event.args.value ?? '0x0',
          };
        } else if (value == DELETE_FLAG) {
          delete seenObjects[path];
        }
      }
      setEvents(Object.values(seenObjects) as any)
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [namespace, registryAddress]);

  // useEffect will run the refetch function on initial render and whenever the refetch function changes
  // the refetch function changes when their dependencies change which triggers a call of refetch itself via useEffect
  useEffect(() => {
    refetch();
  }, [refetch]);

  // return the events, loading state, error state and the refetch function for external triggering
  return {events, isLoading, isError, refetch}
}

export { useHintEvents };