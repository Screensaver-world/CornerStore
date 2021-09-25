import * as React from "react";
import Button from "components/Button/Button";
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { SUPPORTED_WALLETS } from 'constants/wallet'

interface IProps {
  onFinish?: () => void
}

export const WalletView: React.VFC<IProps> = () => {

    const { active, account, connector, activate, error } = useWeb3React()

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          console.log("ERROR", error)
          // setPendingError(true)
        }
      })
  }


  return (
    <div className="flex flex-col space-y-3 p-7 border border-gray-200 shadow-sm rounded-xl max-w-lg">
      <div className="p-4 border-2 font-medium border-gray-200 shadow-sm rounded-xl cursor-pointer hover:border-blue-300" onClick={() => tryActivation(SUPPORTED_WALLETS['INJECTED'].connector)}>Metamask</div>
      <div className="p-4 border-2 font-medium border-gray-200 shadow-sm rounded-xl cursor-pointer hover:border-blue-300" onClick={() => tryActivation(SUPPORTED_WALLETS['WALLET_CONNECT'].connector)}>Wallet Connect</div>
    </div>
  )
}
