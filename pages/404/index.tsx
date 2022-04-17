import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import pages from '~lib/pages';

const NotFound: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(pages.home);
  }, [router]);

  return null;
};

export default NotFound;
