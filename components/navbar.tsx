import React, { useState } from 'react';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import Logo from './logo';
import BurgerIcon from './burger-icon';
import Cross from './cross-icon';

const Navbar: NextPage = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('t');

  return (
    <nav className="bg-blue-50 fixed inset-x-0 border-b-2 text-amber-900 font-semibold">
      <div className={clsx('relative z-100', { hidden: !open })}>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-full px-6 overflow-y-auto bg-amber-200">
          <div className="flex flex-col items-end mt-2">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-amber-900 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <Cross />
            </button>
          </div>
          <div className="flex items-center flex-col">
            <Logo />
          </div>
          <div className="mt-10">
            <ul className="gap-2 lg:gap-12 flex flex-col text-center text-2xl">
              <Link href="/auth/signin">
                {/* eslint-disable-next-line */}
                <a className="pb-2 px-3">{t('$t(login, capitalize)')}</a>
              </Link>
              <span className="italic text-sm">- or -</span>
              <Link href="/auth/signup">
                {/* eslint-disable-next-line */}
                <a className=" px-3">{t('$t(sign up, capitalize)')}</a>
              </Link>
            </ul>
          </div>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Logo />
          </div>
          <div className="hidden md:flex items-center space-x-1 text-sm">
            <Link href="/auth/signin">
                {/* eslint-disable-next-line */}
              <a className="py-5 px-3">{t('$t(login, capitalize)')}</a>
            </Link>
            <Link href="/auth/signup">
                {/* eslint-disable-next-line */}
              <a className="py-2 px-3 hover:bg-amber-900 hover:text-white text-sm rounded border-amber-900 border-2 transition duration-300">
                {t('$t(sign up, capitalize)')}
              </a>
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100"
              onClick={() => setOpen(true)}
            >
              <BurgerIcon />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
