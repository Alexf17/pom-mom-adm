import Layout from '@/components/ui/Layout/Layout';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { RxCross2, RxPlusCircled } from 'react-icons/rx';

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from 'react-icons/ai';

import Swal from 'sweetalert2';
import {
  SaveButton,
  AddFeaturesButton,
  CategoryForm,
  Input,
  FeaturesInput,
  DeleteFeaturesButton,
  CancelButton,
  CategoryTable,
  EditTableButton,
  DeleteTableButton,
  Thead,
  ToolsButtonWrapper,
} from '../../Style/Category.styled';
import {
  InputLabel,
  PhotoButton,
  PhotoInput,
  PhotoWrap,
  SectionWrapper,
  SelectInput,
  SpinnerWrapper,
} from '@/components/ProductForm/ProductForm.styled';
import Spinner from '@/components/Spinner';

import Image from 'next/image';
import {
  BrandForm,
  DeleteButton,
  ImgWrap,
  InputWrapper,
} from '@/Style/Brands.styled';

import profilePic from '../../../public/images/no_img.jpg';
import Title from '@/components/ui/Title/Title';

import { Table } from '@/components/ui/Table/Table';

const Brands = () => {
  const [name, setName] = useState('');

  const [sortByCountry, setSortByCountry] = useState(false);

  const [brands, setBrands] = useState([]);
  const [manufacturerCountry, setManufacturerCountry] = useState('');
  const [img, setImg] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [editedBrand, setEditedBrand] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchBrands();
  }, []);

  function fetchBrands() {
    try {
      axios.get('/api/brand').then(response => {
        const sortedBrands = response.data
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
        setBrands(sortedBrands);
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function saveBrand(e) {
    e.preventDefault();
    const data = {
      name,
      manufacturerCountry,
      img,
    };
    if (img.length === 0) {
      alert('Please select Images...');
      return;
    }

    if (editedBrand) {
      const _id = editedBrand._id;
      try {
        await axios.put('/api/brand', { ...data, _id });
      } catch (error) {}
    } else {
      try {
        await axios.post('/api/brand', data);
      } catch (error) {
        Swal.fire({
          title: `Brand with name ${data.name} already exists. Please enter correct Brand name.`,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        return;
      }
    }
    resetStates();
    fetchBrands();
  }

  function editBrand(brand) {
    setEditedBrand(brand);
    setManufacturerCountry(brand.manufacturerCountry);
    setName(brand.name);
    setImg(brand.image);
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
      setImg(res.data.links);
      setIsUploading(false);
    }
  }

  function resetStates() {
    setName('');
    setImg([]);
    setManufacturerCountry('');
    setEditedBrand('');
  }

  function deleteBrand(brand) {
    Swal.fire({
      title: `Do you want to delete brand ${brand.name}  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await axios.delete('api/brand?_id=' + brand._id);
        Swal.fire({
          confirmButtonColor: '#3085d6',
          icon: 'success',
          title: 'Your file has been deleted.',
        });
        fetchBrands();
      }
    });
  }

  function onSortByCountry(brands) {
    setSortByCountry(prev => !prev);

    const sortedBrandsByCountry = brands
      ?.slice()
      .sort((a, b) =>
        sortByCountry
          ? a.manufacturerCountry.localeCompare(b.manufacturerCountry)
          : b.manufacturerCountry.localeCompare(a.manufacturerCountry)
      );

    setBrands(sortedBrandsByCountry);
  }

  function removeImage() {
    setImg([]);
  }

  return (
    <Layout>
      <Title>
        {editedBrand ? `Edit ${editedBrand.name} brand` : 'Add new brand'}
      </Title>
      <BrandForm onSubmit={saveBrand}>
        <SectionWrapper>
          <InputLabel>
            {editedBrand ? `Edit brand ${editedBrand.name}` : 'New Brand'}
          </InputLabel>
          <InputWrapper>
            <Input
              type="text"
              required={true}
              placeholder="Enter brand"
              onChange={e => setName(e.target.value)}
              value={name}
            />
            {name && (
              <button onClick={() => setName('')}>
                <RxCross2 size={25} />
              </button>
            )}
          </InputWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <InputLabel>
            {editedBrand
              ? `Edit manufacturer country ${editedBrand.name}`
              : 'New manufacturer country'}
          </InputLabel>
          <InputWrapper>
            <Input
              type="text"
              required={true}
              placeholder="Enter manufacturer country"
              onChange={e => setManufacturerCountry(e.target.value)}
              value={manufacturerCountry}
            />
            {manufacturerCountry && (
              <button onClick={() => setManufacturerCountry('')}>
                <RxCross2 size={25} />
              </button>
            )}
          </InputWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <InputLabel htmlFor="image">Brand Logo</InputLabel>
          <PhotoInput>
            {isUploading && (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            )}

            {img.length > 0 && (
              <ImgWrap key={nanoid()}>
                <Image src={img[0]} alt={name} width={200} height={200} />
                <DeleteButton type="button" onClick={() => removeImage()}>
                  <RxCross2 size={20} />
                </DeleteButton>
              </ImgWrap>
            )}

            <PhotoWrap type="button">
              {img.length === 0 && (
                <>
                  <Image
                    src={profilePic}
                    alt={`Image ${profilePic}`}
                    width={180}
                    height={180}
                  />
                  <PhotoButton>
                    <RxPlusCircled size={20} />
                    Add photo
                  </PhotoButton>
                </>
              )}

              <Input
                style={{ visibility: 'hidden' }}
                // required={true}
                id="image"
                name="image"
                type="file"
                onChange={uploadImage}
              />
            </PhotoWrap>
          </PhotoInput>
        </SectionWrapper>
        <div style={{ margin: 'auto' }}>
          {editedBrand && (
            <CancelButton
              style={{ marginRight: '10px' }}
              onClick={() => resetStates()}
            >
              Cancel
            </CancelButton>
          )}
          <SaveButton type="submit">
            {!editedBrand ? 'Save new Brand' : 'Save Changes'}
          </SaveButton>
        </div>
      </BrandForm>

      {!editedBrand && (
        <>
          <Title>Brands</Title>
          <SectionWrapper style={{ width: '80%', margin: '0 auto' }}>
            <InputWrapper>
              <Input
                type="text"
                placeholder="Search by brand name"
                onChange={e => setSearchValue(e.target.value)}
                value={searchValue}
                style={{ marginBottom: '15px' }}
              />
              {searchValue && (
                <button onClick={() => setSearchValue('')}>
                  <RxCross2 size={25} />
                </button>
              )}
            </InputWrapper>
          </SectionWrapper>
          <Table>
            <Thead>
              <tr>
                <td>№</td>
                <td>Brand name</td>
                <td>
                  <div>
                    Country
                    <button
                      type="button"
                      onClick={() => onSortByCountry(brands)}
                    >
                      {sortByCountry ? (
                        <AiOutlineSortDescending size={25} />
                      ) : (
                        <AiOutlineSortAscending size={25} />
                      )}
                    </button>
                  </div>
                </td>
                <td>Image</td>
                <td>Tools</td>
              </tr>
            </Thead>

            <tbody>
              {brands
                .filter(brand =>
                  searchValue
                    ? brand.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      brand.manufacturerCountry
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    : true
                )
                .map((brand, index) => (
                  <tr key={nanoid()}>
                    <td>{index + 1}</td>
                    <td>{brand.name}</td>
                    <td>{brand?.manufacturerCountry}</td>
                    <td>
                      <Image
                        src={brand.image[0] || profilePic}
                        alt={brand.name}
                        width={50}
                        height={50}
                        style={{ margin: '5px 0' }}
                      />
                    </td>
                    <td>
                      <ToolsButtonWrapper>
                        <EditTableButton
                          onClick={() => {
                            editBrand(brand);
                          }}
                        >
                          Edit
                        </EditTableButton>
                        <DeleteTableButton onClick={() => deleteBrand(brand)}>
                          Delete
                        </DeleteTableButton>
                      </ToolsButtonWrapper>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
  return { props: { session: session } };
}

export default Brands;
