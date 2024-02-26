import Layout from '@/components/ui/Layout/Layout';
import { Button, WWrap } from '../../../Style/delete.styled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const DeletePage = () => {
  const router = useRouter();
  const { id } = router.query;

  function goBack() {
    router.push('/products');
  }

  async function deleteProduct() {
    try {
      await axios.delete('/api/products?id=' + id);
    } catch (error) {
      throw new Error(error.message);
    }
    router.push('/products');
    alert('Product deleted successfully');
  }

  return (
    <>
      <Layout>
        <WWrap>
          <p>Are you really wont to delete this product?</p>
          <Button onClick={deleteProduct} type="button">
            yes
          </Button>
          <Button onClick={() => goBack()} type="button">
            no
          </Button>
        </WWrap>
      </Layout>
    </>
  );
};

export default DeletePage;
