import * as React from 'react';
import { ProductList } from 'components/ProductCard';
import Dropdown from 'components/Dropdown/Dropdown';
import { useCallback, useEffect } from 'react';
import { getNftItems } from 'api/raribleApi';
import { GetNftItemsResponse, NftItemsRequestType } from 'api/raribleRequestTypes';

enum OrderBy {
  RecentlyAdded = 'Recently added',
  PriceLowToHigh = 'Price: Low to High',
  PriceHighToLow = 'Price: High to Low',
  AuctionEndingSoon = 'Auction ending soon',
}
export interface HomeProps {
  itemsData: GetNftItemsResponse;
}

const Home: React.FunctionComponent<HomeProps> = ({ itemsData }) => {
  const renderDropDownContent = useCallback(
    () =>
      Object.keys(OrderBy).map((key) => (
        <div className="px-2 py-2 text-white hover:bg-gray-600 bg-secondary" key={key}>
          {OrderBy[key]}
        </div>
      )),
    []
  );

  return (
    <>
      <div className="flex items-center justify-between px-6 py-10 mx-auto max-w-screen-2xl">
        <h1 className="py-0.5 text-2xl font-bold text-white">Explore</h1>
        <Dropdown
          displayText="Recently added"
          dropDownContent={<div className="divide-y divide-gray-600">{renderDropDownContent()}</div>}
        />
      </div>
      <ProductList itemsData={itemsData} viewType={NftItemsRequestType.ALL} />
    </>
  );
};
export async function getServerSideProps(context) {
  const itemsData = await getNftItems({ size: 25, showDeleted: false, includeMeta: true });

  return {
    props: { itemsData }, // will be passed to the page component as props
  };
}

export default Home;
