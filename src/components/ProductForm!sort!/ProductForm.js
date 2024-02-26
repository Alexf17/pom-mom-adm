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
const validate = values => {
  const errors = {};
  if (!values.name) {
    // errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.category) {
    // errors.category = 'Required';
  } else if (values.category.length > 20) {
    errors.category = 'Must be 20 characters or less';
  }

  if (!values.price) {
    // errors.price = 'Required';
  } else if (values.price.length > 20) {
    errors.category = 'Must be 20 characters or less';
  }
  // if (!values.image) {
  //   // errors.image = 'Required';
  // } else if (values.image.length > 1000) {
  //   errors.category = 'Must be image';
  // }
  return errors;
};

export default function ProductForm(props) {
  // const [images, setImages] = useState('');

  const [isUploading, setIsUploading] = useState(false);

  const { product } = props;

  const _id = product?._id;
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price || '',
      image: product?.image || [],
    },
    validate,
    onSubmit: async (values, actions) => {
      // formik.values.image = [...images];
      if (_id) {
        try {
          await axios.put('/api/products', { ...values, _id });
          alert('Success updating products');
          router.push('http://localhost:3000/products');
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        try {
          await axios.post('/api/products', values);
          router.push('http://localhost:3000/products');
        } catch (error) {
          throw new Error(error.message);
        }
      }
      actions.resetForm();
    },
  });

  async function uploadImage(e) {
    setIsUploading(true);
    const files = e.target.files;

    if (files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/uploads', data);
      formik.values.image = [...res.data.links, ...formik.values.image];

      // setImages(prevState => {
      //   return [...prevState, res.data.links, formik.values.image];
      // });
      setIsUploading(false);
    }
  }

  const removeImage = index => {
    const updatedImages = [...formik.values.image];
    updatedImages.splice(index, 1);
    formik.setFieldValue('image', updatedImages);
  };

  function updatedImages() {
    console.log('updatedImages', arguments);
  }

  return (
    <div>
      <StyledForm onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          required={true}
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}

        <label htmlFor="category">Category</label>
        <input
          required={true}
          id="category"
          name="category"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.category}
        />
        {formik.errors.category ? <div>{formik.errors.category}</div> : null}

        <label htmlFor="price">Price </label>
        <input
          required={true}
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        {formik.errors.price ? <div>{formik.errors.price}</div> : null}

        <label htmlFor="image">Image</label>

        <PhotoInput>
          {isUploading && (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          )}

          <SortContainer list={formik.values.image} setList={updatedImages}>
            {formik.values.image.length != 0 &&
              formik.values.image.map((link, index) => (
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
            {formik.values.image.length === 0 && (
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

        {formik.errors.image ? <div>{formik.errors.image}</div> : null}

        <button type="submit">Submit</button>
      </StyledForm>
    </div>
  );
}
