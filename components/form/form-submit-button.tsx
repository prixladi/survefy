import clsx from 'clsx';
import LoadingIcon from '~components/loading-icon';

type Props = {
  text: string;
  isSubmitting: boolean;
};

const SubmitButton: React.FC<Props> = ({ text, isSubmitting }) => (
  <button disabled={isSubmitting} className={clsx('cta cursor-pointer')} type="submit">
    {isSubmitting ? (
      <span className="flex items-center">
        <LoadingIcon />
        {text}
      </span>
    ) : (
      text
    )}
  </button>
);

export default SubmitButton;
