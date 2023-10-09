"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../../components/ui/table"
import {useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import {Label} from "../ui/label";
import {Command, CommandEmpty, CommandGroup, CommandItem} from "../ui/command";
import {cn} from "../../lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {Check, ChevronsUpDown} from "lucide-react";
import {CredentialType} from "./columns";
import {useContractWrite, usePrepareContractWrite} from "wagmi";
import {TRUSTED_HINT_ABI} from "../../lib/abi";
import {keccak256, stringToHex} from "viem";
import {ATP_LIST_HASH, IDENTITY_LIST_HASH} from "../../pages";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const credentialTypes = [
  {
    value: CredentialType.DSCSAATPCredential.toLowerCase(),
    label: CredentialType.DSCSAATPCredential,
  },
  {
    value: CredentialType.IdentityCredential.toLowerCase(),
    label: CredentialType.IdentityCredential,
  }
]

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const [open, setOpen] = useState(false)
  const [credentialTypeValue, setCredentialTypeValue] = useState(CredentialType.DSCSAATPCredential.toLowerCase())
  const [didValue, setDidValue] = useState("")
  const [nameValue, setNameValue] = useState("")

  const table = useReactTable({
    data,
    columns,
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

  const { config: configAddIssuer } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
    abi: TRUSTED_HINT_ABI,
    functionName: 'setHint',
    args: [
      process.env.NEXT_PUBLIC_SAFE_ADDRESS as `0x${string}`,
      credentialTypeValue === CredentialType.DSCSAATPCredential.toLowerCase() ? ATP_LIST_HASH : IDENTITY_LIST_HASH,
      keccak256(stringToHex(didValue)),
      "0x1000000000000000000000000000000000000000000000000000000000000000",
      stringToHex([didValue,nameValue].join(","))
    ],
    value: 0n,
    enabled: !!didValue || !!nameValue || !!credentialTypeValue
  })
  const { write: addIssuer } = useContractWrite(configAddIssuer)

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter DIDs..."
          value={(table.getColumn("did")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("did")?.setFilterValue(event.target.value)
          }
          className="max-w-sm shadow-sm"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shadow-sm">Add Trusted Issuer</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Trusted Issuer</SheetTitle>
              <SheetDescription>
               Propose a new trusted issuer for a credential type.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="did" className="text-right">
                  DID
                </Label>
                <Input
                  id="did"
                  placeholder="did:ethr:0x..."
                  value={didValue}
                  onChange={(e) => setDidValue(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Company XYZ"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Type
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="col-span-3 justify-between font-normal"
                    >
                      {credentialTypeValue
                        ? credentialTypes.find((credentialType) => credentialType.value === credentialTypeValue)?.label
                        : "Select..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandEmpty>No credential type found.</CommandEmpty>
                      <CommandGroup>
                        {credentialTypes.map((credentialType) => (
                          <CommandItem
                            key={credentialType.value}
                            onSelect={(currentValue) => {
                              setCredentialTypeValue(currentValue === credentialTypeValue ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                credentialTypeValue === credentialType.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {credentialType.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  disabled={!didValue || !nameValue || !credentialTypeValue}
                  onClick={(e) => {
                    addIssuer?.()
                  }}
                >
                  Add Trusted Issuer
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
