import { FieldError, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import address from '@sideway/address';

import { UserCreateModel } from '~types';
import ErrorMessage from './error-message';

type Values = UserCreateModel;

type Props = {
  register: UseFormRegister<Values>;
  error?: FieldError | undefined;
};

const EmailInput: React.FC<Props> = ({ register, error }) => {
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'pages.auth' });

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        {tAuth('email')}
      </label>
      <input
        id="email"
        placeholder="email@example.com"
        {...register('email', {
          required: { value: true, message: tAuth('emailRequired') },
          validate: (email) =>
            address.email.isValid(email) ? undefined : (tAuth('emailInvalid') as string),
        })}
        className={clsx(
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
          {
            'border-red-500 border-2': !!error,
          },
        )}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

export default EmailInput;
