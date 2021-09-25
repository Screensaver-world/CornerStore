// Forked from Uniswap - https://github.com/Uniswap/uniswap-interface/tree/master/src/components/Web3ReactManager
// removed NetworkContextName - not sure why it was there originally - const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName)

import { useWeb3React } from '@web3-react/core'
import { network } from '../../connectors'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import { useEffect, useState } from 'react'

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { active } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // handle delayed loader state
  const [, setShowLoader] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) return null

  return children
}
