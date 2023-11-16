import {Row} from "@tanstack/react-table";
import {useAccount, useContractWrite} from "wagmi";
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

export function RemoveIssuerButton(row: Row<TrustedIssuer>, environment: Environment) {
  const { connector, address} = useAccount();

  const trustedIssuer = row.original
  const registryAddress = getAddress(environment, AddressType.REGISTRY)
  const safeAddress = getAddress(environment, AddressType.SAFE, address)

  const { write: removeIssuer } = useContractWrite({
    address: registryAddress,
    abi: TRUSTED_HINT_ABI,
    functionName: 'setHint'
  })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className={cn("font-normal", connector?.id !== "safe" ? "opacity-50 cursor-not-allowed" : "hover:underline")}
            onClick={() => connector?.id == "safe" && removeIssuer?.({
              args: [
                safeAddress,
                trustedIssuer.credentialType === CredentialType.DSCSAATPCredential ? ATP_LIST_HASH : IDENTITY_LIST_HASH,
                keccak256(stringToHex(trustedIssuer.did)),
                BYTES32_FALSE,
              ],
              value: 0n
            })}
          >
            Delete
          </span>
        </TooltipTrigger>
        <TooltipContent>
          { connector?.id == "safe"
            ? <p>Propose Statekeepers to remove this trusted DID.</p>
            : <p>Use Gnosis Safe to propose to remove this trusted DID.</p>
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}