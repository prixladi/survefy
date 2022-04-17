import { useRouter } from 'next/router';

import useUserLogout from './api/use-user-logout';

const useLogout = () => {
  const router = useRouter();
  const { mutateAsync } = useUserLogout();

  return {
    logoutAsync: async () => {
      await mutateAsync();
      router.push('/');
    },
  };
};

export default useLogout;
