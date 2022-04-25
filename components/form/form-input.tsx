import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';
import clsx from 'clsx';

import ErrorMessage from '../form/form-error-message';

type Props = {
  id: string;
  name: string;
  register: UseFormRegisterReturn;
  inputClassName?: string;
  labelClassName?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  error?: FieldError | undefined;
};

const FormInput: React.FC<Props> = ({
  id,
  name,
  register,
  error,
  placeholder,
  type,
  inputClassName,
  labelClassName,
}) => {
  return (
    <>
      <label className={labelClassName} htmlFor={id}>
        {name}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={clsx(inputClassName, {
          'border-red-500 border-2': !!error,
        })}
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default FormInput;
