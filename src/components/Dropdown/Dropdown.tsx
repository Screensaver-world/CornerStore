/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

type Props = {
  displayText?: string;
  dropDownContent: React.ReactNode;
  displayDropOnly?: boolean;
};

const Dropdown: FC<Props> = ({ displayText, dropDownContent, displayDropOnly }) => {
  return (
    <Menu as="div" className="relative inline-block text-left" aria-expanded>
      {!displayDropOnly && (
        <div>
          <Menu.Button className="inline-flex bg-main text-white justify-center w-full rounded-md text-lg sm:text-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium border-gray-600 items-center">
            {displayText}
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
      )}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {dropDownContent}
        </div>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
