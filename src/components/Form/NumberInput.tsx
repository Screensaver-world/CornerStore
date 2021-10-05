import React, { FC } from 'react';
import CurrencyInput from 'react-currency-input-field';
import FormItemWrapper, { Props as FormItemWrapperPops } from './FormItemWrapper';

type Props = {
  title?: string;
  placeholder?: string;
  type: 'currency' | 'percent' | 'quantity';
  options?: any; // TODO update to validation rules
  currencies?: string[];
  allowDecimals?: boolean;
} & FormItemWrapperPops<any>;

const NumberInput: FC<Props> = ({
  name,
  type,
  placeholder,
  form,
  title,
  currencies,
  options,
  allowDecimals,
  helperText,
}) => (
  <FormItemWrapper form={form} name={name} label={title} helperText={helperText}>
    <div className="mt-1">
      <CurrencyInput
        allowDecimals={type !== 'quantity' && allowDecimals}
        placeholder={placeholder}
        {...form.register(name, options)}
        type="text"
        name={name}
        className="block w-full text-white border-gray-600 shadow-sm bg-secondary focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      {type === 'percent' && (
        <div className="absolute inset-y-0 right-0 pr-3 pointer-events-none top-2">
          <div
            className="inline-flex items-center px-2 font-sans text-sm font-medium text-gray-400 rounded"
            aria-hidden="true"
          >
            %
          </div>
        </div>
      )}
      {type === 'currency' && currencies && (
        <div className="absolute inset-y-0 items-center top-px right-2">
          <select className="inline-flex items-center font-sans text-sm font-medium text-gray-400 border-0 border-none rounded bg-secondary">
            {currencies.map((currency) => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  </FormItemWrapper>
);

export default NumberInput;
