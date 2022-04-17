import type { NextPage } from 'next';

import useLogout from '~lib/hooks/use-logout';

const Dashboard: NextPage = () => {
  const { logoutAsync } = useLogout();

  return (
    <div>
      <main>DASH</main>
      <button type="button" onClick={logoutAsync}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
