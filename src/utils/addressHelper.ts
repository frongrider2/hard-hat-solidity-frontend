import { Address } from "config/types";
import addresses from "config/contracts";
import { ChainId } from "sdk";

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return address[97] ? address[chainId] : address[ChainId.MAINNET];
};

export const getPresaleAddress = (): string => {
  return getAddress(addresses["presale"]);
};

export const getMulticallAddress = (): string => {
  return getAddress(addresses["multicall"]);
};

export const getPresaleTokenAddress = (): string => {
  return getAddress(addresses["presaleToken"]);
};
