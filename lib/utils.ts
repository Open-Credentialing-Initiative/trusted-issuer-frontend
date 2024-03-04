import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Address} from "viem";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BYTES32_FALSE = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const BYTES32_TRUE = "0x1000000000000000000000000000000000000000000000000000000000000000";

export const ATP_LIST_HASH = "0xe35c2140155d7ab105ff242d32e532f2c9ae8597e9bc54107de56cd99f607551";
export const IDENTITY_LIST_HASH = "0x1825a61b3b384c564efb355d7aee9ef08d663bb59b5d308146fcaeaa4a1de1ff";

export const STK_INT_REGISTRY_ADDRESS = "0x6F68c931d785eee932d29A4419B6e28081bbb597";
export const WLT_INT_REGISTRY_ADDRESS = "0x9497Bb14906aa6D4241Adf83708891fAe6ba171C";
export const PBL_INT_REGISTRY_ADDRESS = "0x949AEe13C99Ffd7250DaC5865659DB17744352B9";
export const PRD_REGISTRY_ADDRESS = "0x962646c54ba9C53aA16f662F50175407681B26f3";

export const STK_INT_SAFE_ADDRESS = "0xb229AC3bC15bacCe74A721a722d8098178c22353";
export const WLT_INT_SAFE_ADDRESS = "0x6c151A6139c40966029B9ce8e7b24a4D61215921";
export const PRD_SAFE_ADDRESS = "0xdB2b5db56B34d1455E52E135f01989EFC13E8Cb3";


export enum Environment {
  STK_INT = "stk-int",
  WLT_INT = "wlt-int",
  PBL_INT = "pbl-int",
  PRD = "prd"
}

export enum AddressType {
  REGISTRY,
  SAFE
}

export function getAddress(environment: Environment, addressType: AddressType, walletAddress?: Address): Address {
  switch (environment) {
    case Environment.STK_INT:
      switch (addressType) {
        case AddressType.REGISTRY:
          return STK_INT_REGISTRY_ADDRESS;
        case AddressType.SAFE:
          return STK_INT_SAFE_ADDRESS;
      }
    case Environment.WLT_INT:
      switch (addressType) {
        case AddressType.REGISTRY:
          return WLT_INT_REGISTRY_ADDRESS;
        case AddressType.SAFE:
          return WLT_INT_SAFE_ADDRESS;
      }
    case Environment.PBL_INT:
      switch (addressType) {
        case AddressType.REGISTRY:
          return PBL_INT_REGISTRY_ADDRESS;
        case AddressType.SAFE:
          return walletAddress ? walletAddress : "0x0";
      }
    case Environment.PRD:
      switch (addressType) {
        case AddressType.REGISTRY:
          return PRD_REGISTRY_ADDRESS;
        case AddressType.SAFE:
          return PRD_SAFE_ADDRESS;
      }
    default:
      throw new Error(`Unknown environment: ${environment}`)
  }
}

export function detectEnvironment(walletAddress: Address) {
  if (walletAddress == STK_INT_SAFE_ADDRESS) {
    return Environment.STK_INT;
  } else if (walletAddress == WLT_INT_SAFE_ADDRESS) {
    return Environment.WLT_INT;
  } else if (walletAddress == PRD_SAFE_ADDRESS) {
    return Environment.PRD;
  } else {
    return Environment.PBL_INT;
  }
}

