import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { UserCreateModel } from '~types';
import useUserCreateMutation from '~lib/hooks/api/use-user-create-mutation';

import SEO from '~components/seo';
import AuthForm from '~components/auth/auth-form';
import EmailInput from '~components/auth/email-input';
import PasswordInput from '~components/auth/password-input';
import SubmitButton from '~components/auth/submit-button';
import PageMove from '~components/auth/page-move';
import useLogin from '~lib/hooks/use-login';

type Values = UserCreateModel;

const Home: NextPage = () => {
  const { t } = useTranslation('t');
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'pages.auth' });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Values>();
  const { mutateAsync: createAsync } = useUserCreateMutation();
  const { loginAsync } = useLogin();

  return (
    <div>
      <SEO title={tAuth('signup.title')} />
      <AuthForm
        onSubmit={handleSubmit(async (data) => {
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
        })}
        fieldsSection={
          <>
            <EmailInput register={register} error={errors.email} />
            <PasswordInput register={register} error={errors.password} />
          </>
        }
        submitSection={
          <>
            <SubmitButton isSubmitting={isSubmitting} text={tAuth('signup.button')} />
            <PageMove href="/auth/signin" text={tAuth('signup.goToSignin')} />
          </>
        }
      />
    </div>
  );
};

export default Home;
