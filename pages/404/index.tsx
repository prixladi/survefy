import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const getStaticProps = () => ({
  redirect: {
    destination: '/',
  },
});

const Dashboard: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
};

export default Dashboard;
