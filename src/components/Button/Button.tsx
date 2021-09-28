import React, { FC } from "react";

type ButtonTypes = {
  label?: string;
  //TODO change type?
  icon?: string;
  iconRight?: boolean;
  outlined?: boolean;
  onClick?(): void;
  type: BUTTON_TYPE;
  fullWidth?: boolean;
};
//TODO: add  clicked, hover effects

const BASE_BUTTON =
  "text-white font-bold outline-none rounded shadow py-2 px-4 font-normal focus:outline-none border border-transparent";

export enum BUTTON_TYPE {
  primary = "bg-gradient-to-b from-primary-start to-primary-stop bg-origin-border	",
  secondary = "bg-secondary border-gray-800 ",
  main = "bg-main border-gray-800",
}

const Button: FC<ButtonTypes> = ({
  onClick,
  icon,
  label,
  iconRight,
  fullWidth,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${BASE_BUTTON} ${type} ${
        fullWidth ? "w-full" : "w-max"
      } inline-flex flex-row${iconRight ? "" : "-reverse"}`}
    >
      {label && <span>{label}</span>}
      {icon && <img className={`inline `} src={icon} />}
    </button>
  );
};
export default Button;
