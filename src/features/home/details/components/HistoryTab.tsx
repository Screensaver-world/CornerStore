import React from 'react';
import { useGetNftItemOrderActivity } from 'api/raribleApi';
import HistoryCard from './HistoryCard';

type Props = {};

function HistoryTab({}: Props) {
  const { isLoading, data } = useGetNftItemOrderActivity();

  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      {data.map((d, index) => (
        <HistoryCard key={index} data={d} />
      ))}
    </>
  );
}

export default HistoryTab;
