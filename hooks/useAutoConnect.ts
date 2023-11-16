import { useConnect } from 'wagmi';
import {useEffect, useState} from 'react';

const AUTOCONNECTED_CONNECTOR_IDS = ['safe'];

/*
  * This hook will automatically connect the user to the Safe wallet if it is available.
 */
function useAutoConnect() {
  const { connect, connectors } = useConnect();
  const [isConnecting, setIsConnecting] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsConnecting(true)
    try {
      AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
        const connectorInstance = connectors.find((c) => c.id === connector && c.ready);

        if (connectorInstance) {
          connect({ connector: connectorInstance });
        }
      });
    } catch (error) {
      setIsError(true)
    } finally {
      setIsConnecting(false)
    }

  }, [connect, connectors]);

  return { isConnecting, isError }
}

export { useAutoConnect };