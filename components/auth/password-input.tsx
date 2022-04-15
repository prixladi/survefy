import { FieldError, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { UserCreateModel } from '~types';

type Values = UserCreateModel;

type Props = {
  register: UseFormRegister<Values>;
  error?: FieldError | undefined;
};

const PasswordInput: React.FC<Props> = ({ register, error }) => {
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'pages.auth' });

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        {tAuth('password')}
      </label>
      <input
        id="password"
        type="password"
        placeholder="********"
        {...register('password', {
          required: { value: true, message: tAuth('passwordRequired') },
          minLength: { value: 6, message: tAuth('passwordShort') },
        })}
        className={clsx(
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
          {
            'border-red-500 border-2': !!error,
          },
        )}
      />
      {error && <span className="text-red-500 text-xs font-bold px-2">{error.message}</span>}
    </div>
  );
};

export default PasswordInput;
