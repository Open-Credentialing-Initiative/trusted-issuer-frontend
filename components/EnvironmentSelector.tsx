import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {Button} from "./ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "./ui/command";
import {cn, Environment} from "../lib/utils";
import {useAccount} from "wagmi";

const environments = [
  {
    value: Environment.PRD,
    label: "PRD (Mainnet)",
    enabled: true
  },
  {
    value: Environment.STK_INT,
    label: "STK-INT (Sepolia)",
    enabled: true
  },
  {
    value: Environment.WLT_INT,
    label: "WLT-INT (Sepolia)",
    enabled: true
  },
  {
    value:Environment.PBL_INT,
    label: "PBL-INT (Sepolia)",
    enabled: false
  }
]

type EnvironmentSelectorProps = {
  setEnvironment: (value: Environment) => void
  environment: Environment
}

export default function EnvironmentSelector({ setEnvironment, environment }: EnvironmentSelectorProps) {
  const {connector} = useAccount();
  const [open, setOpen] = useState(false);

  if (connector?.id === "metaMask") {
    environments[2].enabled = true;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-52 justify-between"
        >
          { environment
            ? environments.find((e) => e.value === environment)?.label
            : "Select environment..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Search environment..." />
          <CommandEmpty>No environment found.</CommandEmpty>
          <CommandGroup>
            {environments.map((e) => (
              <CommandItem
                key={e.value}
                value={e.value}
                onSelect={(currentValue) => {
                  setEnvironment(currentValue as Environment);
                  setOpen(false);
                }}
                className={e.enabled ? "" : "opacity-25"}
                disabled={!e.enabled}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    environment === e.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {e.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
