import type { GetServerSideProps, NextPage } from 'next';

import useLogout from '~lib/hooks/use-logout';
import pages from '~lib/pages';
import session from '~lib/server/session';
import { UserAuthPayload } from '~types';

type PageProps = {
  user: UserAuthPayload;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const user = (await session.getLoginSession(context.req)) as UserAuthPayload;
  if (!user) {
    return {
      redirect: {
        destination: pages.auth.signout,
      },
      props: {
        user,
      },
    };
  }

  return { props: { user } };
};

const Dashboard: NextPage<PageProps> = ({ user }) => {
  const { logoutAsync } = useLogout();

  return (
    <div>
      <div>{JSON.stringify(user)}</div>
      <button type="button" onClick={logoutAsync}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
