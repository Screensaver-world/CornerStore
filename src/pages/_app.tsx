import React, { FC } from 'react';
import { AppProps } from 'next/app';
import '../styles/global.css';
import Navbar from 'components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({});

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Navbar />
    <Component {...pageProps} />
  </QueryClientProvider>
);
export default App;
