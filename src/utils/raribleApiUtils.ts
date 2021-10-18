import { getNftOrders } from 'api/raribleApi';
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
