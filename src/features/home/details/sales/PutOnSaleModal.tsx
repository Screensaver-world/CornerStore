import React, { useCallback, useEffect } from 'react';
import Modal, { ModalProps } from 'components/Modal';
import { NumberInput } from 'components/Form';
import Button, { ButtonType } from 'components/Button';
import { useForm } from 'react-hook-form';
import { Currencies } from 'types';
import { useWallet } from 'wallet/state';
import { matchOrder } from 'utils/raribleApiUtils';
import { BidsIcon, PriceIcon } from 'assets';
import Image from 'next/image';

type Props = Omit<ModalProps, 'title' | 'description'> & {
  price?: number;
  currency?: Currencies;
  orderHash?: string;
  title?: string;
};

const PutOnSaleModal: React.FunctionComponent<Props> = ({ ...props }) => {
  const options = [
    { title: 'Fixed price', icon: PriceIcon },
    { title: 'Open for bids', icon: BidsIcon },
  ];

  return (
    <Modal {...props} title="Put on sale" description="Chose sale type">
      <div className="flex text-white gap-x-2.5">
        {options.map(({ title, icon }) => (
          <div
            className="flex flex-col items-center w-full pt-10 pb-10 bg-gray-800 border border-gray-700 rounded gap-y-7 border-1 hover:bg-gray-900"
            key={title}
          >
            <Image width={24} height={24} src={icon} />
            <div>{title}</div>
          </div>
        ))}
      </div>
      <div className={'flex flex-col mt-11'}>
        <Button title="Cancel" fullWidth type={ButtonType.Secondary} onClick={props.onClose} />
      </div>
    </Modal>
  );
};

export default PutOnSaleModal;
