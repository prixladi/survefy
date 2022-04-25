import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { UserCreateDto } from '~types';
import useUserCreateMutation from '~lib/hooks/api/use-user-create';

import SEO from '~components/seo';
import AuthForm from '~components/auth/auth-form';
import EmailInput from '~components/auth/email-input';
import PasswordInput from '~components/auth/password-input';
import SubmitButton from '~components/form/form-submit-button';
import PageMove from '~components/auth/page-move';
import useLogin from '~lib/hooks/use-login';
import pages from '~lib/pages';

type Values = UserCreateDto;

const Signup: NextPage = () => {
  const { t } = useTranslation('t');
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'auth' });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Values>();
  const { mutateAsync: createAsync } = useUserCreateMutation();
  const { loginAsync } = useLogin();

  const submit = async (data: Values) => {
    const response = await createAsync(data);
    if (response.status === 'conflict') {
      setError('email', { type: 'manual', message: tAuth('emailDuplicate') });
    }
    if (response.status === 'serverError') {
      setError('email', { type: 'manual', message: t('serverError') });
      setError('password', { type: 'manual', message: t('serverError') });
    }

    if (response.status === 'ok') {
      await loginAsync(data);
    }
  };

  return (
    <div>
      <SEO title={tAuth('signup.title')} />
      <AuthForm
        onSubmit={handleSubmit(submit)}
        fieldsSection={
          <>
            <EmailInput register={register} error={errors.email} />
            <PasswordInput register={register} error={errors.password} />
          </>
        }
        submitSection={
          <>
            <SubmitButton isSubmitting={isSubmitting} text={tAuth('signup.button')} />
            <PageMove href={pages.auth.signin} text={tAuth('signup.goToSignin')} />
          </>
        }
      />
    </div>
  );
};

export default Signup;
