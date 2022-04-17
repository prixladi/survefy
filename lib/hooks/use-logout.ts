import { useRouter } from 'next/router';
import pages from '~lib/pages';

import useUserLogout from './api/use-user-logout';

const useLogout = () => {
  const router = useRouter();
  const { mutateAsync } = useUserLogout();

  return {
    logoutAsync: async () => {
      await mutateAsync();
      router.push(pages.home);
    },
  };
};

export default useLogout;
