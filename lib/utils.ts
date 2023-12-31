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

export const STK_INT_REGISTRY_ADDRESS = "0xaFec50dd5D3599377C74CEEde4fc54C400D28909";
export const WLT_INT_REGISTRY_ADDRESS = "0x1fD876182E3ca7Aa208cF66e659666dc1d372e5C";
export const PBL_INT_REGISTRY_ADDRESS = "0x23307e987aa5e4a4ff7dc2dc4bcea8eed092f5a4";
export const PRD_REGISTRY_ADDRESS = null;

export const STK_INT_SAFE_ADDRESS = "0xb229AC3bC15bacCe74A721a722d8098178c22353";
export const WLT_INT_SAFE_ADDRESS = "0x6c151A6139c40966029B9ce8e7b24a4D61215921";
export const PRD_SAFE_ADDRESS = null;


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
          throw new Error(`No registry address for ${environment}`);
        case AddressType.SAFE:
          throw new Error(`No safe address for ${environment}`);
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
  // } else if (walletAddress == PRD_SAFE_ADDRESS) {
  //   return Environment.PRD;
  } else {
    return Environment.PBL_INT;
  }
}

