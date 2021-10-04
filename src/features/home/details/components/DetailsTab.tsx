import React, { useEffect } from 'react';
import HorizontalCard from 'components/HorizontalCard';
import { NFTOwner } from 'types';

type Props = {
  owner: NFTOwner;
  // todo -
  categories: { name: string; imageUrl: string }[];
};

function DetailsTab({ owner, categories }: Props) {
  return (
    <div>
      <div className={'w-1/2 pb-5'}>
        <div className={'font-semibold pb-2'}>Owner</div>
        <HorizontalCard imageUrl={owner.avatarUrl} title={owner.name} />
      </div>
      <div>
        <div className={'font-semibold pb-2'}>Categories</div>
        <div className={'flex flex-wrap'}>
          {categories.map((c, index) => (
            <div className={'w-1/3'}>
              <HorizontalCard key={index} title={c.name} imageUrl={c.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailsTab;
