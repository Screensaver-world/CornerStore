import * as React from 'react';
import Button, { ButtonType } from 'components/Button/Button';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import FormStep from 'components/Form/FormStep';
import { useForm } from 'react-hook-form';
import TextInput from 'components/Form/TextInput';
import TextArea from 'components/Form/TextArea';
import NumberInput from 'components/Form/NumberInput';

export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const form = useForm({ reValidateMode: 'onChange', mode: 'all' });
  return (
    <div className="">
      <Button type={ButtonType.Primary} title="Hello World" onClick={() => alert('Hello World')} />
      <Button type={ButtonType.Main} title="Hello World" onClick={() => alert('Hello World')} />
      <Breadcrumb
        path={[
          { label: 'home', url: '#' },
          { label: 'AAA', url: '#' },
        ]}
      />
      <form onSubmit={form.handleSubmit((a) => console.log(a))}>
        <FormStep title="Profile">
          <TextInput
            type="text"
            form={form}
            label="name"
            name="name"
            options={{ requried: { value: true, message: 'igs' } }}
          />
          <TextArea
            form={form}
            title="as"
            name="as"
            options={{
              required: { value: true, message: 'aaa' },
              minLength: { value: 23, message: 'igs' },
            }}
          />
          <NumberInput
            options={{ required: { value: true, message: 'igs' } }}
            type="currency"
            form={form}
            title="namse"
            name="namse"
            currencies={['EUR', 'ETH', 'BTC']}
          />
        </FormStep>
        <input type="submit" title="as" />
      </form>
    </div>
  );
};

export default Home;
