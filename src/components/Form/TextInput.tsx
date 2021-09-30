import React, { FC } from 'react';
import FormItemWrapper, { Props as FormItemWrapperPops } from './FormItemWrapper';

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  options?: any; // TODO update to validation rules
} & FormItemWrapperPops<any>;

const TextInput: FC<Props> = (props) => {
  const { name, type = 'text', placeholder, form, options } = props;
  return (
    <FormItemWrapper {...props}>
      <div className="mt-1">
        <input
          {...form.register(name, options)}
          placeholder={placeholder}
          type={type}
          name={name}
          className="shadow-sm bg-secondary focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600 rounded-md"
        />
      </div>
    </FormItemWrapper>
  );
};

export default TextInput;
