import * as React from 'react';
import { ProductList } from 'components/ProductCard';
import Dropdown from 'components/Dropdown/Dropdown';
import { useCallback } from 'react';

//MOCKED DATA
export const dummyItems = [
  {
    id: '123',
    title: 'Product 1',
    imageUrl: 'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
    description: 'random',
    createdQuantity: 24,
    availableQuantity: 1,
    likes: 24,
    price: 0.1,
    ownerUsername: 'random',
    ownerProfileImageUrl:
      'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
  },
  {
    id: '234',
    title: 'Product 1',
    imageUrl:
      'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    description: 'random',
    createdQuantity: 24,
    availableQuantity: 1,
    likes: 24,
    price: 0.1,
    ownerUsername: 'random',
    ownerProfileImageUrl:
      'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
  },
  {
    id: '4212',
    title: 'Product 1',
    imageUrl: 'http://www.mandysam.com/img/random.jpg',
    description: 'random',
    createdQuantity: 24,
    availableQuantity: 1,
    likes: 24,
    price: 0.1,
    ownerUsername: 'random',
    ownerProfileImageUrl:
      'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
  },
];

enum OrderBy {
  RecentlyAdded = 'Recently added',
  PriceLowToHigh = 'Price: Low to High',
  PriceHighToLow = 'Price: High to Low',
  AuctionEndingSoon = 'Auction ending soon',
}

export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
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
      <div className="flex justify-between px-6 py-6 pt-10 mx-auto max-w-screen-2xl">
        <h1 className="text-4xl font-bold text-white">Explore</h1>
        <Dropdown
          displayText="Recently added"
          dropDownContent={<div className="divide-y divide-gray-600">{renderDropDownContent()}</div>}
        />
      </div>
      <ProductList
        items={new Array(5)
          .fill(dummyItems)
          .flat()
          .map((item) => ({ ...item, id: Math.random() }))}
      />
    </>
  );
};

export default Home;
