const { useSession, signIn } = require('next-auth/react');

import { FcGoogle } from 'react-icons/fc';

import Link from 'next/link';
import Image from 'next/image';

import Nav from '@/components/Nav/Nav';
import LoginForm from '@/components/LoginForm/LoginForm';

import {
  GridContainer,
  LeftWrapper,
  WelcomeTitle,
  MainTitle,
  MenuWrapper,
  RightWrapper,
  LoginTitle,
  GoogleBtn,
  Wrapper,
  StyledLink,
  AdminText,
} from '@/components/WelcomeScreen/WelcomeScreen.styled';

const Layout = ({ children }) => {
  const { data: session } = useSession();

  async function GoogleLogin() {
    signIn('google', { callbackUrl: 'http://localhost:3000/' });
  }

  if (!session) {
    return (
      <GridContainer>
        <LeftWrapper>
          <Image src="/logo.svg" alt="logo" width={637} height={236} />
          <AdminText>Admin</AdminText>
          <MainTitle>Nice to see you again</MainTitle>
          <WelcomeTitle>Welcome back</WelcomeTitle>
        </LeftWrapper>
        <RightWrapper>
          <LoginTitle>LOGIN ACCOUNT</LoginTitle>
          <GoogleBtn onClick={GoogleLogin} type="button">
            <FcGoogle />
          </GoogleBtn>
          <span>or</span>
          <LoginForm />
          <span>
            Don`t have an account yet?
            <StyledLink href="/signUp">... SignUp</StyledLink>
          </span>
        </RightWrapper>
      </GridContainer>
    );
  }

  return (
    <Wrapper>
      <Nav userName={session?.user.name} />
      <MenuWrapper>{children}</MenuWrapper>
    </Wrapper>
  );
};

export default Layout;
