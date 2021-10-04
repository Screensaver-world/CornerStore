import React from 'react';

type Props = {
  imageUrl: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  mainBackground?: boolean;
};

function HorizontalCard({ imageUrl, title, subtitle, actions, mainBackground = false }: Props) {
  return (
    <div className={'pb-5'}>
      <div
        className={`relative rounded-lg ${
          mainBackground ? 'bg-main' : 'bg-secondary'
        } px-2 py-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500`}
      >
        <div className="flex-shrink-0">
          <img className="h-16 w-16 rounded-full border-2 border-gray-700" src={imageUrl} alt="" />
        </div>
        <div className="flex flex-1 flex-col md:flex-row md:justify-between min-w-0">
          <div>
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="font-bold text-white">{title}</p>
            {subtitle && <p className="pt-2 text-sm font-medium text-gray-700 truncate">{subtitle}</p>}
          </div>
          {actions && <div className={'flex mt-2 sm:mt-0 justify-end pr-2'}>{actions}</div>}
        </div>
      </div>
    </div>
  );
}
export default HorizontalCard;
