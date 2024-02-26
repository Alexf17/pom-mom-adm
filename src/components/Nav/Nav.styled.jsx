import Link from 'next/link';
import styled from 'styled-components';

export const Navigation = styled.nav`
  margin: 10px 15px;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* & > :last-child {
    margin-top: 50px;
  } */
`;

export const Wrap = styled.div`
  background: linear-gradient(
    270deg,
    #b791da 0%,
    rgba(183, 145, 218, 0.7) 100%
  );
  padding: 20px 15px;

  box-shadow: ${p => p.theme.boxShadow};
`;

export const LogoLink = styled(Link)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  font-family: 'Sigmar One', cursive;

  span {
    font-size: 1.3rem;
    font-family: inherit;

    margin-top: 5px;
    text-align: center;

    text-shadow: ${p => p.theme.boxShadow};
  }
`;

export const NavLink = styled(Link)`
  font-family: 'Sigmar One', cursive;
  font-size: 1.3rem;

  width: 100%;
  padding: 10px;

  display: flex;
  gap: 10px;
  align-items: center;
  color: ${p => (p.active ? p.theme.textBlackMain : p.theme.darkGreyText)};
  text-shadow: ${p => (p.active ? p.theme.boxShadow : null)};

  transition: color 300ms ease-in-out;

  svg {
    transition: all 300ms ease-in-out;

    width: 30px;
    height: 30px;
  }

  &:hover svg,
  &:focus svg {
    stroke: ${p => p.theme.textBlackMain};
    fill: ${p => (p.brand ? p.theme.textBlackMain : null)};
  }

  &:hover,
  &:focus {
    color: ${p => p.theme.textBlackMain};
  }
`;
