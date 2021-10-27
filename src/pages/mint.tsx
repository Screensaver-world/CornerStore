import { FormStep, NumberInput, TextArea, TextInput } from '../components/Form';
import Breadcrumb from '../components/Breadcrumb';
import { routes } from './routes';
import { useForm } from 'react-hook-form';
import UploadArea from '../components/Upload';
import Button, { ButtonType } from '../components/Button';
import { useCallback } from 'react';
import { generateNftToken } from 'api/raribleApi';
import { CONTRACT_ID } from 'utils/constants';
import { useWallet } from 'wallet/state';
import { SellRequest } from '@rarible/protocol-ethereum-sdk/build/order/sell';
import { toAddress, toBigNumber } from '@rarible/types';
import { useRouter } from 'next/router';
import { pinFileToIPFS, pinJSONToIpfs } from 'api/pinataApi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggle } from 'hooks/useToggle';
import Modal from 'components/Modal';

const schema = yup.object().shape({
  title: yup.string().required('Name is missing'),
  'file-upload': yup.mixed().required('File is required'),
  price: yup
    .string()
    .required('Price is missing')
    .test('format', 'Inccorect format', (value) => {
      try {
        Number.parseFloat(value);
        return true;
      } catch (e) {
        return false;
      }
    }),
});

const MintPage = () => {
  const form = useForm({ resolver: yupResolver(schema) });
  const [showPreviewPicker, setShowPreviewPicker] = useToggle(false);
  const router = useRouter();
  const [{ address, web3, raribleSDK }] = useWallet();
  const submit = useCallback(
    async (data) => {
      const token = await generateNftToken({ collection: CONTRACT_ID, minter: address });

      const { IpfsHash: item } = await pinFileToIPFS(data['file-upload'][0]);
      let preview;
      if (data['preview-upload']) {
        preview = (await pinFileToIPFS(data['preview-upload'][0])).IpfsHash;
      }
      const { IpfsHash: metadata } = await pinJSONToIpfs(
        JSON.stringify({
          description: data.description,
          name: data.title,
          image: `ipfs://ipfs/${preview ?? item}`,
          creator: address,
          creationDate: new Date(),
          external_url: `localhost:3000/${CONTRACT_ID}:${token.tokenId}`,
          animation_url: preview ? `ipfs://ipfs/${item}` : undefined,
        })
      );

      const nftCollection = await raribleSDK.apis.nftCollection.getNftCollectionById({ collection: CONTRACT_ID });
      await raribleSDK.nft.mint({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        collection: nftCollection,
        uri: `ipfs://ipfs/${metadata}`,
        nftTokenId: token,
        creators: [{ account: toAddress(address), value: 10000 }],
        royalties: data.royalties
          ? [
              {
                account: toAddress(address),
                value: data.royalties * 100,
              },
            ]
          : [],
        lazy: true,
      });

      const request: SellRequest = {
        makeAssetType: {
          assetClass: 'ERC721',
          contract: toAddress(CONTRACT_ID),
          tokenId: toBigNumber(token.tokenId),
        },
        amount: 1,
        maker: toAddress(address),
        originFees: [],
        payouts: [],
        price: web3.utils.toWei(data.price.replace(',', '')).toString(),
        takeAssetType: { assetClass: data['price-currency'] },
      };
      await raribleSDK.order.sell(request);

      router.push(`item/${CONTRACT_ID}:${token.tokenId}`);
    },
    [web3, address]
  );
  const submitForm = form.handleSubmit(submit);
  return (
    <>
      <div className="flex flex-col justify-between px-6 py-6 pt-10 mx-auto max-w-screen-lg">
        <Breadcrumb path={[routes.Home, routes.Mint]} />
        <div className={'flex flex-start my-8 font-bold text-white text-xl'}>Create multiple collectible</div>
        <form onSubmit={submitForm}>
          <div className={'pb-8'}>
            <FormStep title={'Upload File'}>
              <UploadArea form={form} name={'file-upload'} />
            </FormStep>
          </div>
          <div className={'pb-8'}>
            <FormStep title={'Price'}>
              <div className={'w-1/2'}>
                <NumberInput
                  form={form}
                  name={'price'}
                  title={'Enter price for one piece'}
                  placeholder={'5.0 ETH'}
                  type={'currency'}
                  helperText={'Services Fee : 2.5%'}
                  currencies={['ETH', 'RARI', 'wETH']}
                />
              </div>
            </FormStep>
          </div>
          <div className={'pb-8'}>
            <FormStep
              title={'Other Information'}
              footer={
                <div className={'flex justify-end'}>
                  <Button
                    title={'Preview'}
                    type={ButtonType.Secondary}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                  <Button
                    customClasses={'ml-4'}
                    title={'Create Item'}
                    onClick={async (e) => {
                      const item = form.getValues('file-upload');
                      const valid = await form.trigger();
                      if (!valid) {
                        return;
                      }
                      if (item?.[0].type?.startsWith('image')) {
                        return;
                      }
                      setShowPreviewPicker();
                      e.preventDefault();
                    }}
                  />
                </div>
              }
            >
              <TextInput
                label={'Title'}
                placeholder={'e.g. "Redeemable T-Shirt with logo"'}
                form={form}
                name={'title'}
              />
              <TextArea
                title={'Description'}
                placeholder='e.g. "After purchasing you’ll be able to get the real T-Shirt"'
                form={form}
                name={'description'}
              />
              <div className={'grid grid-cols-1 gap-x-4 sm:grid-cols-6'}>
                <div className={'sm:col-span-3'}>
                  <NumberInput
                    title={'Royalties'}
                    type={'percent'}
                    form={form}
                    name={'royalties'}
                    placeholder={'e.g. 10%'}
                    helperText={'Suggested: 0%, 10%, 20%, 30%, Maximum is 50%'}
                  />
                </div>
                <div className={'sm:col-span-3'}>
                  <NumberInput
                    title={'Number of copies'}
                    type={'quantity'}
                    placeholder={'e.g. 20'}
                    form={form}
                    name={'copies'}
                    helperText={'Amount of Tokens'}
                  />
                </div>
              </div>
            </FormStep>
          </div>
          <Modal
            large
            isOpen={showPreviewPicker}
            onClose={setShowPreviewPicker}
            title="Pick preview image"
            description="Preview image"
          >
            <UploadArea
              form={form}
              accept="image/*"
              name={'preview-upload'}
              onFinish={() => {
                setShowPreviewPicker();
                submitForm();
              }}
            />
          </Modal>
        </form>
      </div>
    </>
  );
};

export default MintPage;
