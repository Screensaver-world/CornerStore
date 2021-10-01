import React from 'react';

type Props = {
  imageUrl: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  actions?: React.ReactNode;
};

function HorizontalCard({ imageUrl, title, subtitle, actions }: Props) {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div className="flex-shrink-0">
        <img className="h-16 w-16 rounded-full border-2" src={imageUrl} alt="" />
      </div>
      <div className="flex flex-1 flex-col md:flex-row md:justify-between min-w-0">
        <div>
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        </div>
        {actions && <div className={'flex mt-2 sm:mt-0 justify-end pr-2'}>{actions}</div>}
      </div>
    </div>
  );
}
export default HorizontalCard;
