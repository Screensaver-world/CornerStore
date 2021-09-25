import React, {useState} from "react";
import WalletModal from "components/WalletModal";
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { SUPPORTED_WALLETS } from 'constants/wallet'

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-1/2 pt-8 m-auto text-center">
      <WalletModal open={open} onClose={() => console.log("CLOSED")}/>
      <button onClick={() => setOpen(true)}>open</button>
    </div>
  );
};

export default Home;
