import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import FormItemWrapper, { FormItemWrapperPops } from "./FormitemWrapper";

type TextAreaTypes = {
  title: string;
  placeholder?: string;
  options?: any; //TODO fix tyoe
} & FormItemWrapperPops<any>;

const TextArea: FC<TextAreaTypes> = ({
  name,
  placeholder,
  form,
  title,
  options,
}) => {
  return (
    <FormItemWrapper form={form} name={name} label={title}>
      <div className="mt-1">
        <textarea
          placeholder={placeholder}
          {...form.register(name, options)}
          name={name}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </FormItemWrapper>
  );
};

export default TextArea;
