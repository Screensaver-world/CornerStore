import React, { FC } from 'react';
// TODO: add  clicked, hover effects

const BASE_BUTTON =
  'text-white font-bold outline-none rounded shadow font-normal focus:outline-none border border-transparent items-center py-2';

export enum ButtonType {
  Primary = 'bg-gradient-to-b from-primary-start to-primary-stop bg-origin-border px-4',
  Secondary = 'bg-secondary border-gray-500 px-4',
  Main = 'bg-main border-gray-500 px-2',
}

type Props = {
  title?: string;
  // TODO change type?
  icon?: string;
  iconRight?: boolean;
  onClick?(): void;
  type?: ButtonType;
  fullWidth?: boolean;
  customClasses?: string;
};

const Button: FC<Props> = ({
  customClasses = '',
  onClick,
  icon,
  title,
  iconRight,
  fullWidth,
  type = ButtonType.Primary,
}) => (
  <button
    onClick={onClick}
    className={`${BASE_BUTTON} ${type} ${fullWidth ? 'w-full' : 'w-max'} inline-flex ${
      iconRight ? 'flex-row' : 'flex-row-reverse'
    } ${customClasses} `}
  >
    {title && <span className={`${title && icon ? (iconRight ? 'pr-2' : 'pl-2') : ''}`}>{title}</span>}
    {icon && <img className="inline " src={icon} />}
  </button>
);
export default Button;
