import React, { FC } from 'react';
import { AppProps } from 'next/app';
import '../styles/global.css';
import Navbar from 'components/Navbar/Navbar';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Navbar />
    <Component {...pageProps} />
  </>
);
export default MyApp;
