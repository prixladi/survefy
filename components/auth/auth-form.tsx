import { FormEventHandler } from 'react';

import Logo from '~components/logo';

type Props = {
  fieldsSection: React.ReactNode;
  submitSection: React.ReactNode;
  onSubmit: FormEventHandler<any>;
};

const AuthForm: React.FC<Props> = ({ fieldsSection, submitSection, onSubmit }) => (
  <div className="mx-4">
    <main className="flex flex-col pt-12 md:pt-28 lg:pt-32 prose max-w-sm m-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-1"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col items-center mb-6">
          <Logo />
        </div>
        {fieldsSection}
        <div className="flex items-center justify-between mt-2 gap-2">{submitSection}</div>
      </form>
    </main>
  </div>
);

export default AuthForm;
