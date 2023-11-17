import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  ATP_LIST_HASH,
  IDENTITY_LIST_HASH, PBL_INT_REGISTRY_ADDRESS,
  STK_INT_REGISTRY_ADDRESS,
  STK_INT_SAFE_ADDRESS,
  WLT_INT_REGISTRY_ADDRESS, WLT_INT_SAFE_ADDRESS
} from "../lib/utils";
import {useAccount} from "wagmi"; // Assume ANOTHER_CONST is another constant you want to use

type ButtonTextsState = Record<string, string>;
const copyButtonKeys: string[] = ['atpListHash', 'idListHash', 'stkIntContract', 'stkIntNamespace', 'wltIntContract', 'wltIntNamespace', 'pblIntContract', 'pblIntNamespace'];

export default function DeveloperInfo() {
  const { connector, address } = useAccount();
  const initialButtonStates = copyButtonKeys.reduce<ButtonTextsState>(
    (acc, key) => ({ ...acc, [key]: 'Copy' }),
    {} as ButtonTextsState
  );

  const [buttonTexts, setButtonTexts] = useState<ButtonTextsState>(initialButtonStates);

  const handleCopy = (info: string, key: string) => {
    navigator.clipboard.writeText(info);
    setButtonTexts(prevState => ({ ...prevState, [key]: 'Copied!' }));
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    Object.keys(buttonTexts).forEach(key => {
      const typedKey = key;
      if (buttonTexts[typedKey] === 'Copied!') {
        timers.push(setTimeout(() => {
          setButtonTexts(prevState => ({ ...prevState, [typedKey]: 'Copy' }));
        }, 1000));
      }
    });
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [buttonTexts]);


  return (
    <Dialog>
      <DialogTrigger>
        <span className="text-gray-400 hover:text-gray-500">Developer Info</span>
      </DialogTrigger>
      <DialogContent className="max-h-screen mt-10 sm:mt-0 pb-28 sm:pb-0 overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Developer Info</DialogTitle>
          <DialogDescription>
            Trusted issuers can be retrieved with the following information.
          </DialogDescription>
        </DialogHeader>
        <hr className="mt-4 mb-4"/>
        <div className="space-y-2">
          {/* General */}
          <h2 className="text-lg font-medium text-black">General</h2>
          <div className="flex flex-col gap-1.5">
            <Label>ATP Credential Hint List</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" placeholder={ATP_LIST_HASH} disabled />
              <Button className="w-28" onClick={() => handleCopy(ATP_LIST_HASH, 'atpListHash')}>
                {buttonTexts.atpListHash}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Identity Credential List</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" placeholder={IDENTITY_LIST_HASH} disabled />
              <Button className="w-28" onClick={() => handleCopy(IDENTITY_LIST_HASH, 'idListHash')}>
                {buttonTexts.idListHash}
              </Button>
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-4"/>
        <div className="space-y-2">
          {/* STK-INT */}
          <h2 className="text-lg font-medium text-black">STK-INT</h2>
          <div className="flex flex-col gap-1.5">
            <Label>Contract Address</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" placeholder={STK_INT_REGISTRY_ADDRESS} disabled />
              <Button className="w-28" onClick={() => handleCopy(STK_INT_REGISTRY_ADDRESS, 'stkIntContract')}>
                {buttonTexts.stkIntContract}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Namespace</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" placeholder={STK_INT_SAFE_ADDRESS} disabled />
              <Button className="w-28" onClick={() => handleCopy(STK_INT_SAFE_ADDRESS, 'stkIntNamespace')}>
                {buttonTexts.stkIntNamespace}
              </Button>
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-4"/>
        <div className="space-y-2">
          {/* WLT-INT */}
          <h2 className="text-lg font-medium text-black">WLT-INT</h2>
          <div className="flex flex-col gap-1.5">
            <Label>Contract Address</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" placeholder={WLT_INT_REGISTRY_ADDRESS} disabled />
              <Button className="w-28" onClick={() => handleCopy(WLT_INT_REGISTRY_ADDRESS, 'wltIntContract')}>
                {buttonTexts.wltIntContract}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Namespace</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" placeholder={WLT_INT_SAFE_ADDRESS} disabled />
              <Button className="w-28" onClick={() => handleCopy(WLT_INT_SAFE_ADDRESS, 'wltIntNamespace')}>
                {buttonTexts.wltIntNamespace}
              </Button>
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-4"/>
        <div className="space-y-2 mb-8">
          {/* PBL-INT */}
          <h2 className="text-lg font-medium text-black">PBL-INT</h2>
          <div className="flex flex-col gap-1.5">
            <Label>Contract Address</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" placeholder={PBL_INT_REGISTRY_ADDRESS} disabled />
              <Button className="w-28" onClick={() => handleCopy(PBL_INT_REGISTRY_ADDRESS, 'pblIntContract')}>
                {buttonTexts.pblIntContract}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Namespace</Label>
            { connector?.id === "metaMask" && address
              ?
              <div className="flex content-between space-x-2">
                <Input type="text" placeholder={address} disabled />
                <Button className="w-28" onClick={() => handleCopy(address, 'pblIntNamespace')}>
                  {buttonTexts.pblIntNamespace}
                </Button>
              </div>
              :
              <span className="text-red-500 font-mono">
                      MetaMask not connected. Writing can only be done to the namespace of the connected blockchain
                      account.
                    </span>
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
