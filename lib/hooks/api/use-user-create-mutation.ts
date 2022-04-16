import axios from 'axios';
import { useMutation } from 'react-query';
import { UserCreateModel } from '~types';

type Response = { status: 'ok'; data: any } | { status: 'conflict'; data?: undefined };

export default function useUserCreateMutation() {
  return useMutation(async (model: UserCreateModel): Promise<Response> => {
    const { status, data } = await axios.post('/api/users', model, {
      validateStatus: (status) => status < 300 || status === 409,
    });

    if (status === 409) return { status: 'conflict' };

    return { status: 'ok', data };
  });
}
