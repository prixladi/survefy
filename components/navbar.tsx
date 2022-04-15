import React from 'react';

import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Logo from './logo';

const Navbar: NextPage = () => {
  const { t } = useTranslation('t');

  return (
    <nav className="bg-blue-50 fixed inset-x-0 border-b-2 text-amber-900 font-semibold">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Logo />
          </div>
          <div className="hidden md:flex items-center space-x-1 text-sm">
            <Link href="/auth/signin">
              {/* eslint-disable */}
              <a className="py-5 px-3">{t('$t(login, capitalize)')}</a>
            </Link>
            <Link href="/auth/signup">
              {/* eslint-disable */}
              <a className="py-2 px-3 hover:bg-amber-900 hover:text-white text-sm rounded border-amber-900 border-2 transition duration-300">
                {t('$t(sign up, capitalize)')}
              </a>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button focus:outline-none">
              <i className="bx bx-menu text-3xl mt-1" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
