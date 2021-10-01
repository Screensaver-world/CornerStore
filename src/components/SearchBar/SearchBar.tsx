import { SearchIcon } from '@heroicons/react/solid';
import { SearchIcon as SVGSearchIcon } from 'assets';
import { XIcon } from '@heroicons/react/outline';

import Button from 'components/Button';
import { ButtonType } from 'components/Button/Button';
import React, { FC, useCallback, useState } from 'react';

type Props = { hidden?: boolean };
const SearchBar: FC<Props> = ({ hidden = false }) => {
  const [displaySearchOverlay, setDisplaySearchOverlay] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);

  const renderInput = useCallback(() => {
    return (
      <div className="w-full">
        <input
          onBlur={() => setDisplayResults(false)}
          onFocus={() => {
            setDisplayResults(true);
          }}
          id="search"
          name="search"
          className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:text-white sm:text-sm bg-main borer border-gray-600"
          placeholder="Collection, item or user"
          type="search"
        />
        {!displaySearchOverlay && (
          <div className="flex absolute justify-center items-center absoulte w-full bg-main h-40  text-white border border-gray-600">
            Search results will go here
          </div>
        )}
      </div>
    );
  }, [displayResults, setDisplayResults]);
  const mobileSeardh = (
    <div className=" h-screen w-screen fixed bg-main top-0 left-0 z-10 md:hidden px-4 py-4 ">
      <span className="flex gap-x-3 items-center">
        {renderInput()}
        <XIcon onClick={() => setDisplaySearchOverlay(false)} className="block h-7 w-7 text-white" aria-hidden="true" />
      </span>
      <div className="flex  justify-center items-center h-full w-full text-white">Search results will go here</div>
    </div>
  );

  return hidden ? null : (
    <>
      <div className="flex-1 justify-center px-2 lg:ml-6 lg:justify-end hidden md:block">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          {renderInput()}
        </div>
      </div>
      <div className="flex w-full block md:hidden right-0 justify-end">
        <Button icon={SVGSearchIcon} type={ButtonType.Main} onClick={() => setDisplaySearchOverlay(true)} />
      </div>
      {displaySearchOverlay && mobileSeardh}
    </>
  );
};

export default SearchBar;
