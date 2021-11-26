import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/Button';
import { FormStep, TextArea, TextInput } from 'components/Form';
import ChooseProfilePicture from 'features/profile/components/ChooseProfilePicture';
import { useForm } from 'react-hook-form';
import { routes } from 'utils/routes';

const EditProfilePage = () => {
  const form = useForm();
  return (
    <>
      <div className="flex flex-col justify-between max-w-screen-lg px-6 py-6 pt-10 mx-auto">
        <Breadcrumb path={[routes.Home, routes.EditProfile]} />
        <div className={'flex flex-start my-8 font-bold text-white text-xl'}>Edit Profile</div>
        <div className={'pb-8'}>
          <FormStep title={'Profile'}>
            <ChooseProfilePicture />
          </FormStep>
        </div>
        <div className={'pb-8'}>
          <FormStep title={'Other Information'} footer={<Button customClasses={'ml-4'} title={'Update Profile'} />}>
            <div className={'grid grid-cols-1 gap-x-4 sm:grid-cols-6'}>
              <div className={'sm:col-span-3'}>
                <TextInput label={'Display Name'} placeholder={'Enter your display name'} form={form} name={'name'} />
              </div>
              <div className={'sm:col-span-3'}>
                <TextInput label={'Custom URL'} placeholder={'Enter your custom URL'} form={form} name={'url'} />
              </div>
            </div>
            <TextArea title={'Bio'} placeholder="Tell about yourself in a few words" form={form} name={'bio'} />
            <TextInput label={'Twitter Username'} placeholder={'@'} form={form} name={'twitter_username'} />
            <TextInput
              label={'Personal site or portfolio'}
              placeholder={'https://'}
              form={form}
              name={'personal_site'}
            />
          </FormStep>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
