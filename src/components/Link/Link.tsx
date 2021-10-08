import React, { FC, useCallback } from 'react';
import NextLink from 'next/link';

//TODO: add other types
export enum LinkType {
  Main = 'text-white font-bold',
  Secondary = 'text-gray-600 font-semibold',
  Primary = 'text-transparent bg-clip-text bg-gradient-to-b from-primary-start to-primary-stop hover:from-primary-stop ',
}

type Props = {
  to?: string;
  title?: string;
  type?: LinkType;
  onClick?: () => void;
};

const Link: FC<Props> = ({ to, title = '', type = LinkType.Primary, children, onClick }) => {
  const renderComponent = useCallback(() => {
    return children ?? <a className={`${type}`}> {title}</a>;
  }, [children, type, title]);
  if (onClick) {
    return children ?? renderComponent();
  }
  return <NextLink href={to}>{renderComponent()}</NextLink>;
};
export default Link;
