import { VerifiedIcon } from 'assets';
import Link from 'components/Link';
import React, { FC } from 'react';

type Props = {
  imageSrc: string;
  verified?: boolean;
  additionalClasses?: string;
  sizeClasses?: string;
  verificationSymbolSizes?: string;

  username: string;
};

const Avatar: FC<Props> = ({
  imageSrc,
  verified = false,
  additionalClasses = '',
  sizeClasses,
  username,
  verificationSymbolSizes,
}) => {
  return (
    <Link to={`/profile/${username}`}>
      <div className="relative">
        <img
          className={`${additionalClasses} ${sizeClasses ?? 'w-16 h-16'} border-2 border-gray-700 rounded-full`}
          src={imageSrc}
          alt="avatar"
        />
        {verified && (
          <img className={`absolute bottom-0 right-0 ${verificationSymbolSizes ?? 'w-6 h-6'}`} src={VerifiedIcon} />
        )}
      </div>
    </Link>
  );
};
export default Avatar;
