import type { NextPage } from 'next';
import { useEffect } from 'react';

import useLogout from '~lib/hooks/use-logout';

const Signout: NextPage = () => {
  const { logoutAsync } = useLogout();

  useEffect(() => {
    logoutAsync();
  }, []);

  return null;
};

export default Signout;
