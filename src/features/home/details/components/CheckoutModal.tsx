import React, { useCallback } from 'react';
import Modal, { ModalProps } from 'components/Modal';
import { NumberInput } from 'components/Form';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import { Currencies } from 'types';
import { useWallet } from 'wallet/state';
import { matchOrder } from 'utils/raribleApiUtils';

type Props = Omit<ModalProps, 'title' | 'description'> & {
  price: number;
  currency: Currencies;
  orderHash: string;
};

function CheckoutModal({ price, currency, orderHash, ...props }: Props) {
  const [{ address, web3 }] = useWallet();
  const onSubmit = useCallback(async () => {
    const tx = await matchOrder(address, orderHash, price);
    web3.eth.sendTransaction({ ...tx, value: price });
  }, [address, orderHash, price]);
  const form = useForm({
    defaultValues: {
      quantity: 1,
      price: web3.utils.fromWei(price.toString()),
      'price-currency': 'ETH',
    },
  });
  return (
    <Modal
      {...props}
      title={'Checkout'}
      description={'You are about to purchase a #44 Hopper - Abduction from Virtual Land Alliance'}
    >
      <NumberInput
        type={'quantity'}
        form={form}
        name={'quantity'}
        helperText={'Enter quantity: 1 available'}
        disabled
      />
      <NumberInput title={'You Pay'} type={'currency'} form={form} name={'price'} currencies={Currencies.all()} />
      <div className={'flex flex-col'}>
        <Button title={'Add Funds'} fullWidth onClick={form.handleSubmit(onSubmit)} />
      </div>
    </Modal>
  );
}

export default CheckoutModal;
