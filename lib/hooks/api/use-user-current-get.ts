import axios from 'axios';
import { useQuery } from 'react-query';
import { UserAuthPayload } from '~types';

type Response =
  | { status: 'ok'; user: UserAuthPayload }
  | { status: 'unauthorized'; user?: undefined }
  | { status: 'serverError'; user?: undefined };

const useUserCurrentGet = (user?: UserAuthPayload | undefined) => {
  const opts = user ? { initialData: { status: 'ok', user } as Response } : {};

  return useQuery(
    'current-user',
    async (): Promise<Response> => {
      const { status, data } = await axios.get<UserAuthPayload>('/api/users/current', {
        validateStatus: (st) => st < 300 || st === 401,
      });

      if (status === 401) return { status: 'unauthorized' };

      return { status: 'ok', user: data };
    },
    opts,
  );
};

export default useUserCurrentGet;
