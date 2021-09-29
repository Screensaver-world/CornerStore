import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ErrorMessage as OriginalErrorMessage } from "@hookform/error-message";

export type TErrorMessageProps = {
  form: Pick<UseFormReturn, "formState">;
  name: string;
};

export default function ErrorMessage({
  form,
  name,
}: TErrorMessageProps): JSX.Element {
  return (
    <OriginalErrorMessage
      errors={form.formState.errors}
      name={name}
      render={(error) => (
        <p className="mt-2 text-sm text-red-600">{error.message}</p>
      )}
    />
  );
}
