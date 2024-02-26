import axios from 'axios';

import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import { RxPlusCircled } from 'react-icons/rx';

import Image from 'next/image';
import { nanoid } from 'nanoid';

import Swal from 'sweetalert2';

import profilePic from '../../../public/images/no_img.jpg';

import {
  ImgWrap,
  PhotoButton,
  PhotoInput,
  PhotoWrap,
  DeleteButton,
  SortContainer,
  SpinnerWrapper,
  StyledForm,
  FeaturesItem,
  SectionWrapper,
  SaveButton,
  CancelButton,
  ButtonWrapper,
  InputLabel,
  SelectInput,
  Input,
  DoubleWrapper,
  NumberInput,
  DescriptionInput,
  CheckBoxWrapper,
} from './ProductForm.styled';
import { useEffect, useState } from 'react';

import Spinner from '../Spinner';

const validate = values => {
  const errors = {};
  if (!values.name) {
    // errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
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
  const { product } = props;
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sortedImages, setSortedImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [productFeatures, setProductFeatures] = useState(
    product?.features || {}
  );

  const _id = product?._id;
  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      brand: product?.brand || {},
      category: product?.category || '',
      description: product?.description || '',
      products: product?.products || '',
      price: product?.price || '',
      newPrice: product?.newPrice || '',
      isPopular: product?.isPopular || false,
      isPromoted: product?.isPromoted || false,
      isHits: product?.isHits || false,
      freeDelivery: product?.freeDelivery || false,
      weight: product?.weight || '',
      image: product?.image || [],
      features: product?.features || {},
      holistic: product?.holistic || false,
      balance: product?.quantity || '',
      vendorCode: product?.vendorCode || '',
    },
    validate,
    onSubmit: async (values, actions) => {
      if (_id) {
        try {
          await axios.put('/api/products', {
            ...values,
            _id,
            features: productFeatures,
          });
          sweatAlert(values.name);
          router.push('http://localhost:3000/products');
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        try {
          console.log('values', values);
          await axios.post('/api/products', {
            ...values,
            features: productFeatures,
          });
          GoBack();
        } catch (error) {
          throw new Error(error.message);
        }
      }
      actions.resetForm();
    },
  });

  useEffect(() => {
    try {
      axios.get('/api/category').then(response => setCategories(response.data));
      axios
        .get('/api/brand')
        .then(response =>
          setBrands(
            response.data.slice().sort((a, b) => a.name.localeCompare(b.name))
          )
        );
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  useEffect(() => {
    setSortedImages(formik.values.image);
  }, [formik.values.image]);

  useEffect(() => {
    if (formik.values.category) {
      const selected = categories.filter(
        c =>
          c.parentCategory?._id ===
          (formik.values.category._id || formik.values.category)
      );
      if (selected) {
        setSelectedCategory(selected);
      } else {
        setSelectedCategory([]);
      }
    } else {
      setSelectedCategory([]);
    }
  }, [formik.values.category._id, categories, formik.values.category]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData('text/plain');
    const targetIndex = e.target.getAttribute('data-index');
    const updatedImages = [...sortedImages];
    const [removed] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, removed);
    setSortedImages(updatedImages);
    formik.setFieldValue('image', updatedImages);
  };

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

      setIsUploading(false);
    }
  }

  function removeImage(index) {
    const updatedImages = [...formik.values.image];
    updatedImages.splice(index, 1);
    formik.setFieldValue('image', updatedImages);
  }

  function sweatAlert(name) {
    let timerInterval;
    Swal.fire({
      title: `Product ${name}  is updated`,
      timer: 1500,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(result => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  }

  function handleFeatures(value, name) {
    setProductFeatures(prev => {
      const newFeatures = { ...prev };
      newFeatures[name] = value;
      // formik.values.features = newFeatures;

      return newFeatures;
    });
  }

  function GoBack() {
    router.push('http://localhost:3000/products');
  }

  const featuresList = [];
  if (selectedCategory.length > 0 && formik.values.products) {
    let catInfo = selectedCategory.find(
      ({ _id }) => _id === formik.values.products
    );
    if (catInfo) {
      featuresList.push(...catInfo.features);
    }
  }

  return (
    <div>
      <StyledForm onSubmit={formik.handleSubmit}>
        <SectionWrapper>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            required={true}
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </SectionWrapper>
        <SectionWrapper>
          <InputLabel htmlFor="vendorCode"> Артикул</InputLabel>
          <Input
            style={{ marginRight: '15px', width: '80%' }}
            required={true}
            id="vendorCode"
            name="vendorCode"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.vendorCode}
          />
        </SectionWrapper>
        <DoubleWrapper>
          <SectionWrapper>
            <InputLabel>Category</InputLabel>
            <SelectInput
              id="category"
              required={true}
              value={formik.values.category._id}
              onChange={formik.handleChange}
            >
              <option value="">Сhoose a category</option>
              {categories.length > 0 &&
                categories.map(c => {
                  if (!c.parentCategory) {
                    return (
                      <option key={c._id} value={c._id}>
                        {c.title}
                      </option>
                    );
                  }
                })}
            </SelectInput>
          </SectionWrapper>

          <InputLabel>Product</InputLabel>
          <SelectInput
            id="products"
            required={true}
            value={formik.values.products._id}
            onChange={formik.handleChange}
          >
            {/* {console.log('formik.values.products', formik.values.products._id)} */}
            <option value="">Сhoose a product</option>
            {selectedCategory?.length > 0 &&
              selectedCategory.map(c => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
          </SelectInput>

          <InputLabel>Brand</InputLabel>
          <SelectInput
            id="brand"
            required={true}
            value={formik.values.brand.name}
            onChange={e => {
              const selectedBrand = brands.find(
                brand => brand.name === e.target.value
              );

              formik.setValues({
                ...formik.values,
                brand: selectedBrand || '',
              });
            }}
          >
            <option value="">Сhoose a brand</option>
            {brands?.length > 0 &&
              brands.map(c => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
          </SelectInput>

          {formik.values.products === '64e14992b66923a436907da1' ||
          formik.values.products === '64e1ebbdb66923a436907dc9' ? (
            <>
              <InputLabel htmlFor="holistic"> Холистик</InputLabel>
              <Input
                style={{ marginRight: '15px' }}
                id="holistic"
                name="holistic"
                type="checkbox"
                onChange={formik.handleChange}
                value={formik.values.holistic}
              />
            </>
          ) : null}
        </DoubleWrapper>
        {featuresList.length > 0 && (
          <SectionWrapper>
            <InputLabel>Features</InputLabel>
            <FeaturesItem>
              {featuresList.length > 0 &&
                featuresList.map(f => (
                  <div key={f.name}>
                    <div>{f.name}</div>
                    <SelectInput
                      value={
                        // formik.values.features[f.name] ||
                        productFeatures[f.name]
                      }
                      onChange={e => handleFeatures(e.target.value, f.name)}
                    >
                      <option value="">Сhoose</option>
                      {f.values.map(v => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                ))}
            </FeaturesItem>
          </SectionWrapper>
        )}
        <DoubleWrapper>
          <InputLabel htmlFor="price">Price</InputLabel>
          <NumberInput
            style={{ marginRight: '15px' }}
            required={true}
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <span>UAH</span>
          {formik.errors.price ? <div>{formik.errors.price}</div> : null}{' '}
          <InputLabel htmlFor="newPrice">New Price</InputLabel>
          <NumberInput
            style={{ marginRight: '15px' }}
            id="newPrice"
            name="newPrice"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.newPrice}
          />
          <span>UAH</span>
          {formik.errors.newPrice ? <div>{formik.errors.newPrice}</div> : null}
          <div>
            <InputLabel htmlFor="weight">Weight </InputLabel>
            <Input
              style={{ marginRight: '15px' }}
              placeholder="in grams!"
              id="weight"
              name="weight"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.weight}
            />
            <span>grams</span>
          </div>
        </DoubleWrapper>
        <DoubleWrapper>
          <InputLabel htmlFor="balance">Quantity </InputLabel>
          <NumberInput
            style={{ marginRight: '15px' }}
            required={true}
            id="balance"
            name="balance"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.balance}
          />
          {formik.errors.balance ? <div>{formik.errors.balance}</div> : null}
        </DoubleWrapper>
        <DoubleWrapper>
          <p>Дополнительная информация</p>
          <CheckBoxWrapper>
            <label htmlFor="isPopular">Популярный</label>
            <Input
              style={{ marginRight: '15px' }}
              id="isPopular"
              name="isPopular"
              type="checkbox"
              onChange={formik.handleChange}
              value={formik.values.isPopular}
            />
          </CheckBoxWrapper>
          <CheckBoxWrapper>
            <label htmlFor="isPromoted">Акционный</label>
            <Input
              style={{ marginRight: '15px' }}
              id="isPromoted"
              name="isPromoted"
              type="checkbox"
              onChange={formik.handleChange}
              value={formik.values.isPromoted}
            />
          </CheckBoxWrapper>
          <CheckBoxWrapper>
            <label htmlFor="isHits"> Хит</label>
            <Input
              style={{ marginRight: '15px' }}
              id="isHits"
              name="isHits"
              type="checkbox"
              onChange={formik.handleChange}
              value={formik.values.isHits}
            />
          </CheckBoxWrapper>
          <CheckBoxWrapper>
            <label htmlFor="freeDelivery">Бесплатная доставка</label>
            <Input
              style={{ marginRight: '15px' }}
              id="freeDelivery"
              name="freeDelivery"
              type="checkbox"
              onChange={formik.handleChange}
              value={formik.values.freeDelivery}
            />
          </CheckBoxWrapper>
        </DoubleWrapper>
        <SectionWrapper>
          <InputLabel htmlFor="description">Description</InputLabel>
          <DescriptionInput
            // required={true}
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </SectionWrapper>
        <SectionWrapper>
          <InputLabel htmlFor="image">Image</InputLabel>
          <PhotoInput>
            {isUploading && (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            )}

            {sortedImages.map((link, index) => (
              <ImgWrap
                key={nanoid()}
                draggable
                onDragStart={e => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-index={index}
              >
                <Image
                  src={link}
                  alt={`Image ${index + 1}`}
                  width={180}
                  height={180}
                />
                <DeleteButton type="button" onClick={() => removeImage(index)}>
                  X
                </DeleteButton>
              </ImgWrap>
            ))}

            <PhotoWrap type="button">
              {formik.values.image.length === 0 && (
                <Image
                  src={profilePic}
                  alt={`Image ${profilePic}`}
                  width={180}
                  height={180}
                />
              )}
              <PhotoButton>
                <RxPlusCircled />
                Add photo
              </PhotoButton>
              <Input
                style={{ display: 'none' }}
                id="image"
                name="image"
                type="file"
                onChange={uploadImage}
              />
            </PhotoWrap>
          </PhotoInput>
          {formik.errors.image ? <div>{formik.errors.image}</div> : null}
        </SectionWrapper>
        <ButtonWrapper>
          {!product && (
            <CancelButton onClick={() => GoBack()} type="button">
              Cancel
            </CancelButton>
          )}

          <SaveButton type="submit">Save</SaveButton>
        </ButtonWrapper>
      </StyledForm>
    </div>
  );
}
