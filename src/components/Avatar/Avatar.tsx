import Link from 'components/Link';
import React, { FC } from 'react';

type Props = {
  imageSrc: string;
  verified?: boolean;
  additionalClasses?: string;
  sizeClasses?: string;
  username: string;
};

const Avatar: FC<Props> = ({ imageSrc, verified = false, additionalClasses = '', sizeClasses, username }) => {
  return (
    <Link to={`/profile/${username}`}>
      <img
        className={`${additionalClasses} ${sizeClasses ?? 'w-16 h-16'} border-2 border-gray-700 rounded-full`}
        src={imageSrc}
        alt="avatar"
      />
    </Link>
  );
};
export default Avatar;
