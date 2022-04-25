import { FieldError, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserCreateDto } from '~types';
import FormInput from '~components/form/form-input';

type Values = UserCreateDto;

type Props = {
  register: UseFormRegister<Values>;
  error?: FieldError | undefined;
};

const PasswordInput: React.FC<Props> = ({ register, error }) => {
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'auth' });

  const reg = register('password', {
    required: { value: true, message: tAuth('passwordRequired') },
    minLength: { value: 6, message: tAuth('passwordShort') },
  });

  return (
    <FormInput
      id={'password'}
      name={tAuth('password')}
      register={reg}
      placeholder="********"
      type="password"
      labelClassName="block text-gray-700 text-sm font-bold mb-2"
      inputClassName="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      error={error}
    />
  );
};

export default PasswordInput;
