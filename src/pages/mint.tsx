import { FormStep, NumberInput, TextArea, TextInput } from '../components/Form';
import Breadcrumb from '../components/Breadcrumb';
import { routes } from './routes';
import { useForm } from 'react-hook-form';
import UploadArea from '../components/Upload';
import Button, { ButtonType } from '../components/Button';
import { useCallback, useEffect, useState } from 'react';
import * as IPFS from 'ipfs-core';
import { generateNftTokenId, mint } from 'api/raribleApi';
import { CONTRACT_ID } from 'utils/constants';
import { useWallet } from 'wallet/state';
import { ethers } from 'ethers';
import { getMintStructure } from 'api/mintStructure';

const ERC1155 = 'ERC1155';

const MintPage = () => {
  const form = useForm();
  const [ipfs, setIpfs] = useState(null);
  useEffect(() => {
    (async () => {
      // const ip = await IPFS.create({ repoAutoMigrate: true });
      // setIpfs(ip);
    })();
  }, []);
  const [{ address, web3 }] = useWallet();
  const submit = useCallback(
    async (data) => {
      const { tokenId } = await generateNftTokenId({ collection: CONTRACT_ID, minter: address });
      //const { path } = await ipfs.add('Hello world');
      const body = {
        '@type': 'ERC1155' as typeof ERC1155,
        contract: CONTRACT_ID,
        tokenId: tokenId,
        uri: '/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
        supply: 20,
        creators: [{ account: address, value: 10000 }],
        royalties: [{ account: address, value: 2000 }],
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(web3.currentProvider);
      const signature = await provider.send('eth_sign', [address, JSON.stringify(body)]);
      console.log('data provided to sign (typed structure with message): ', JSON.stringify(getMintStructure(body)));
      console.log(JSON.stringify(body));
      console.log('signature:', signature);
      const signed = { ...body, signatures: [signature] };
      console.log('request body:', signed);

      //THIS RETURNS 400
      await mint(signed);
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
