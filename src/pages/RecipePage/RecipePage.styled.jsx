import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ImgWrapper = styled.div`
  width: 600px;
  margin-right: 40px;
`;

export const InfoWrapper = styled.div``;

export const Description = styled.p`
  display: block;
  text-align: center;
  font-family: 'Luckiest Guy', cursive;
  margin-bottom: 20px;
  color: ${p => p.theme.colors.pink};
`;

export const IngredientsTitle = styled.h3`
  font-family: 'Luckiest Guy', cursive;
  margin-bottom: 10px;
  font-size: 20px;
  color: ${p => p.theme.colors.green};
`;

export const IngredientItem = styled.li`
  list-style: square;
  font-family: 'Luckiest Guy', cursive;
`;
