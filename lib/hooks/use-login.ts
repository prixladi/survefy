import { useRouter } from 'next/router';

import { UserLoginModel } from '~types';

import useUserLogin from './api/user-user-login';

const useLogin = () => {
  const router = useRouter();
  const { mutateAsync } = useUserLogin();

  return {
    loginAsync: async (model: UserLoginModel) => {
      const res = await mutateAsync(model);

      if (res.status === 'ok') {
        router.push('/dashboard');
      }

      return res;
    },
  };
};

export default useLogin;