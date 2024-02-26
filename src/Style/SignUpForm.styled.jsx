import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  margin: 50px auto;
  flex-direction: column;
  width: 30%;
  gap: 10px;

  & input {
    width: 100%;
    height: 55px;
    border-radius: 40px;
    padding: 0 20px;
    border: 2px solid #14366f;
    font-family: inherit;
    font-weight: 600;

    &:focus {
      border-color: #63e5c5;
      outline: none;
    }
  }

  & button {
    cursor: pointer;
    height: 50px;
    border-radius: 40px;
    background-color: #63e5c5;
    color: #fff;
    font-size: 1.1rem;
    font-family: inherit;
    font-weight: 600;
    border: none;
    width: 80%;
    margin: 0 auto;
    box-shadow: 1.5px 1.5px 7px 0px rgba(0, 0, 0, 0.3);
  }
`;

export const Wrap = styled.div`
  align-items: center;
  display: flex;
`;
