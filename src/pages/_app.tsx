import React, { FC } from 'react';
import { AppProps } from 'next/app';
import '../styles/global.css';
import Navbar from 'components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WalletProvider } from 'wallet/state';

const queryClient = new QueryClient({});

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Component {...pageProps} />
      </QueryClientProvider>
    </WalletProvider>
  );
};
export default App;
