import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

type Props = {
  error?: FieldError | undefined;
};

const PasswordInput: React.FC<Props> = ({ error }) => (
  <span className={clsx('text-red-500 text-xs font-bold px-2')}>
    {error?.message ?? <span className="opacity-0">*</span>}
  </span>
);

export default PasswordInput;
