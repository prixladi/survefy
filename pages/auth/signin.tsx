import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { UserCreateDto } from '~types';

import SEO from '~components/seo';
import EmailInput from '~components/auth/email-input';
import PasswordInput from '~components/auth/password-input';
import SubmitButton from '~components/form/form-submit-button';
import PageMove from '~components/auth/page-move';
import AuthForm from '~components/auth/auth-form';
import useLogin from '~lib/hooks/use-login';
import pages from '~lib/pages';

type Values = UserCreateDto;

const Signin: NextPage = () => {
  const { t } = useTranslation('t');
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'auth' });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Values>();
  const { loginAsync } = useLogin();

  const submit = async (data: Values) => {
    const response = await loginAsync(data);
    if (response.status === 'badRequest') {
      setError('email', { type: 'manual', message: tAuth('signin.invalid') });
      setError('password', { type: 'manual', message: tAuth('signin.invalid') });
    }
    if (response.status === 'serverError') {
      setError('email', { type: 'manual', message: t('serverError') });
      setError('password', { type: 'manual', message: t('serverError') });
    }
  };

  return (
    <div>
      <SEO title={tAuth('signin.title')} />
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
            <SubmitButton isSubmitting={isSubmitting} text={tAuth('signin.button')} />
            <PageMove href={pages.auth.signup} text={tAuth('signin.goToSignup')} />
          </>
        }
      />
    </div>
  );
};

export default Signin;
