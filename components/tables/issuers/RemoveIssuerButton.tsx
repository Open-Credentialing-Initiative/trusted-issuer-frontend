import {Row} from "@tanstack/react-table";
import {useAccount, useContractWrite, useWaitForTransaction} from "wagmi";
import {TRUSTED_HINT_ABI} from "../../../lib/abi";
import {TooltipProvider} from "@radix-ui/react-tooltip";
import {Tooltip, TooltipContent, TooltipTrigger} from "../../ui/tooltip";
import {
  AddressType,
  ATP_LIST_HASH,
  BYTES32_FALSE,
  cn,
  Environment,
  getAddress,
  IDENTITY_LIST_HASH
} from "../../../lib/utils";
import {keccak256, stringToHex} from "viem";
import {CredentialType, TrustedIssuer} from "./TrustedIssuerColumns";

export function RemoveIssuerButton(row: Row<TrustedIssuer>, environment: Environment, refetch: () => void) {
  const { connector, address} = useAccount();

  const trustedIssuer = row.original
  const registryAddress = getAddress(environment, AddressType.REGISTRY)
  const safeAddress = getAddress(environment, AddressType.SAFE, address)
  const writeAllowed = connector?.id == "safe" || (!!connector?.id && address === getAddress(environment, AddressType.SAFE, address))

  const { data, write: removeIssuer } = useContractWrite({
    address: registryAddress,
    abi: TRUSTED_HINT_ABI,
    functionName: 'setHint'
  })
  const {isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

  if (isSuccess) {
    refetch()
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className={cn("font-normal", writeAllowed ? "hover:underline" : "opacity-50 cursor-not-allowed")}
            onClick={() => writeAllowed && removeIssuer?.({
              args: [
                safeAddress,
                trustedIssuer.credentialType === CredentialType.DSCSAATPCredential ? ATP_LIST_HASH : IDENTITY_LIST_HASH,
                keccak256(stringToHex(trustedIssuer.did)),
                BYTES32_FALSE,
              ],
              value: 0n
            })}
          >
            { isLoading ? "Removing..." : "Remove" }
          </span>
        </TooltipTrigger>
        <TooltipContent>
          { writeAllowed
            ? <p>Propose Statekeepers to remove this trusted DID.</p>
            : <p>Use Gnosis Safe to propose to remove this trusted DID.</p>
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}