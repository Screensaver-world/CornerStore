import React from "react";
import { WalletView } from "./";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "WalletView",
  decorators: [withKnobs],
};

export const primary = () => {
  return (
    <WalletView />
  );
};
