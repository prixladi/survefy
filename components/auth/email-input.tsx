import { FieldError, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import address from '@sideway/address';

import { UserCreateDto } from '~types';
import FormInput from '~components/form/form-input';

type Values = UserCreateDto;

type Props = {
  register: UseFormRegister<Values>;
  error?: FieldError | undefined;
};

const EmailInput: React.FC<Props> = ({ register, error }) => {
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'auth' });
  const reg = register('email', {
    required: { value: true, message: tAuth('emailRequired') },
    validate: (email) =>
      address.email.isValid(email) ? undefined : (tAuth('emailInvalid') as string),
  });

  return (
    <FormInput
      id={'email'}
      name={tAuth('email')}
      register={reg}
      placeholder="email@gmail.com"
      labelClassName="block text-gray-700 text-sm font-bold mb-2"
      inputClassName="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      error={error}
    />
  );
};

export default EmailInput;
