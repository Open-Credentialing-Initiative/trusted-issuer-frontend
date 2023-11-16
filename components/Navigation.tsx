import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";
import {Badge} from "./ui/badge";
import {TooltipProvider} from "@radix-ui/react-tooltip";
import {Tooltip, TooltipContent, TooltipTrigger} from "./ui/tooltip";

export function Navigation() {
  const {isConnected, connector} = useAccount();

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-2">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <img className="block h-10 w-auto" src="/oci-full.png" alt="OCI logo"/>
            </div>
          </div>
          <div className="ml-6 flex items-center">
            { isConnected && connector?.id == "safe"
              ? <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="ring-1 ring-slate-200 p-1 pl-3 pr-3 shadow-sm" variant="secondary">
                        <span className="absolute w-3 h-3 bg-slate-400 border-1 rounded-full animate-pulse"></span>
                        <p className="text-slate-400 font-normal ml-5">Safe Connected</p>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The app is correctly connected to the Safe wallet environment. Changes can be proposed.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              : <ConnectButton/>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}