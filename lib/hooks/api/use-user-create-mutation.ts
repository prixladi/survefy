import axios from 'axios';
import { useMutation } from 'react-query';
import { UserCreateModel } from '~types';

export default function useUserCreateMutation() {
  return useMutation(async (model: UserCreateModel) => axios.post('/api/users', model));
}
