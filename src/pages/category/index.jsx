import Layout from '@/components/ui/Layout/Layout';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { RxCross2 } from 'react-icons/rx';

import Swal from 'sweetalert2';
import {
  SaveButton,
  AddFeaturesButton,
  CategoryForm,
  Input,
  FeaturesInput,
  FeatureWrapper,
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
  SectionWrapper,
  SelectInput,
} from '@/components/ProductForm/ProductForm.styled';
import { Table } from '@/components/ui/Table/Table';
import Title from '@/components/ui/Title/Title';

const Category = () => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    try {
      axios.get('/api/category').then(response => setCategories(response.data));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function SaveCategory(e) {
    e.preventDefault();
    const data = {
      title,
      products,
      parentCategory,
      features: features.map(feature => ({
        name: feature.name,
        values: feature.values.split(','),
      })),
    };

    if (editedCategory) {
      const _id = editedCategory._id;
      try {
        await axios.put('/api/category', { ...data, _id });
      } catch (error) {}
    } else {
      try {
        await axios.post('/api/category', data);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    resetStates();
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setTitle(category.title);
    setProducts(category.products);
    setParentCategory(category.parentCategory?._id);
    setFeatures(
      category.features.map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    );
  }

  function resetStates() {
    setTitle('');
    setParentCategory('');
    setEditedCategory('');
    setFeatures([]);
  }

  function deleteCategory(category) {
    const _id = category._id;
    // console.log('deleteCategory', _id);
    Swal.fire({
      title: `Do you want to delete category ${category.title}  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await axios.delete('api/category?_id=' + _id);
        Swal.fire({
          confirmButtonColor: '#3085d6',
          icon: 'success',
          title: 'Your file has been deleted.',
        });
        fetchCategories();
      }
    });
  }

  function addFeatures() {
    setFeatures(prev => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function updatedFeatures(index, newName, type) {
    const updatedFeatures = [...features];
    switch (type) {
      case 'name':
        updatedFeatures[index].name = newName;
        setFeatures(updatedFeatures);
        break;
      case 'value':
        updatedFeatures[index].values = newName;
        setFeatures(updatedFeatures);
        break;

      default:
        break;
    }
  }

  function removeFeature(index) {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  }

  return (
    <Layout>
      <Title>
        {editedCategory
          ? `Edit "${editedCategory.title}" category`
          : 'Add new category'}
      </Title>

      <CategoryForm onSubmit={SaveCategory}>
        <SectionWrapper>
          <InputLabel>Parent category</InputLabel>
          <SelectInput
            value={parentCategory}
            onChange={e => setParentCategory(e.target.value)}
          >
            <option value="">No parent</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </SelectInput>
        </SectionWrapper>
        <SectionWrapper>
          <InputLabel>
            {editedCategory
              ? `Edit category ${editedCategory.title}`
              : 'New Category'}
          </InputLabel>

          <Input
            type="text"
            required={true}
            placeholder="Enter category"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </SectionWrapper>

        <SectionWrapper>
          <InputLabel>Additional features</InputLabel>

          {features.length > 0 &&
            features.map((feature, index) => (
              <FeatureWrapper key={index}>
                <FeaturesInput
                  type="text"
                  required={true}
                  name="name"
                  value={feature.name}
                  placeholder="name"
                  onChange={e =>
                    updatedFeatures(index, e.target.value, e.target.name)
                  }
                />
                <FeaturesInput
                  type="text"
                  required={true}
                  name="value"
                  value={feature.values}
                  placeholder="values, coma separated !!!"
                  onChange={e =>
                    updatedFeatures(index, e.target.value, e.target.name)
                  }
                />
                <DeleteFeaturesButton
                  type="button"
                  onClick={() => removeFeature(index)}
                >
                  <RxCross2 size={30} />
                </DeleteFeaturesButton>
              </FeatureWrapper>
            ))}
          <div>
            <AddFeaturesButton
              type="button"
              onClick={() => {
                addFeatures();
              }}
            >
              Add new features
            </AddFeaturesButton>
            {(editedCategory || features.length > 0) && (
              <CancelButton type="button" onClick={() => resetStates()}>
                Cancel
              </CancelButton>
            )}
          </div>
        </SectionWrapper>
        <SaveButton type="submit">
          {!editedCategory ? 'Save Category' : 'Save Changes'}
        </SaveButton>
      </CategoryForm>
      {!editedCategory && (
        <>
          <Title>Categories</Title>
          <Table>
            <Thead>
              <tr>
                <td>#</td>
                <td>Category title</td>
                <td>Parent category</td>
                <td>Tools</td>
              </tr>
            </Thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={nanoid()}>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
                  <td>{category?.parentCategory?.title}</td>
                  <td>
                    <ToolsButtonWrapper>
                      <EditTableButton
                        onClick={() => {
                          editCategory(category);
                        }}
                      >
                        Edit
                      </EditTableButton>
                      <DeleteTableButton
                        onClick={() => deleteCategory(category)}
                      >
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

export default Category;
