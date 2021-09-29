import React, { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import ErrorMessage from './ErrorMessage';

export type Props<FormType> = {
  form: UseFormReturn<FormType>;
  name: string;
  children?: ReactNode;
  label?: string;
  helperText?: string;
  optional?: boolean;
};

const FormItemWrapper = <FormType extends FieldValues>({
  form,
  name,
  children,
  label,
  optional,
  helperText,
}: Props<FormType>): JSX.Element => {
  const hasError = form.formState.errors[name];
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {`${label} ${optional ? '(Optional)' : ''}`}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {children}
        {hasError && (
          <>
            <div className="absolute inset-y-0 top-2 right-0 pr-3 pointer-events-none">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
            <ErrorMessage form={form} name={name} />
          </>
        )}
        {!hasError && helperText && <div className={'text-xs mt-2 text-gray-500 bold'}>{helperText}</div>}
      </div>
    </div>
  );
};

export default FormItemWrapper;
