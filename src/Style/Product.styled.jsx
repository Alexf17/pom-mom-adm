import Link from 'next/link';
import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 5px;
  min-width: 200px;
  min-height: 150px;
`;

export const GoBackButton = styled.button`
  padding: 5px;
  border: 1px solid honeydew;
  border-radius: 5px;
  cursor: pointer;
  color: #d33;
  margin-bottom: 10px;
`;
