import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown} from "lucide-react"
import {Button} from "../../../components/ui/button"
import {RemoveIssuerButton} from "./RemoveIssuerButton";
import {Environment} from "../../../lib/utils";

export enum CredentialType {
  DSCSAATPCredential = "DSCSAATPCredential",
  IdentityCredential = "IdentityCredential",
  Unknown = "Unknown",
}

export type TrustedIssuer = {
  did: string
  name: string
  credentialType: CredentialType
}

export const TrustedIssuerColumns = (environment: Environment, refetch: () => void): ColumnDef<TrustedIssuer>[] => [
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
    cell: ({ row }) =>  RemoveIssuerButton(row, environment, refetch),
  },
]
