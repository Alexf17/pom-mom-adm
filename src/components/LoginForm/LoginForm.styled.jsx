import DEVICE from '@/constants/mediaSizes';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 20px;

  svg {
    transition: fill 300ms ease-in-out;
  }

  & label {
    margin-bottom: 10px;
    margin-left: 20px;
    display: block;
    font-size: 1.1rem;
    font-weight: 500;
  }

  & input {
    width: 100%;
    height: 55px;
    border-radius: 40px;
    padding: 0 20px;
    margin-right: 5px;
    border: 2px solid ${p => p.theme.BtnVioletMain};

    font-weight: 700;

    transition: all 300ms ease-in-out;

    &:hover,
    &:focus {
      border-color: ${p => p.theme.BtnVioletHover};
      outline: none;
    }

    &:hover + svg,
    &:focus + svg {
      fill: ${p => p.theme.whiteText};
    }
    &:hover + span svg,
    &:focus + span svg {
      fill: ${p => p.theme.whiteText};
    }

    @media ${DEVICE.tablet} {
      &:hover + svg,
      &:focus + svg {
        fill: ${p => p.theme.BtnVioletHover};
      }
      &:hover + span svg,
      &:focus + span svg {
        fill: ${p => p.theme.BtnVioletHover};
      }
    }
  }

  & button {
    cursor: pointer;
    height: 50px;
    border-radius: 40px;
    background-color: ${p => p.theme.BtnVioletMain};
    color: ${p => p.theme.whiteBg};
    font-size: 1.1rem;
    font-family: inherit;
    font-weight: 600;
    border: 1px solid ${p => p.theme.textBlackMain};
    width: 80%;
    margin: 0 auto 50px;

    transition: all 300ms ease-in-out;

    @media ${DEVICE.tablet} {
      border: none;
    }

    &:hover,
    &:focus {
      background-color: ${p => p.theme.BtnVioletHover};
      box-shadow: ${p => p.theme.boxShadow};
    }
  }
`;

export const Wrap = styled.div`
  align-items: center;
  display: flex;
`;

export const ErrorMessage = styled.p`
  margin: 5px 0 0 20px;
  font-weight: 700;
  color: ${p => p.theme.footerLinkHover};
`;
