import styled from 'styled-components';

export const SaveButton = styled.button`
  font-family: 'Sigmar One', cursive;
  background-color: ${p => p.theme.BtnVioletMain};

  padding: 10px 15px;
  width: fit-content;

  border-radius: 50px;
  margin: 0 auto;
  margin-top: 10px;

  transition: box-shadow 300ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: ${p => p.theme.boxShadow};
  }
`;

export const CategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  gap: 5px;
  padding: 30px;

  border: 2px solid ${p => p.theme.BtnVioletMain};
  border-radius: 50px;
  box-shadow: ${p => p.theme.boxShadow};

  margin-bottom: 30px;
`;

export const AddFeaturesButton = styled.button`
  width: fit-content;
  margin-right: 10px;

  padding: 10px 15px;
  border-radius: 50px;

  background-color: ${p => p.theme.BtnVioletMain};

  font-family: 'Sigmar One', cursive;
  font-weight: 700;
  font-size: 1.1rem;

  transition: box-shadow 300ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: ${p => p.theme.boxShadow};
  }
`;

export const CancelButton = styled.button`
  width: fit-content;

  margin-bottom: 5px;
  padding: 10px 15px;

  border: 2px solid ${p => p.theme.BtnVioletMain};
  border-radius: 50px;

  font-family: 'Sigmar One', cursive;
  font-weight: 700;
  font-size: 1.1rem;

  transition: box-shadow 300ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: ${p => p.theme.boxShadow};
  }
`;

export const DeleteFeaturesButton = styled.button`
  width: fit-content;
  padding: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 50px;
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
`;

export const FeatureWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 15px;
`;

export const FeaturesInput = styled.input`
  width: 30%;

  border: 2px solid ${p => p.theme.BtnVioletMain};
  border-radius: 50px;

  font-weight: 700;

  margin-right: 5px;

  padding: 15px;
  height: 55px;
`;

export const ButtonWrapper = styled.div`
  display: inline-block;
`;

export const CategoryTable = styled.table`
  width: 80%;
  font-weight: 600;
  border: 1px solid honeydew;
  margin: 0 auto;
  padding: 10px;
  border-collapse: collapse;
  & table > th,
  td {
    padding: 3px;
    border: 1px solid honeydew;
  }
  & tr:nth-child(2n) {
    background-color: #f0fff04d;
  }
`;

export const Thead = styled.thead`
  background-color: #c189894f;
`;

export const EditTableButton = styled.button`
  background-color: ${p => p.theme.BtnVioletMain};
`;

export const DeleteTableButton = styled.button`
  background-color: ${p => p.theme.whiteBg};
  border: 2px solid ${p => p.theme.BtnVioletMain};
`;

export const ToolsButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;

  padding: 15px;

  button,
  a {
    width: fit-content;
    font-family: 'Sigmar One', cursive;

    padding: 5px 10px;
    border-radius: 50px;

    transition: box-shadow 300ms ease-in-out, transform 300ms ease-in-out;
  }

  button:hover,
  button:focus,
  a:hover,
  a:focus {
    box-shadow: ${p => p.theme.boxShadow};
    transform: scale(1.02);
  }
`;
