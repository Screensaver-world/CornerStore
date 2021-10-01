import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Bids from './Bids';
import { BidItem, Currency } from 'types'

export default {
  title: 'Bid Item',
  component: Bids,
  decorators: [withKnobs],
} as ComponentMeta<typeof Bids>;

const Template: ComponentStory<typeof Bids> = (args) => <Bids {...args} />;

const data: BidItem[] = [
  {
    createdAt: new Date(),
    createdByName: 'Lupus7',
    createdByImageUrl: 'https://avatars.githubusercontent.com/u/51007736?v=4',
    price: '0.01',
    quantity: 1,
    currency: Currency.RARI,
  },
  {
    createdAt: new Date(),
    createdByName: 'mladibejn',
    createdByImageUrl: 'https://avatars.githubusercontent.com/u/6930914?v=4',
    price: '1.01',
    quantity: 3,
    currency: Currency.RARI,
  },
];

export const Default = Template.bind({});
Default.args = {
  data,
};
