import { useParams, Link } from 'react-router-dom';

import { FaArrowAltCircleLeft } from 'react-icons/fa';

import { Title } from 'components/UI/Title/Title';
import {
  CardWrapper,
  ImgWrapper,
  InfoWrapper,
  Description,
  IngredientsTitle,
  IngredientItem,
} from './RecipePage.styled';

import recipes from '../../recipes.json';
import { CategoryList } from 'components/UI/CategoryList/CategoryList';
import { Info } from 'components/UI/InfoBlock/InfoBlock';

export const RecipePage = () => {
  let { name } = useParams();

  const recipe = recipes.filter(recipe => recipe.name === name);

  const { url, description, ingredients, categories, rating, time, calorie } =
    recipe[0];

  console.log(recipe);

  return (
    <>
      <Link to="/">
        <FaArrowAltCircleLeft size={30} color={'black'} />
      </Link>
      <CardWrapper style={{ display: 'flex' }}>
        <ImgWrapper>
          <img src={url} alt={name} />
        </ImgWrapper>
        <InfoWrapper>
          <Title>{name}</Title>

          <Description>
            <q>{description}</q>
          </Description>
          <CategoryList categories={categories} size={'big'} />
          <IngredientsTitle>Ingredients</IngredientsTitle>
          <ul style={{ marginBottom: '20px' }}>
            {ingredients.map(ingredient => (
              <IngredientItem key={ingredient}>{ingredient}</IngredientItem>
            ))}
          </ul>
          <Info time={time} calorie={calorie} rating={rating} size={'big'} />
        </InfoWrapper>
      </CardWrapper>
    </>
  );
};
// ingredients, rating, time, categories,calorie
