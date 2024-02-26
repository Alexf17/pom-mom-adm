import Layout from '@/components/ui/Layout/Layout';
import { useSession } from 'next-auth/react';

import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Pom Mom Admin</title>
      </Head>
      <Layout>
        <h3>Hello my dear user {session?.user.name}</h3>
      </Layout>
    </>
  );
}
