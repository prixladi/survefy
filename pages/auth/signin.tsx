import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { UserCreateModel } from '~types';

import SEO from '~components/seo';
import EmailInput from '~components/auth/email-input';
import PasswordInput from '~components/auth/password-input';
import SubmitButton from '~components/auth/submit-button';
import PageMove from '~components/auth/page-move';
import AuthForm from '~components/auth/auth-form';
import useLogin from '~lib/hooks/use-login';

type Values = UserCreateModel;

const Signin: NextPage = () => {
  const { t } = useTranslation('t');
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'pages.auth' });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Values>();
  const { loginAsync } = useLogin();

  return (
    <div>
      <SEO title={tAuth('signin.title')} />
      <AuthForm
        onSubmit={handleSubmit(async (data) => {
          const response = await loginAsync(data);
          if (response.status === 'badRequest') {
            setError('email', { type: 'manual', message: tAuth('signin.invalid') });
            setError('password', { type: 'manual', message: tAuth('signin.invalid') });
          }
          if (response.status === 'serverError') {
            setError('email', { type: 'manual', message: t('serverError') });
            setError('password', { type: 'manual', message: t('serverError') });
          }
        })}
        fieldsSection={
          <>
            <EmailInput register={register} error={errors.email} />
            <PasswordInput register={register} error={errors.password} />
          </>
        }
        submitSection={
          <>
            <SubmitButton isSubmitting={isSubmitting} text={tAuth('signin.button')} />
            <PageMove href="/auth/signup" text={tAuth('signin.goToSignup')} />
          </>
        }
      />
    </div>
  );
};

export default Signin;
