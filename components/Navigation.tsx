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
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isConnected && connector?.id == "safe"
              ? <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="ring-1 ring-slate-200 p-1 pl-3 pr-3 shadow-sm" variant="secondary">
                      <span className="absolute w-3 h-3 bg-slate-400 border-1 rounded-full animate-pulse"></span>
                      <p className="text-slate-400 font-normal ml-5">Connected</p>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">The app is correctly connected to the Safe wallet environment. Changes can be proposed.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              : <ConnectButton/>}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button type="button"
                    className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                   aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                   aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full"
                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                   alt=""/>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Tom Cook</div>
              <div className="text-sm font-medium text-gray-500">tom@example.com</div>
            </div>
            <button type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                   aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
              </svg>
            </button>
          </div>
          <div className="mt-3 space-y-1">
            <a href="#"
               className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Your
              Profile</a>
            <a href="#"
               className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Settings</a>
            <a href="#"
               className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Sign
              out</a>
          </div>
        </div>
      </div>
    </nav>
  );
}