import axios from 'axios';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import profilePic from '../../../public/images/no_img.jpg';
import Swal from 'sweetalert2';

import {
  ButtonWrapper,
  DeleteButton,
  EditButton,
  Images,
  Links,
  List,
  ListItem,
} from '../../Style/Products.styled';
import Layout from '@/components/ui/Layout/Layout';
import Button from '@/components/ui/Button/Button';
import Title from '@/components/ui/Title/Title';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios.get('/api/products').then(response => setProducts(response.data));
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  function deleteProduct(product) {
    Swal.fire({
      title: `Do you want to delete product ${product.name}  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.delete('/api/products?id=' + product._id);
          Swal.fire({
            confirmButtonColor: '#3085d6',
            icon: 'success',
            title: `Product ${product.name.toUpperCase()} has been deleted.`,
          });
          axios
            .get('/api/products')
            .then(response => setProducts(response.data));
        } catch (error) {
          throw new Error(error.message);
        }
      }
    });
  }

  return (
    <Layout>
      <Title>Products</Title>
      <Button
        href={'/products/new'}
        bgColor={p => p.theme.BtnVioletMain}
        width="max-content"
      >
        Add new product
      </Button>
      <List>
        {products.map(product => (
          <ListItem key={product._id}>
            {console.log(product)}

            <p>{product.name}</p>
            <p>{product?.category?.title}</p>
            <Images
              // src={product.image.length === 0 ? profilePic : product?.image[0]}
              src={product?.image[0] || profilePic}
              alt={product.name}
              width={200}
              height={200}
              priority
            />

            <p>{product.price} UAH</p>
            {console.log(product)}
            <p>{product.price} UAH</p>
            <ButtonWrapper>
              <EditButton href={'/products/edit/' + product._id}>
                Edit
              </EditButton>
              <DeleteButton onClick={() => deleteProduct(product)}>
                Delete
              </DeleteButton>
            </ButtonWrapper>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
  return { props: { session: session } };
}
