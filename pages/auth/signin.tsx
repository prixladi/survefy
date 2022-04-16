import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import useUserCreateMutation from '~lib/hooks/api/use-user-create-mutation';
import { UserCreateModel } from '~types';

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
  const { mutateAsync } = useUserCreateMutation();

  return (
    <div>
      <SEO title={tAuth('signin.title')} />
      <div className="mx-2">
        <AuthForm
          onSubmit={handleSubmit(async (data) => {
            const response = await mutateAsync(data);
            if (response.status === 'conflict') {
              setError('email', { type: 'manual', message: 'Email already exists' });
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
    </div>
  );
};

export default Home;
