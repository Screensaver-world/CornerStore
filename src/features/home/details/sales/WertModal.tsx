import getWertWidget from 'api/wertioApi';
import Modal, { ModalProps } from 'components/Modal';
import React from 'react';
import { useWallet } from 'wallet/state';

type Props = Omit<ModalProps, 'title' | 'description'>;

const WertModal: React.FunctionComponent<Props> = ({ ...props }) => {
  const [{ address }] = useWallet();
  const wertWidget = getWertWidget(address);

  return (
    <Modal {...props} description="" title="Buy Crypto">
      <iframe className="w-full h-full" style={{ height: 505 }} src={wertWidget.getEmbedUrl()} />
    </Modal>
  );
};

export default WertModal;
