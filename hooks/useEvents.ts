import {useEffect, useState} from 'react';
import {createPublicClient, custom, parseAbiItem} from "viem";
import {goerli} from "wagmi/chains";

// TODO: Types
function useHintEvents(namespace: `0x${string}`) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const client = createPublicClient({
        chain: goerli,
        // @ts-ignore
        transport: custom(window.ethereum)
      })
      if (client === null) return;

      const events = await client.getLogs({
        address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
        event: parseAbiItem('event HintValueChanged(address indexed namespace, bytes32 indexed list, bytes32 indexed key, bytes32 value)'),
        args: {
          namespace,
        },
        fromBlock: 'earliest'
      })

      // Filter out removal events of trusted issuer
      const seenObjects: Record<string, typeof events> = {};
      for (let i = 0; i <= events.length - 1; i++) {
        const event = events[i];
        const { namespace, list, key, value } = event.args;
        const path = `${namespace}_${list}_${key}`;
        const deleteFlag = "0x0000000000000000000000000000000000000000000000000000000000000000"

        if (!seenObjects[path] && value != deleteFlag) {
          // @ts-ignore
          seenObjects[path] = event;
        } else if (value == deleteFlag) {
          delete seenObjects[path];
        }
      }

      setEvents(Object.values(seenObjects) as any)
    }
    fetchEvents()
  }, [namespace]);

  return events;
}

export { useHintEvents };