import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ProductForm from '@/components/ProductForm/ProductForm';
import Layout from '@/components/ui/Layout/Layout';
import { GoBackButton } from '../../../Style/EditProductstyled';

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    try {
      axios.get('/api/products?id=' + id).then(response => {
        setProduct(response.data);
      });
    } catch (error) {
      throw new Error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <GoBackButton onClick={() => router.push('/products')}>
        Cancel and Go Back
      </GoBackButton>
      {product && <ProductForm product={{ ...product }} />}
    </Layout>
  );
};

export default EditProduct;
