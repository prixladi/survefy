import axios from 'axios';
import { useMutation } from 'react-query';

type Response = { status: 'ok' } | { status: 'serverError' };

const useUserLogout = () =>
  useMutation(async (): Promise<Response> => {
    const { status } = await axios.post('/api/auth/logout', null, {
      validateStatus: () => true,
    });

    return status < 300 ? { status: 'ok' } : { status: 'serverError' };
  });

export default useUserLogout;
