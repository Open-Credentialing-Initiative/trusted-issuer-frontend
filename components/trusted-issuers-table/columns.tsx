"use client"

import {ColumnDef, Row} from "@tanstack/react-table"
import {ArrowUpDown} from "lucide-react"
import {Button} from "../../components/ui/button"
import {TooltipProvider} from "@radix-ui/react-tooltip"
import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip";
import {useContractWrite} from "wagmi";
import {TRUSTED_HINT_ABI} from "../../lib/abi";
import {ATP_LIST_HASH, IDENTITY_LIST_HASH} from "../../pages";
import {keccak256, stringToHex} from "viem";

export enum CredentialType {
  DSCSAATPCredential = "DSCSAATPCredential",
  IdentityCredential = "IdentityCredential"
}

export type TrustedIssuer = {
  did: string
  name: string
  credentialType: CredentialType
}

export const columns: ColumnDef<TrustedIssuer>[] = [
  {
    accessorKey: "did",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "credentialType",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Credential Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) =>  DeleteCell(row),
  },
]

function DeleteCell(row: Row<TrustedIssuer>) {
  const trustedIssuer = row.original

  const { write: removeIssuer } = useContractWrite({
    address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
    abi: TRUSTED_HINT_ABI,
    functionName: 'setHint'
  })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className="font-normal hover:underline"
            onClick={() => removeIssuer?.({
              args: [
                process.env.NEXT_PUBLIC_SAFE_ADDRESS as `0x${string}`,
                trustedIssuer.credentialType === CredentialType.DSCSAATPCredential ? ATP_LIST_HASH : IDENTITY_LIST_HASH,
                keccak256(stringToHex(trustedIssuer.did)),
                "0x0000000000000000000000000000000000000000000000000000000000000000"
              ],
              value: 0n
            })}
          >
            Delete
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Propose Statekeepers to remove this trusted DID.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
