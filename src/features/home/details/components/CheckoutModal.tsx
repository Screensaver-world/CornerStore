import React from 'react';
import Modal, { ModalProps } from 'components/Modal';
import { NumberInput } from 'components/Form';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import { Currencies, Currency } from 'types';

type Props = Omit<ModalProps, 'title' | 'description'> & {
  price: number;
  currency: Currencies;
};

function CheckoutModal({ availableQuantity, ...props }: Props) {
  const form = useForm({
    defaultValues: {
      quantity: 1,
      price: 1,
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
        helperText={`Enter quantity: ${availableQuantity} available`}
        disabled
      />
      <NumberInput title={'You Pay'} type={'currency'} form={form} name={'price'} currencies={Currencies.all()} />
      <div className={'flex flex-col'}>
        <Button title={'Add Funds'} fullWidth />
      </div>
    </Modal>
  );
}

export default CheckoutModal;
