import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

export const Images = styled(Image)`
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const Links = styled(Link)`
  text-decoration: none;
  background-color: honeydew;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
`;

export const List = styled.ul`
  padding: 5px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const ListItem = styled.li`
  display: grid;
`;

export const ListWrapper = styled(Link)`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid honeydew;
  text-decoration: none;
  border-radius: 5px;
  padding: 5px;
  min-width: 200px;
  min-height: 150px;
`;

export const EditButton = styled(Link)`
  margin: 20px auto;
  padding: 5px;
  font-size: 20px;
  border: 1px solid honeydew;
  border-radius: 5px;
  text-decoration: none;
  color: #3085d6;
  cursor: pointer;
`;
export const AddToCartButton = styled.button`
  z-index: 5;
  margin: 10px auto;
  padding: 5px;
  font-size: 20px;
  border: 1px solid honeydew;
  border-radius: 5px;
  text-decoration: none;
  /* color: #d33; */
  color: #3085d6;
  cursor: pointer;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
