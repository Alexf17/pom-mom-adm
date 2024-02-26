import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ProductForm from '@/components/ProductForm/ProductForm';
import Layout from '@/components/ui/Layout/Layout';
import { GoBackButton } from '../../../Style/Product.styled';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import Product from '@/models/Product';
import connectMongo from '@/db/mongoose';
import { getSession } from 'next-auth/react';

const EditProduct = ({ product }) => {
  // const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   try {
  //     axios.get('/api/products?id=' + id).then(response => {
  //       setProduct(response.data);
  //     });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }, []);

  return (
    <Layout>
      <GoBackButton onClick={() => router.push('/purchases')}>
        Go Back
      </GoBackButton>
      {product && <ProductDetails product={{ ...product }} />}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  await connectMongo();
  // const { id } = context.query;
  const { id } = context.params;
  const product = await Product.findById(id).populate('category');
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default EditProduct;
