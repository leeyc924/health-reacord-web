import React, { useState } from 'react';
import Nav from './Nav';
import { GiHamburgerMenu as HamburgerBtnIcon } from 'react-icons/gi';

interface HeaderProps {
  children?: string;
}

const Header = ({ children }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex flex-[0_0_50px] px-2 border-b border-solid border-gray-600">
        <div className="flex items-center">
          <button onClick={e => setIsOpen(true)} className="">
            <HamburgerBtnIcon color="#65a30d" size={24}/>
          </button>
        </div>
        <span>{children}</span>
      </header>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
