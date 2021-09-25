import "tailwindcss/tailwind.css";
import "styles/global.css"; // <- applied everywhere in the NextJS application scope
import React from "react";
import dynamic from "next/dynamic";
import { AppProps } from "next/app";

const Provider = dynamic(() => import("../state/StoreProvider"), {
  ssr: false,
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider>
    <Component {...pageProps} />
  </Provider>
);
export default MyApp;
