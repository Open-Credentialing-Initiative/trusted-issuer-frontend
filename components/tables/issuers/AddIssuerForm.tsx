import { useState } from "react";
import {
  Sheet, SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../../ui/sheet";
import {Button} from "../../ui/button";
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "../../ui/popover";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandItem} from "../../ui/command";
import {
  AddressType,
  ATP_LIST_HASH,
  BYTES32_TRUE,
  cn,
  Environment,
  getAddress,
  IDENTITY_LIST_HASH
} from "../../../lib/utils";
import {CredentialType} from "./TrustedIssuerColumns";
import {useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {TRUSTED_HINT_ABI} from "../../../lib/abi";
import {keccak256, stringToHex} from "viem";

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

export default function AddIssuerForm({ environment, refetch }: { environment: Environment, refetch: () => void }) {
  const {address} = useAccount();
  const [didValue, setDidValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [credentialTypeValue, setCredentialTypeValue] = useState("");
  const [open, setOpen] = useState(false);

  const registryAddress = getAddress(environment, AddressType.REGISTRY)
  const safeAddress = getAddress(environment, AddressType.SAFE, address)

  const { config: configAddIssuer } = usePrepareContractWrite({
    address: registryAddress,
    abi: TRUSTED_HINT_ABI,
    functionName: 'setHint',
    args: [
      safeAddress,
      credentialTypeValue === CredentialType.DSCSAATPCredential.toLowerCase() ? ATP_LIST_HASH : IDENTITY_LIST_HASH,
      keccak256(stringToHex(didValue)),
      BYTES32_TRUE,
      stringToHex([didValue,nameValue].join(","))
    ],
    // @ts-ignore
    value: 0n,
    enabled: !!didValue || !!nameValue || !!credentialTypeValue
  })
  const { data, write: addIssuer,  } = useContractWrite(configAddIssuer)
  const { data: txData, isLoading, isError, isSuccess } = useWaitForTransaction({ hash: data?.hash })

  if (isSuccess) {
    refetch()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="shadow-sm"
          disabled={isLoading}
        >
          { isLoading ? "Adding..." : "Add Trusted Issuer" }
        </Button>
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
  );
}
