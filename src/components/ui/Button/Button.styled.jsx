import Link from 'next/link';
import styled from 'styled-components';

export const StyledBtn = styled(Link)`
  font-family: 'Sigmar One', cursive;

  display: block;
  border-radius: 50px;
  text-align: center;
  padding: 10px 15px;
  background-color: ${p => p.bgColor};

  width: ${p => p.width};

  transition: box-shadow 300ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: ${p => p.theme.boxShadow};
  }
`;
