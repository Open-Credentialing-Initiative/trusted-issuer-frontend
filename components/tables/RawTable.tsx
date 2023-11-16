import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "../ui/table";
import {ColumnDef, flexRender} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {Table as ReactTable} from "@tanstack/react-table";
import {TrustedIssuer} from "./issuers/TrustedIssuerColumns";

type TrustedIssuerDetailsTableProps = {
  table: ReactTable<TrustedIssuer>
  columns: ColumnDef<TrustedIssuer>[]
}
export default function RawTable({ table, columns }: TrustedIssuerDetailsTableProps) {
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
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
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell: any) => (
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
  );
}

export function LoadingTable({rowCount = 5}: {rowCount?: number}) {
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>
              <Skeleton />
            </TableHead>
            <TableHead>
              <Skeleton />
            </TableHead>
            <TableHead>
              <Skeleton />
            </TableHead>
            <TableHead>
              <Skeleton />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { Array.from({ length: rowCount }, (_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
