import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import reducer from './reducers';
import type { WalletAction } from './actions';
import Web3 from 'web3';
import * as IPFS from 'ipfs-core';
import { createRaribleSdk } from '@rarible/protocol-ethereum-sdk';
import { NETWORK_ID, NETWORK_NAME } from 'utils/constants';

export const initialState: WalletState = {
  balance: '-1',
  address: undefined,
  wallet: { name: '' },
  network: NETWORK_ID,
  web3: undefined,
  ens: undefined,
  raribleSDK: createRaribleSdk(null, NETWORK_NAME),
};

type WalletState = {
  balance: string;
  address: string;
  wallet: { name: string };
  network: number;
  web3?: Web3;
  ens: string;
  ipfs?: IPFS.IPFS;
  raribleSDK: ReturnType<typeof createRaribleSdk>;
};

const WalletContext = createContext<[WalletState, Dispatch<WalletAction>]>(null);
const useWallet = () => useContext(WalletContext);
const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <WalletContext.Provider value={[state, dispatch]}>{children}</WalletContext.Provider>;
};

export type { WalletState };
export { WalletProvider, useWallet };
