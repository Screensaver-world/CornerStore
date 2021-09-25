import React from "react";
import Modal from "./Modal";
import { WalletView } from "./WalletView";

interface IProps {
  open: boolean;
  onClose: () => void;
}
const WalletModal: React.VFC<IProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      title={"Wallet"}
      onClose={() => {
        onClose();
      }}
    >
        <WalletView />
    </Modal>
  );
};

export default WalletModal;
