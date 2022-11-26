import React, { useState } from 'react';
import classnames from 'classnames';
import ClickOutside from './ClickOutside';
import Link from 'next/link';

interface NavProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ isOpen, setIsOpen }: NavProps) => {
  return (
    <ClickOutside
      tag="nav"
      className={classnames(
        'fixed flex flex-col w-2/6 h-full top-0 duration-500 bg-lime-50 py-5 px-4',
        isOpen ? 'left-0' : '-left-full',
      )}
      onClickOutside={e => setIsOpen(false)}
    >
      <ul className="flex flex-col gap-5">
        <li className="text-m text-zinc-500">
          <Link href="/dashboard">대시보드</Link>
        </li>
        <li className="text-m text-zinc-500">
          <Link href="/record">기록표</Link>
        </li>
      </ul>
    </ClickOutside>
  );
};

export default Nav;
