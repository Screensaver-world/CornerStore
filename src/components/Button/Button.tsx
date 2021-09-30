import React, { FC } from 'react';
// TODO: add  clicked, hover effects

const BASE_BUTTON =
  'text-white font-bold outline-none rounded shadow py-2 px-4 font-normal focus:outline-none border border-transparent';

export enum ButtonType {
  Primary = 'bg-gradient-to-b from-primary-start to-primary-stop bg-origin-border	',
  Secondary = 'bg-secondary border-gray-800 ',
  Main = 'bg-main border-gray-800',
}

type Props = {
  title?: string;
  // TODO change type?
  icon?: string;
  iconRight?: boolean;
  onClick?(): void;
  type: ButtonType;
  fullWidth?: boolean;
};

const Button: FC<Props> = ({ onClick, icon, title, iconRight, fullWidth, type = ButtonType.Primary }) => (
  <button
    onClick={onClick}
    className={`${BASE_BUTTON} ${type} ${fullWidth ? 'w-full' : 'w-max'} inline-flex ${
      iconRight ? 'flex-row' : 'flex-row-reverse'
    }`}
  >
    {title && <span>{title}</span>}
    {icon && <img className="inline " src={icon} />}
  </button>
);
export default Button;
