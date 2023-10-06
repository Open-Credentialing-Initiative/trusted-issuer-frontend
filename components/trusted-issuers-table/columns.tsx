import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown} from "lucide-react"

import {Button} from "../../components/ui/button"
import {TooltipProvider} from "@radix-ui/react-tooltip"
import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip";

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
    cell: ({ row }) => {
      const trustedIssuer = row.original
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="font-normal hover:underline">Delete</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Propose Statekeepers to remove this trusted DID.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]
