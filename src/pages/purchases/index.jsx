import { getSession } from 'next-auth/react';

import Layout from '@/components/ui/Layout/Layout';

import connectMongo from '@/db/mongoose';
import Product from '@/models/Product';
import Purchases from '@/components/Purchases/Purchases';

const Home = ({ products }) => {
  return (
    <Layout>
      <Purchases products={products} />
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  await connectMongo();
  const products = await Product.find({});

  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
  return {
    props: { products: JSON.parse(JSON.stringify(products)), session: session },
  };
}

export default Home;
