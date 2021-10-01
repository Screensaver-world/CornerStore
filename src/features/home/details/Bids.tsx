import React from 'react'
import { BidItem } from 'types'
import BidCard from './BidCard'

type Props = {
  data: BidItem[];
};

function Bids({ data }: Props) {
  return (
    <div className="flex flex-col">
      {data.map((item, index) => (
        <div className={'mb-4'}>
          <BidCard key={index} data={item} />
        </div>
      ))}
    </div>
  );
}

export default Bids;
