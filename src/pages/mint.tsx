import { FormStep, NumberInput, TextArea, TextInput } from '../components/Form';
import Breadcrumb from '../components/Breadcrumb';
import { routes } from './routes';
import { useForm } from 'react-hook-form';

const MintPage = () => {
  const form = useForm();
  return (
    <>
      <div className="flex-col flex py-6 justify-between max-w-screen-2xl mx-auto px-6 pt-10">
        <Breadcrumb path={[routes.Home, routes.Mint]} />
        <div className={'flex flex-start my-8 bold text-white text-xl'}>Create multiple collectible</div>
        <div className={'pb-8'}>
          <FormStep title={'Upload File'}>

          </FormStep>
        </div>
        <div className={'pb-8'}>
          <FormStep title={'Price'}>
            <NumberInput
              form={form}
              name={'price'}
              title={'Enter price for one piece'}
              placeholder={'5.0 ETH'}
              type={'currency'}
              helperText={'Services Fee : 2.5%'}
              currencies={['BTC', 'ETH', 'RARI']}
            />
          </FormStep>
        </div>
        <div className={'pb-8'}>
          <FormStep title={'Other Information'}>
            <TextInput label={'Title'} placeholder={'e.g. "Redeemable T-Shirt with logo"'} form={form} name={'title'} />
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
      </div>
    </>
  );
};

export default MintPage;
