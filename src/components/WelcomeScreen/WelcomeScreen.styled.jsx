import DEVICE from '@/constants/mediaSizes';
import Link from 'next/link';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  padding: 15px 30px;

  background: linear-gradient(
    270deg,
    #b791da 0%,
    rgba(183, 145, 218, 0.7) 100%
  );

  @media ${DEVICE.tablet} {
    padding: 0px;

    display: grid;
    grid-template-columns: 1fr 1fr;

    background: none;
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;

  @media ${DEVICE.tablet} {
    height: 100%;

    background: linear-gradient(
      270deg,
      #b791da 0%,
      rgba(183, 145, 218, 0.7) 100%
    );
  }

  img {
    width: 250px;
    height: auto;

    @media ${DEVICE.tablet} {
      width: 375px;
    }

    @media ${DEVICE.desktop} {
      width: 637px;
    }
  }
`;

export const MainTitle = styled.h1`
  text-align: center;
  font-size: 1rem;
  margin: 1rem 0;

  @media ${DEVICE.tablet} {
    margin: 2rem 0;
    font-size: 2rem;
  }
`;

export const WelcomeTitle = styled.h3`
  @media ${DEVICE.tablet} {
    font-size: 2.5rem;
  }
  @media ${DEVICE.desktop} {
    font-size: 5rem;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;

  @media ${DEVICE.tablet} {
    background-color: ${p => p.theme.whiteBg};
    padding: 0 30px;
  }

  @media ${DEVICE.desktop} {
    padding: 0 80px;
  }

  span {
    margin-bottom: 20px;
  }
`;

export const LoginTitle = styled.h2`
  text-align: center;
  font-size: 1.3rem;

  margin: 2rem 0 1rem;

  @media ${DEVICE.tablet} {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
`;

export const GoogleBtn = styled.button`
  cursor: pointer;
  border-radius: 40px;
  padding: 10px 10px;
  border: 2px solid ${p => p.theme.textBlackMain};
  display: flex;
  align-items: center;
  background-color: ${p => p.theme.whiteBg};
  font-size: 2rem;

  margin-bottom: 20px;

  transition: box-shadow 300ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: ${p => p.theme.boxShadow};
  }
`;

export const ExitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 0 60px;

  p {
    font-size: 2rem;
  }
`;
export const SignOutBtn = styled.button`
  cursor: pointer;
  border-radius: 40px;
  padding: 10px 10px;
  border: 2px solid ${p => p.theme.textBlackMain};
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 2rem;

  margin: 40px 0 20px 0;

  &:hover,
  &:focus {
    box-shadow: ${p => p.theme.boxShadow};
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  /* min-height: 100%; */
  /* height: 100vh; */

  @media ${DEVICE.tablet} {
    display: flex;
  }
`;

export const MenuWrapper = styled.div`
  padding: 30px;
  background-color: ${p => p.theme.whiteBg};
  flex-grow: 1;
`;

export const StyledLink = styled(Link)`
  font-weight: 700;
  font-weight: 1.2rem;

  transition: color 300ms ease-in-out;

  &:hover,
  &:focus {
    color: ${p => p.theme.BtnVioletHover};
  }
`;

export const AdminText = styled.p`
  font-family: 'Sigmar One', cursive;
  font-size: 2.5rem;
  margin-top: 1rem;

  @media ${DEVICE.tablet} {
    font-size: 3rem;
  }
  @media ${DEVICE.tablet} {
    font-size: 6rem;
  }
`;
