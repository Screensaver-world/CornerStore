import { FormStep, NumberInput, TextArea, TextInput } from '../components/Form';
import Breadcrumb from '../components/Breadcrumb';
import { routes } from './routes';
import { useForm } from 'react-hook-form';
import UploadArea from '../components/Upload';
import Button, { ButtonType } from '../components/Button';
import { useCallback, useEffect, useState } from 'react';
import * as IPFS from 'ipfs-core';
import { encodeOrder, generateNftTokenId, makeSellOrder, mint } from 'api/raribleApi';
import { CONTRACT_ID } from 'utils/constants';
import { useWallet } from 'wallet/state';
import { ethers } from 'ethers';
import { CreateNftMetadata, getMintStructure } from 'api/mintStructure';
import { createOrder, getOrderStructure } from 'api/orderStructure';

const ERC721 = 'ERC721';

const MintPage = () => {
  const form = useForm();
  const [ipfs, setIpfs] = useState(null);
  const [data, dispatch] = useWallet();
  useEffect(() => {
    (async () => {
      if (data.ipfs) {
        setIpfs(data.ipfs);
      } else {
        const ipfs = await IPFS.create({ repoAutoMigrate: true });
        dispatch({
          type: 'SET_IPFS',
          payload: ipfs,
        });
        setIpfs(ipfs);
      }
    })();
  }, []);
  const [{ address, web3 }] = useWallet();
  const submit = useCallback(
    async (data) => {
      const { tokenId } = await generateNftTokenId({ collection: CONTRACT_ID, minter: address });

      const { path: image } = await ipfs.add(data['file-upload'][0]);

      const metadata: CreateNftMetadata = {
        name: data.title,
        image: `ipfs://ipfs/${image}`,
        description: data.description,
        external_url: `localhost:3000/0x6ede7f3c26975aad32a475e1021d8f6f39c89d82:${tokenId}`,
      };
      const { path: metadataHash } = await ipfs.add(JSON.stringify(metadata));
      const tokenURI = `ipfs://ipfs/${metadataHash}`;
      const body = {
        '@type': 'ERC721' as typeof ERC721,
        contract: '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82',
        tokenId: tokenId,
        tokenURI,
        uri: tokenURI,
        creators: [
          {
            account: address,
            value: 10000,
          },
        ],
        royalties: data.royalties
          ? [
              {
                account: address,
                value: data.royalties,
              },
            ]
          : [],
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(web3.currentProvider);
      const signature = await provider.send('eth_signTypedData_v4', [address, JSON.stringify(getMintStructure(body))]);
      const signed = { ...body, signatures: [signature] };
      await mint(signed);
      const order = createOrder(address, tokenId, 'ETH', web3.utils.toWei('1'));
      const encodedOrder = await encodeOrder(order);
      console.log(encodedOrder);
      const orderSignature = await provider.send('eth_signTypedData_v4', [
        address,
        JSON.stringify(getOrderStructure(encodedOrder.signMessage.struct)),
      ]);
      console.log({ ...order, signature: orderSignature });
      const ret = await makeSellOrder({ ...order, signature: orderSignature });
      console.log(ret);
    },
    [ipfs, web3, address]
  );
  return (
    <>
      <div className="flex flex-col justify-between max-w-screen-lg px-6 py-6 pt-10 mx-auto">
        <Breadcrumb path={[routes.Home, routes.Mint]} />
        <div className={'flex flex-start my-8 font-bold text-white text-xl'}>Create multiple collectible</div>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className={'pb-8'}>
            <FormStep title={'Upload File'}>
              <UploadArea form={form} />
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
                  currencies={['BTC', 'ETH', 'RARI']}
                />
              </div>
            </FormStep>
          </div>
          <div className={'pb-8'}>
            <FormStep
              title={'Other Information'}
              footer={
                <div className={'flex justify-end'}>
                  <Button title={'Preview'} type={ButtonType.Secondary} />
                  <Button customClasses={'ml-4'} title={'Create Item'} />
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
        </form>
      </div>
    </>
  );
};

export default MintPage;
