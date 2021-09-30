import NextLink from 'next/link';
import { FC } from 'react';
//TODO: add other types
export enum LinkType {
  Main = 'text-white font-bold',
  Secondary = 'text-gray-600 font-semibold',
  Primary = 'text-transparent bg-clip-text bg-gradient-to-b from-primary-start to-primary-stop hover:from-primary-stop ',
}

type Props = {
  to: string;
  title?: string;
  type?: LinkType;
};

const Link: FC<Props> = ({ to, title = '', type = LinkType.Primary, children }) => {
  return <NextLink href={to}>{children ?? <a className={`${type}`}> {title}</a>}</NextLink>;
};
export default Link;
