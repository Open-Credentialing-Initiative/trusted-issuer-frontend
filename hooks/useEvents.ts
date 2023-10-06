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
        address: '0xcD0af81Ff9fBa3D2626B8441bD6696E91d2301AF',
        event: parseAbiItem('event HintValueChanged(address indexed namespace, bytes32 indexed list, bytes32 indexed key, bytes32 value)'),
        args: {
          namespace,
        },
        fromBlock: 'earliest'
      })
      setEvents(events as any)
    }
    fetchEvents()
  }, [namespace]);

  return events;
}

export { useHintEvents };