import styled from 'styled-components';

export const BrandForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto 30px;
  gap: 5px;
  padding: 30px;

  border: 2px solid ${p => p.theme.BtnVioletMain};
  border-radius: 50px;

  box-shadow: ${p => p.theme.boxShadow};

  label {
    margin-bottom: 10px;
    margin-left: 20px;
    display: block;
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 0;
`;

export const ImgWrap = styled.div`
  position: relative;
`;

export const InputWrapper = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 15px;
    right: 20px;

    &:hover svg,
    &:focus svg {
      stroke: ${p => p.theme.BtnVioletHover};
    }
  }
`;
