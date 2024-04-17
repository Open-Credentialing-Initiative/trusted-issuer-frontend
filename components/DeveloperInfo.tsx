import {useState, useEffect} from 'react';
import {Button} from "./ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog";
import {Input} from "./ui/input";
import {Label} from "./ui/label";
import {
  ATP_LIST_HASH,
  IDENTITY_LIST_HASH, PBL_INT_REGISTRY_ADDRESS, PRD_REGISTRY_ADDRESS, PRD_SAFE_ADDRESS,
  STK_INT_REGISTRY_ADDRESS,
  STK_INT_SAFE_ADDRESS,
  WLT_INT_REGISTRY_ADDRESS, WLT_INT_SAFE_ADDRESS
} from "../lib/utils";
import {useAccount} from "wagmi";

type ButtonTextsState = Record<string, string>;
const copyButtonKeys: string[] = ['atpListHash', 'idListHash', 'prdContract', 'prdNamespace', 'stkIntContract', 'stkIntNamespace', 'wltIntContract', 'wltIntNamespace', 'pblIntContract', 'pblIntNamespace'];

export default function DeveloperInfo() {
  const {connector, address} = useAccount();
  const [isInIframe, setIsInIframe] = useState(false);
  const initialButtonStates = copyButtonKeys.reduce<ButtonTextsState>(
    (acc, key) => ({...acc, [key]: 'Copy'}),
    {} as ButtonTextsState
  );

  const [buttonTexts, setButtonTexts] = useState<ButtonTextsState>(initialButtonStates);

  useEffect(() => {
    // Check if the component is loaded inside an iframe
    setIsInIframe(window.self !== window.top);
  }, []);

  const handleCopy = (info: string, key: string) => {
    navigator.clipboard.writeText(info).then(() => {
      setButtonTexts(prevState => ({...prevState, [key]: 'Copied!'}));
      // Reset button text after 1 second
      setTimeout(() => {
        setButtonTexts(prevState => ({...prevState, [key]: 'Copy'}));
      }, 1000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className="text-sm font-mono text-gray-400 hover:text-gray-500">Show Developer Info</span>
      </DialogTrigger>
      <DialogContent className="font-mono max-h-screen sm:max-h-[700px] mt-10 sm:mt-0 pb-28 sm:pb-0 overflow-auto">
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
              <Input type="text" value={ATP_LIST_HASH}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(ATP_LIST_HASH, 'atpListHash')}>
                  {buttonTexts.atpListHash}
                </Button>
              }
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Identity Credential List</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" value={IDENTITY_LIST_HASH}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(IDENTITY_LIST_HASH, 'idListHash')}>
                  {buttonTexts.idListHash}
                </Button>
              }
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-4"/>
        <div className="space-y-2">
          {/* PRD */}
          <h2 className="text-lg font-medium text-black">PRD</h2>
          <div className="flex flex-col gap-1.5">
            <Label>Contract Address</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" value={PRD_REGISTRY_ADDRESS}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(PRD_REGISTRY_ADDRESS, 'prdContract')}>
                  {buttonTexts.prdContract}
                </Button>
              }
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Namespace</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" value={PRD_SAFE_ADDRESS}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(PRD_SAFE_ADDRESS, 'prdNamespace')}>
                  {buttonTexts.prdNamespace}
                </Button>
              }
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
              <Input type="text" value={STK_INT_REGISTRY_ADDRESS}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(STK_INT_REGISTRY_ADDRESS, 'stkIntContract')}>
                  {buttonTexts.stkIntContract}
                </Button>
              }
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Namespace</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" value={STK_INT_SAFE_ADDRESS}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(STK_INT_SAFE_ADDRESS, 'stkIntNamespace')}>
                  {buttonTexts.stkIntNamespace}
                </Button>
              }
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
              <Input type="text" value={WLT_INT_REGISTRY_ADDRESS}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(WLT_INT_REGISTRY_ADDRESS, 'wltIntContract')}>
                  {buttonTexts.wltIntContract}
                </Button>
              }
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Namespace</Label>
            <div className="flex content-between space-x-2">
              <Input type="text" value={WLT_INT_SAFE_ADDRESS}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(WLT_INT_SAFE_ADDRESS, 'wltIntNamespace')}>
                  {buttonTexts.wltIntNamespace}
                </Button>
              }
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
              <Input type="text" value={PBL_INT_REGISTRY_ADDRESS}/>
              {!isInIframe &&
                <Button className="w-28" onClick={() => handleCopy(PBL_INT_REGISTRY_ADDRESS, 'pblIntContract')}>
                  {buttonTexts.pblIntContract}
                </Button>
              }
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Namespace</Label>
            {connector?.id === "metaMask" && address
              ?
              <div className="flex content-between space-x-2">
                <Input type="text" value={address}/>
                {!isInIframe &&
                  <Button className="w-28" onClick={() => handleCopy(address, 'pblIntNamespace')}>
                    {buttonTexts.pblIntNamespace}
                  </Button>
                }
              </div>
              :
              <span className="text-red-500 font-mono">
                MetaMask not connected. Writing can only be done to the namespace of the connected blockchain account
                on the PBL-INT environment.
              </span>
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
