import Layout from '@/components/ui/Layout/Layout';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
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
import { BrandForm, DeleteButton, ImgWrap } from '@/Style/Brands.styled';
import profilePic from '../../../public/images/no_img.jpg';
import Brand from '@/models/Brand';
import connectMongo from '@/db/mongoose';

const Brands = ({ allBrands, load }) => {
  const [brands, setBrands] = useState(allBrands);

  const [searchValue, setSearchValue] = useState('');

  return (
    <Layout>
      <SectionWrapper style={{ width: '80%', margin: '0 auto' }}>
        <Input
          type="text"
          placeholder="Search by brand name"
          onChange={e => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </SectionWrapper>
      <CategoryTable>
        <Thead>
          <tr>
            <td>Brand name</td>
            <td>Image</td>
          </tr>
        </Thead>
        <tbody>
          {brands
            .filter(brand =>
              searchValue
                ? brand.name.toLowerCase().includes(searchValue.toLowerCase())
                : true
            )
            .map(brand => (
              <tr key={nanoid()}>
                <td>{brand.name}</td>
                <td>
                  <Image
                    src={brand.image[0] || profilePic}
                    alt={brand.name}
                    width={50}
                    height={50}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </CategoryTable>
    </Layout>
  );
};

export async function getStaticProps() {
  await connectMongo();

  const res = await Brand.find();
  const sortedBrands = res.slice().sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: {
      allBrands: JSON.parse(JSON.stringify(sortedBrands)),
      load: 1,
    },
    revalidate: 10,
  };
}

export default Brands;
