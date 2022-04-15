import { FieldError, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { UserCreateModel } from '~types';

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
          validate: (email) => {
            if (
              !email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              )
            ) {
              return tAuth('emailInvalid') as string;
            }

            return undefined;
          },
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

export default EmailInput;
