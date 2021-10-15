import React, { useEffect, useState } from 'react';
import { ProductList } from 'components/ProductCard';
import { useGetNftItems } from 'api/raribleApi';
import { GetNftItemsResponse, NftItemsRequestType, NtfItem } from 'api/raribleRequestTypes';

export interface ProfileProps {
  initialData?: GetNftItemsResponse;
  address: string;
}

const OwnedTab: React.FunctionComponent<ProfileProps> = ({ initialData, address }) => {
  const [continuation, setContinuation] = useState(initialData?.continuation);
  const { data, refetch, isIdle } = useGetNftItems({
    type: NftItemsRequestType.BY_OWNER,
    continuation,
    size: 1,
    includeMeta: true,
    address,
  });
  const [items, setItems] = useState<NtfItem[]>(initialData?.items ?? []);

  useEffect(() => {
    if (isIdle && !initialData && items.length === 0) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (data) {
      setItems([...items, ...data.items]);
      setContinuation(data.continuation);
    }
  }, [data]);

  return <ProductList itemsData={items ?? []} onLoadMore={continuation ? refetch : null} />;
};
export default OwnedTab;
