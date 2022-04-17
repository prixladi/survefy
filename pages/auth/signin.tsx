import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { UserCreateModel } from '~types';
import useUserLogin from '~lib/hooks/api/user-user-login';

import SEO from '~components/seo';
import EmailInput from '~components/auth/email-input';
import PasswordInput from '~components/auth/password-input';
import SubmitButton from '~components/auth/submit-button';
import PageMove from '~components/auth/page-move';
import AuthForm from '~components/auth/auth-form';

type Values = UserCreateModel;

const Home: NextPage = () => {
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'pages.auth' });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Values>();
  const { mutateAsync: loginAsync } = useUserLogin();
  const router = useRouter();

  return (
    <div>
      <SEO title={tAuth('signin.title')} />
      <AuthForm
        onSubmit={handleSubmit(async (data) => {
          const response = await loginAsync(data);
          if (response.status === 'badRequest') {
            setError('email', { type: 'manual', message: 'Invalid username or password' });
            setError('password', { type: 'manual', message: 'Invalid username or password' });
            return;
          }

          if (response.status === 'ok') {
            router.push('/dashboard');
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
            <SubmitButton text={tAuth('signin.button')} />
            <PageMove href="/auth/signup" text={tAuth('signin.goToSignup')} />
          </>
        }
      />
    </div>
  );
};

export default Home;
