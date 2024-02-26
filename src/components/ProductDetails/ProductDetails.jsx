import { useRouter } from 'next/router';

import Image from 'next/image';
import { nanoid } from 'nanoid';

import ModalImage from 'react-modal-image';

import profilePic from '../../../public/images/no_img.jpg';

import {
  ImgWrap,
  AddToCurtButton,
  Img,
  SecondWrap,
} from './ProductDetails.styled';
import { useContext } from 'react';
import { Context } from '@/components/Context/CartContext';

export default function ProductDetails(props) {
  const { product } = props;
  console.log(product);
  const router = useRouter();
  const { addProduct } = useContext(Context);

  function addProductToCart() {
    addProduct(product._id);
  }

  return (
    <div>
      <ImgWrap>
        {product.image.length === 0 && (
          <Image
            src={profilePic}
            alt={`Image ${profilePic}`}
            width={150}
            height={150}
          />
        )}
        {product.image.length !== 0 &&
          product.image.map((link, index) => (
            <Img
              key={nanoid()}
              small={link}
              large={link}
              alt={`Image ${index + 1}`}
              hideDownload={true}
            />
          ))}
      </ImgWrap>
      <SecondWrap>
        <p>Name: {product.name}</p>
        <p>Category: {product.category.title}</p>
        <p>Price: {product.price} грн.</p>
        <AddToCurtButton onClick={addProductToCart}>
          Add to Cart
        </AddToCurtButton>
      </SecondWrap>
    </div>
  );
}
