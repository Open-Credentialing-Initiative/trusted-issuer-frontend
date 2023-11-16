import { Input } from "../../ui/input";
import {Table} from "@tanstack/react-table";
import {TrustedIssuer} from "./TrustedIssuerColumns";

export default function DIDFilter({ table }: { table: Table<TrustedIssuer> }) {
  return (
    <Input
      placeholder="Filter DIDs..."
      value={(table.getColumn("did")?.getFilterValue() as string) ?? ""}
      onChange={(event: any) =>
        table.getColumn("did")?.setFilterValue(event.target.value)
      }
      className="max-w-sm shadow-sm"
    />
  );
}
