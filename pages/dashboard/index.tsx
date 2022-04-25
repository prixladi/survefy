import type { GetServerSideProps, NextPage } from 'next';
import Navbar from '~components/navbar';

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
      <Navbar isLoggedIn={true} />
      <div className='pt-20'>{JSON.stringify(user)}</div>
    </div>
  );
};

export default Dashboard;
