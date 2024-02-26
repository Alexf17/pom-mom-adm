import axios from 'axios';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { ReactSortable } from 'react-sortablejs';
import Image from 'next/image';
import { nanoid } from 'nanoid';

import profilePic from '../../../public/images/no_img.jpg';

import Layout from '@/components/ui/Layout/Layout';
import {
  ImgWrap,
  PhotoButton,
  PhotoInput,
  PhotoWrap,
  DeleteButton,
  SortContainer,
  SpinnerWrapper,
  StyledForm,
} from './ProductForm.styled';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Spinner from '../Spinner';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues

export default function ProductForm(props) {
  const { product } = props;
  const router = useRouter();

  const _id = product?._id;
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price || '');
  const [image, setImage] = useState(product?.image || '');

  async function onSubmitForm(e) {
    e.preventDefault();
    const data = { name, category, price, image };
    if (_id) {
      try {
        await axios.put('/api/products', { ...data, _id });
        alert('Success updating products');
        router.push('http://localhost:3000/products');
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      try {
        await axios.post('/api/products', data);
        router.push('http://localhost:3000/products');
      } catch (error) {
        throw new Error(error.message);
      }
    }
    resetForm();
  }

  async function uploadImage(e) {
    setIsUploading(true);
    const files = e.target.files;

    if (files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/uploads', data);

      setImage(prevState => {
        return [...prevState, res.data.links];
      });
      setIsUploading(false);
    }
  }

  const removeImage = index => {
    const updatedImages = [...image];
    updatedImages.splice(index, 1);
    setImage(updatedImages);
  };

  function updatedImages(image) {
    setImage(image);
  }

  return (
    <div>
      <StyledForm onSubmit={onSubmitForm}>
        <label htmlFor="name">Name</label>
        <input
          required={true}
          id="name"
          name="name"
          type="text"
          onChange={e => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="category">Category</label>
        <input
          required={true}
          id="category"
          name="category"
          type="text"
          onChange={e => setCategory(e.target.value)}
          value={category}
        />

        <label htmlFor="price">Price </label>
        <input
          required={true}
          id="price"
          name="price"
          type="number"
          onChange={e => setPrice(e.target.value)}
          value={price}
        />

        <label htmlFor="image">Image</label>

        <PhotoInput>
          {isUploading && (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          )}

          <SortContainer list={image} setList={updatedImages}>
            {image.length != 0 &&
              image.map((link, index) => (
                <ImgWrap key={nanoid()}>
                  <Image
                    src={link}
                    alt={`Image ${index + 1}`}
                    width={150}
                    height={150}
                  />

                  <DeleteButton
                    type="button"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </DeleteButton>
                </ImgWrap>
              ))}
          </SortContainer>

          <PhotoWrap type="button">
            {image.length === 0 && (
              <Image
                src={profilePic}
                alt={`Image ${profilePic}`}
                width={150}
                height={150}
              />
            )}
            <PhotoButton>Add photo</PhotoButton>
            <input
              style={{ visibility: 'hidden' }}
              id="image"
              name="image"
              type="file"
              // onChange={formik.handleChange}
              onChange={uploadImage}
              // value={formik.values.image[0][0]}
            />
          </PhotoWrap>
        </PhotoInput>

        <button type="submit">Submit</button>
      </StyledForm>
    </div>
  );
}
