import axios from 'axios';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import Layout from '@/components/ui/Layout/Layout';

import { StyledForm } from '../../../Style/NewProduct.styled';
import ProductForm from '@/components/ProductForm/ProductForm';
import Title from '@/components/ui/Title/Title';

const NewProduct = () => {
  return (
    <Layout>
      <Title>Add new product</Title>
      <ProductForm />
    </Layout>
  );
};
export default NewProduct;
