import getWertWidget from 'api/wertioApi';
import Button from 'components/Button';
import { NumberInput } from 'components/Form';
import Modal, { ModalProps } from 'components/Modal';
import { useToggle } from 'hooks/useToggle';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Currencies } from 'types';
import { matchOrder } from 'utils/raribleApiUtils';
import { useWallet } from 'wallet/state';

type Props = Omit<ModalProps, 'title' | 'description'> & {
  price: number;
  currency: Currencies;
  orderHash: string;
  title: string;
};

function CheckoutModal({ price, currency, orderHash, title, ...props }: Props) {
  const [{ address, web3, balance }] = useWallet();
  const onSubmit = useCallback(async () => {
    const tx = await matchOrder(address, orderHash, 1);
    await web3.eth.sendTransaction(tx);
    location.reload();
  }, [address, orderHash, price]);
  const form = useForm({
    defaultValues: {
      quantity: 1,
      price: web3?.utils?.fromWei(price.toString()),
      'price-currency': 'ETH',
    },
  });
  const info = [
    { key: 'Balance', value: web3?.utils?.fromWei(balance) },
    { key: 'Service Fee', value: web3?.utils?.fromWei((price * 0.025).toString()) },
    { key: 'Item Price', value: web3?.utils?.fromWei(price.toString()) },
  ];
  const insufficient = Number.parseInt(balance) < price;
  const [showWertModal, setShowWertModal] = useToggle(false);
  const wertWidget = getWertWidget(address);

  return (
    <>
      <Modal {...props} title={'Checkout'} description={`You are about to purchase a ${title}`}>
        {showWertModal ? (
          <iframe
            allow="camera *; microphone *"
            className="w-full h-full"
            style={{ height: 505 }}
            src={wertWidget.getEmbedUrl()}
          />
        ) : (
          <>
            <NumberInput
              type={'quantity'}
              form={form}
              name={'quantity'}
              helperText={'Enter quantity: 1 available'}
              disabled
            />
            <NumberInput
              disabled
              title={'You Pay'}
              type={'currency'}
              form={form}
              name={'price'}
              currencies={Currencies.all()}
            />
            <div className="flex flex-col pb-2 text-gray-700 gap-y-1">
              {insufficient && <div>Insufficiently Funds</div>}
              {info.map(({ key, value }) => (
                <div key={key} className="flex justify-between">
                  {key} <div>{value}</div>
                </div>
              ))}
            </div>
            <div className={'flex flex-col'}>
              <Button
                title={insufficient ? 'Add Funds' : 'Buy Now'}
                fullWidth
                onClick={insufficient ? setShowWertModal : form.handleSubmit(onSubmit)}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default CheckoutModal;
