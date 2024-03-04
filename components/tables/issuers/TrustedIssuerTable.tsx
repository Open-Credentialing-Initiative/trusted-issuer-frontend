import {useEffect, useState} from "react";
import {useAccount, useContractReads} from "wagmi";
import {HintPath, useHintEvents} from "../../../hooks/useEvents";
import {TRUSTED_HINT_ABI} from "../../../lib/abi";
import {Address, encodePacked, fromHex, keccak256} from "viem";
import {AddressType, ATP_LIST_HASH, detectEnvironment, Environment, getAddress} from "../../../lib/utils";
import {CredentialType, TrustedIssuer, TrustedIssuerColumns} from "./TrustedIssuerColumns";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import DIDFilter from "./DIDFilter";
import EnvironmentSelector from "../../EnvironmentSelector";
import AddIssuerForm from "./AddIssuerForm";
import RawTable, {LoadingTable} from "../RawTable";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export function TrustedIssuerTable() {
  const { address } = useAccount();
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>(Environment.STK_INT);

  useEffect(() => {
    if (address) {
      setSelectedEnvironment(detectEnvironment(address));
    }
  }, [address]);

  const registryAddress = getAddress(selectedEnvironment, AddressType.REGISTRY)
  const safeAddress = getAddress(selectedEnvironment, AddressType.SAFE, address)

  // Get all events for active/ non-deleted hints and retrieve their metadata on the safe's namespace
  const {events: logs, isLoading: eventsLoading, isError: eventsError, refetch} = useHintEvents({namespace: safeAddress, registryAddress});
  const {data: metadata, isLoading: metadataLoading, isError: metadataError } = useContractReads({
    contracts: logs.map((log: any) => {
      return {
        address: registryAddress,
        abi: TRUSTED_HINT_ABI,
        functionName: 'getMetadata',
        args: [
          log.namespace,
          log.list,
          log.key,
          log.value,
        ],
        chainId: selectedEnvironment === Environment.PRD ? 1 : 11155111
      }
    }),
    enabled: !eventsLoading && !eventsError
  });

  if (eventsError || metadataError) {
    return (
      <div className="flex-row py-4 space-y-3">
        <p className="text-red-500 font-mono">Error loading trusted issuers table.</p>
      </div>
    )
  }

  if (eventsLoading || metadataLoading) {
    return (
      <div className="flex-row py-4 space-y-3">
        <Skeleton className="border border-slate-200" width={350} height={35}/>
        <LoadingTable/>
      </div>
    )
  }

  return (
    <TrustedIssuerDetailsTable
      address={address ?? "0x0"}
      logs={logs}
      // useContractReads does not seem to retain the type of the contract calls
      // wagmi maintainer itself recommends to just cast the type -> cast metadata to correct type
      // https://github.com/wagmi-dev/wagmi/issues/1341
      metadata={metadata as Metadata[]}
      environment={selectedEnvironment}
      setEnvironment={setSelectedEnvironment}
      refetch={refetch}
    />
  )
}

type Metadata = {
  result: Address,
  status: string
}

type TrustedIssuerDetailsTableProps = {
  address: Address,
  logs: HintPath[]
  metadata: Metadata[],
  environment: Environment,
  setEnvironment: (environment: Environment) => void,
  refetch: () => void
}

function TrustedIssuerDetailsTable({address, logs, metadata, environment, setEnvironment, refetch}: TrustedIssuerDetailsTableProps) {
  const [issuers, setIssuers] = useState<TrustedIssuer[]>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const {connector} = useAccount();

  useEffect(() => {
    if (!metadata || !logs) {
      return;
    }
    // useContractReads does not seem to retain the type of the contract calls
    // wagmi maintainer itself recommends to just cast the type
    // https://github.com/wagmi-dev/wagmi/issues/1341
    setIssuers((metadata as Metadata[]).map((metadataEntry, i) => {
      if (metadataEntry.status !== "success") {
        return {
          did: "",
          name: "",
          credentialType: CredentialType.Unknown
        }
      }
      // Metadata is encoded as a comma separated string
      // Format: "did,name"
      // e.g. "did:example:example,Example Company"
      const decoded = fromHex(metadataEntry.result, 'string').split(',');
      return {
        did: decoded[0],
        name: decoded[1],
        credentialType: logs[i].list === ATP_LIST_HASH ? CredentialType.DSCSAATPCredential : CredentialType.IdentityCredential
      }
    }));
  }, [address, environment, metadata, logs]);

  const columns = TrustedIssuerColumns(environment, refetch);
  const table = useReactTable({
    data: issuers,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    },
  })

  return (
    <>
      <div className="flex-row sm:flex justify-between items-center py-4 space-y-2 sm:space-y-0">
        <DIDFilter table={table}/>
        <div className="flex space-x-2">
          { connector?.id !== "safe" && <EnvironmentSelector environment={environment} setEnvironment={setEnvironment}/> }
          {
            ( connector?.id === "safe"
              || (!!connector?.id && environment === Environment.PBL_INT)
              || address === getAddress(environment, AddressType.SAFE, address)
            ) &&
            <AddIssuerForm environment={environment} refetch={refetch}/>
          }
        </div>
      </div>
      <RawTable table={table} columns={columns}/>
    </>
  )
}