import { ChainId, Token } from "sdk";
import { SerializedToken } from "config/types";

const MAINNET = ChainId.MAINNET;
const TESTNET = ChainId.TESTNET;

interface TokenList {
  [symbol: string]: Token;
}

interface SerializedTokenList {
  [symbol: string]: SerializedToken;
}

export const mainnetTokens = {
  wbnb: new Token(
    MAINNET,
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    18,
    "WBNB",
    "Wrapped BNB",
    "https://www.binance.com/"
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(MAINNET, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 18, "BNB", "BNB", "https://www.binance.com/"),
  cake: new Token(
    MAINNET,
    "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    18,
    "CAKE",
    "PancakeSwap Token",
    "https://pancakeswap.finance/"
  ),
};

export const testnetTokens = {
  wbnb: new Token(
    TESTNET,
    "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
    18,
    "WBNB",
    "Wrapped BNB",
    "https://www.binance.com/"
  ),
  cake: new Token(
    TESTNET,
    "0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe",
    18,
    "CAKE",
    "PancakeSwap Token",
    "https://pancakeswap.finance/"
  ),
};

const tokens = (): TokenList => {
  const chainId = process.env.REACT_APP_CHAIN_ID;

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  // if (parseInt(chainId, 10) === ChainId.TESTNET) {
  //   return Object.keys(mainnetTokens).reduce((accum, key) => {
  //     return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] };
  //   }, {});
  // }

  if (parseInt(chainId, 10) === TESTNET) {
    return testnetTokens;
  }

  return mainnetTokens;
};

export const serializedTokens = (): SerializedTokenList => {
  const unserializedTokens = tokens();
  const serializedTokens = Object.keys(unserializedTokens).reduce((prev, current) => {
    return { ...prev, [current]: serializedTokens[current] };
  }, {});

  return serializedTokens;
};
