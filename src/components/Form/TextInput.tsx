import React, { FC } from 'react';
import FormItemWrapper, { Props as FormItemWrapperPops } from './FormItemWrapper';

type Props = {
  title: string;
  placeholder?: string;
  type: string;
  options?: any; // TODO update to validation rules
} & FormItemWrapperPops<any>;

const TextInput: FC<Props> = ({ name, type, placeholder, form, title, options }) => (
  <FormItemWrapper form={form} name={name} label={title}>
    <div className="mt-1">
      <input
        placeholder={placeholder}
        {...form.register(name, options)}
        type={type}
        name={name}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </FormItemWrapper>
);

export default TextInput;
