import { getNftItemById, getNftOrders } from 'api/raribleApi';
import { NtfItem, OrderFilter, OrderRequestTypes } from 'api/raribleRequestTypes';

export const getSellOrdersForItems = async (items: NtfItem[]) => {
  const orders = await Promise.all(
    items.map(({ id }) =>
      getNftOrders({ size: 1, address: id, filterBy: OrderFilter.BY_ITEM, type: OrderRequestTypes.SELL })
    )
  );

  return orders.map(({ orders }) => {
    const order = orders?.[0];
    if (!order) {
      return { take: {} };
    }
    const { take } = order;
    return { take };
  });
};

//TODO fix type to match sell orders response
export const getItemsForSellOrders = async (orders: any[]) => {
  return await Promise.all(
    orders.map(
      ({
        make: {
          assetType: { contract, tokenId },
        },
      }) => getNftItemById(`${contract}:${tokenId}`)
    )
  );
};

export const mapActivityHistory = (items) =>
  items.map((item) => {
    if (item['@type'] === 'mint') {
      return { type: 'mint', date: item.date, itemId: `${item.contract}:${item.tokenId}` };
    }
    if (item['@type'] === 'list') {
      const { contract, tokenId } = item.make.assetType;

      return {
        type: 'list',
        date: item.date,
        itemId: `${contract}:${tokenId}`,
        price: item.take.valueDecimal,
        currency: item.take.assetType.assetClass,
      };
    }
    if (item['@type'] === 'match') {
      const { contract, tokenId } = item.make.assetType;
      return {
        type: 'match',
        date: item.date,
        itemId: `${contract}:${tokenId}`,
        price: item.price,
        seller: item.left.maker,
        buyer: item.right.maker,
        currency: item.right.asset.assetType.assetClass,
      };
    }
  });
