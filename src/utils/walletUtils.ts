import Onboard from 'bnc-onboard';
import { WalletAction } from 'wallet/actions';
import Web3 from 'web3';

let onboard: ReturnType<typeof Onboard>;

// the network id that your dapp runs on
const NETWORK_ID = 3;
const wallets = [
  { walletName: 'coinbase' },
  //{ walletName: "trust", preferred: true, rpcUrl: RPC_URL },
  { walletName: 'metamask', preferred: true },
  { walletName: 'authereum' },
  // {
  //   walletName: 'trezor',
  //   appUrl: APP_URL,
  //   email: CONTACT_EMAIL,
  //   rpcUrl: RPC_URL
  // },
  // {
  //   walletName: 'ledger',
  //   rpcUrl: RPC_URL
  // },
  // {
  //   walletName: 'lattice',
  //   rpcUrl: RPC_URL,
  //   appName: APP_NAME
  // },
  // {
  //   walletName: 'keepkey',
  //   rpcUrl: RPC_URL
  // },
  // {
  //   walletName: 'mewwallet',
  //   rpcUrl: RPC_URL
  // },
  // {
  //   walletName: 'cobovault',
  //   rpcUrl: RPC_URL,
  //   appName: APP_NAME,
  // },
  // {
  //   walletName: 'keystone',
  //   rpcUrl: RPC_URL,
  //   appName: APP_NAME,
  // },
  // {
  //   walletName: "fortmatic",
  //   apiKey: FORTMATIC_KEY,
  //   preferred: true
  // },
  // {
  //   walletName: "portis",
  //   apiKey: PORTIS_KEY,
  //   preferred: true,
  //   label: 'Login with Email'
  // },
  // {
  //   walletName: "walletConnect",
  //   infuraKey: INFURA_KEY
  // },
  { walletName: 'opera' },
  { walletName: 'operaTouch' },
  { walletName: 'torus' },
  { walletName: 'status' },
  // { walletName: "walletLink" rpcUrl: RPC_URL, appName: APP_NAME }
  // { walletName: "imToken", rpcUrl: RPC_URL },
  { walletName: 'meetone' },
  // { walletName: "mykey", rpcUrl: RPC_URL },
  // { walletName: "huobiwallet", rpcUrl: RPC_URL },
  { walletName: 'hyperpay' },
  // { walletName: "wallet.io", rpcUrl: RPC_URL },
  { walletName: 'atoken' },
  { walletName: 'frame' },
  { walletName: 'ownbit' },
  { walletName: 'alphawallet' },
  { walletName: 'gnosis' },
  { walletName: 'xdefi' },
  { walletName: 'bitpie' },
  { walletName: 'binance' },
  { walletName: 'liquality' },
];

// initialize onboard
const initOnboard = (subscriptions) =>
  Onboard({
    hideBranding: true,
    darkMode: true,
    networkId: NETWORK_ID,
    subscriptions,
    walletSelect: { wallets },
  });

export function getOnboard(dispatch: React.Dispatch<WalletAction>): ReturnType<typeof Onboard> {
  if (!onboard) {
    onboard = initOnboard({
      address: async (address) => {
        dispatch({
          type: 'SET_ADDRESS',
          payload: address,
        });
      },
      network: (network) => {
        dispatch({
          type: 'SET_NETWORK',
          payload: network,
        });
      },
      balance: (balance) => {
        dispatch({
          type: 'SET_BALANCE',
          payload: balance,
        });
      },
      wallet: (wallet) => {
        const web3 = new Web3(wallet.provider);
        dispatch({
          type: 'SET_WALLET',
          payload: wallet,
        });
        dispatch({
          type: 'SET_WEB3',
          payload: web3,
        });
      },
    } as Pick<Parameters<typeof Onboard>[0], 'subscriptions'>);
  }
  return onboard;
}
