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
      style={{ zIndex: 99 }}
      className={classnames(
        'fixed flex flex-col w-2/6 h-full top-0 duration-500 bg-lime-50 py-5 px-4',
        isOpen ? 'left-0' : '-left-full',
      )}
      onClickOutside={e => setIsOpen(false)}
    >
      <ul className="flex flex-col gap-5 py-10">
        <li className="text-m text-zinc-500 font-bold">
          <Link href="/" onClick={() => setIsOpen(false)}>
            홈
          </Link>
        </li>
        <li className="text-m text-zinc-500 font-bold">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            대시보드
          </Link>
        </li>
        <li className="text-m text-zinc-500 font-bold">
          <Link href="/record" onClick={() => setIsOpen(false)}>
            기록표
          </Link>
        </li>
      </ul>
    </ClickOutside>
  );
};

export default Nav;
