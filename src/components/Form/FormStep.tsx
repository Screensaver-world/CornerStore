import React, { FC, ReactNode } from 'react';

type Props = { title: string; footer?: ReactNode };

const FormStep: FC<Props> = ({ title, footer, children }) => (
  <div className="max-w-screen-lg	px-4 py-4 space-y-8 sm:space-y-5 bg-secondary">
    <div>
      <div>
        <h3 className="text-lg py-4 leading-6 font-medium text-white py-2 border-b ">{title}</h3>
      </div>
      {children}
    </div>
    <div className="flex justify-end ">{footer}</div>
  </div>
);

export default FormStep;
