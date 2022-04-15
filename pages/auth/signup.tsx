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

type Values = UserCreateModel;

const Home: NextPage = () => {
  const { t: tAuth } = useTranslation('t', { keyPrefix: 'pages.auth' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>();
  const { mutate } = useUserCreateMutation();

  return (
    <div>
      <SEO title={tAuth('signup.title')} />
      <div className="mx-2">
        <AuthForm
          onSubmit={handleSubmit((data) => mutate(data))}
          fieldsSection={
            <>
              <EmailInput register={register} error={errors.email} />
              <PasswordInput register={register} error={errors.password} />
            </>
          }
          submitSection={
            <>
              <SubmitButton text={tAuth('signup.button')} />
              <PageMove href="/auth/signin" text={tAuth('signup.goToSignin')} />
            </>
          }
        />
      </div>
    </div>
  );
};

export default Home;
