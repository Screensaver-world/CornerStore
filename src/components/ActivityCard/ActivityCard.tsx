import HorizontalCard from 'components/HorizontalCard';
import React, { FC } from 'react';
import { formatDate } from 'utils/dateTimeUtils';

const getActivityString = (actionType: 'mint' | 'burn' | 'transfer', seller, owner, userId) => {
  if (actionType === 'mint') {
    return 'Minted';
  }
  if (actionType === 'burn') {
    return 'Burned';
  }
  if (seller === userId) {
    return 'Sold';
  }
  return 'Bought';
};

type Props = {
  title: string;
  date: Date;
  actionType: 'mint' | 'burn' | 'transfer';
  owner: string;
  //used when type is buy, todo check if it is needed
  seller?: string;
  //user whose prifile is being viewed
  profileImage: string;
  //TODO remove if we can fetch one based on another
  userId: string;
  username: string;
};

const ActivityCard: FC<Props> = ({ profileImage, date, actionType, owner, seller, title, userId, username }) => {
  const activity = getActivityString(actionType, seller, owner, userId);
  return (
    <HorizontalCard
      mainBackground
      imageUrl={profileImage}
      title={<span className={'text-white text-xl'}>{title}</span>}
      subtitle={
        <div>
          {activity} by <span className="text-lg text-white">{username}</span>
          <div>{formatDate(date)}</div>
        </div>
      }
    />
  );
};
export default ActivityCard;
