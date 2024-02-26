import Layout from '@/components/ui/Layout/Layout';
import {
  Box,
  ChangeQuantityButton,
  ContinueButton,
  EmptyCart,
  ImgCells,
  Input,
  SuccessText,
  SuccessWrapper,
  SumWrap,
  Table,
  Wrapper,
} from '../../Style/Cart.styled';
import { useContext, useEffect, useState } from 'react';

import { Context } from '@/components/Context/CartContext';
import axios from 'axios';
import Image from 'next/image';
import profilePic from '../../../public/images/no_img.jpg';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Cart = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(Context);
  const [products, setProducts] = useState([]);
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [shipComp, setShipComp] = useState('');
  const [actualUser, setActualUser] = useState('');

  // const [first, setFirst] = useState([]);

  const router = useRouter();
  const currentRoute = router.asPath;

  useEffect(() => {
    const cartProductsArray =
      cartProducts.length > 0
        ? cartProducts
        : JSON.parse(localStorage.getItem('cartProducts'));
    //   cartProducts || JSON.parse(localStorage.getItem('cartProducts'));
    if (cartProductsArray?.length > 0) {
      axios.post('api/cart', { id: cartProductsArray }).then(response => {
        setProducts(response.data);
        getActualUser();
        // setFirst(response.data);
      });
    } else {
      setProducts([]);
    }
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  function getQuantity(_id) {
    const quantity = cartProducts.filter(id => id === _id).length;
    return quantity;
  }

  function plusQuantity(id) {
    addProduct(id);
  }

  function minusQuantity(id) {
    removeProduct(id);
  }

  async function getActualUser() {
    let isCalled = false;

    if (!isCalled) {
      isCalled = true;
      const session = await getSession();
      setActualUser(session.user.email);
    }
  }

  let totalPrice = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    totalPrice += price;
  }

  async function paymentProcess() {
    if (!name || !city || !shipComp || !address || !cartProducts) {
      return alert('Please confirm your data');
    }
    // setFirst(cartProducts);
    try {
      const response = await axios.post('api/checkout', {
        name,
        city,
        shipComp,
        address,
        cartProducts,
        email: actualUser,
      });

      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return alert(error.response.data.error);
        }
      }
    }
  }

  // async function updateBalance(p) {
  //   axios
  //     .patch('/api/products', { p })
  //     .then(response => {
  //       console.log('Products balances updated', p);
  //     })
  //     .catch(error => {
  //       console.error('Error updating product balances', error);
  //     });
  // }

  if (currentRoute.includes('success=true')) {
    clearCart();

    setTimeout(() => {
      window.location.href = '/orders';
    }, 4000);
    // updateBalance(first);

    return (
      <Layout>
        <SuccessWrapper>
          <SuccessText>Your payment was successful !</SuccessText>
          <SuccessText>Thank you for your purchase.</SuccessText>
          <p>(auto redirect after 5 seconds)</p>
        </SuccessWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper>
        <Box>
          {!cartProducts.length && (
            <EmptyCart> Your cart is still empty 🤔</EmptyCart>
          )}
          {!!cartProducts.length && (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map(product => (
                      <tr key={product._id}>
                        <td>
                          <ImgCells>
                            <Image
                              src={product.image[0] || profilePic}
                              alt={`Image ${product.name}`}
                              width={120}
                              height={120}
                            />
                            {product.name}
                          </ImgCells>
                        </td>
                        <td>
                          <ChangeQuantityButton
                            onClick={() => minusQuantity(product._id)}
                          >
                            -
                          </ChangeQuantityButton>
                          {getQuantity(product._id)}
                          <ChangeQuantityButton
                            disabled={
                              product.balance === getQuantity(product._id)
                            }
                            onClick={() => plusQuantity(product._id)}
                          >
                            +
                          </ChangeQuantityButton>
                        </td>
                        <td>{product.price * getQuantity(product._id)} грн.</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <SumWrap>
                <p> Sum: {totalPrice || 0} грн.</p>
              </SumWrap>
            </>
          )}
        </Box>
        {cartProducts?.length > 0 && (
          <Box>
            <p>Order information</p>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={e => setName(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="City"
              value={city}
              name="city"
              onChange={e => setCity(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="Address"
              value={address}
              name="address"
              onChange={e => setAddress(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="Shipping company"
              value={shipComp}
              name="shipComp"
              onChange={e => setShipComp(e.target.value)}
            ></Input>
            <Input name="products" type="hidden" value={cartProducts} />
            <Input name="email" type="hidden" value={actualUser} />
            Test Card Number : 4242424242424242 <br /> Date : any <br /> CVV
            Code : any
            <ContinueButton onClick={() => paymentProcess()}>
              Continue to checkout
            </ContinueButton>
          </Box>
        )}
      </Wrapper>
    </Layout>
  );
};

export default Cart;
