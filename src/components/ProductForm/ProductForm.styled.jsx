import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 15px;
  padding: 30px;

  border: 2px solid ${p => p.theme.BtnVioletMain};
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 50px;
  margin: 0 auto;
`;
export const PhotoInput = styled.div`
  display: flex;
  gap: 10px;
  align-content: center;
  align-items: center;
`;

export const PhotoWrap = styled.label`
  display: flex;
  align-items: center;
`;

export const PhotoButton = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;

  font-family: 'Sigmar One', cursive;
  border-radius: 50px;
  padding: 10px 15px;

  margin-top: 10px;

  text-align: center;
  width: fit-content;

  background-color: ${p => p.theme.BtnVioletMain};
  transition: box-shadow 300ms ease-in-out;

  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: ${p => p.theme.boxShadow};
  }
`;

export const SpinnerWrapper = styled.div`
  width: 200px;
`;

export const ImgWrap = styled.div`
  position: relative;
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 0;
`;
export const SortContainer = styled(ReactSortable)`
  display: inline-flex;
`;

export const FeaturesItem = styled.div`
  display: flex;
  gap: 10px;
`;

export const SectionWrapper = styled.div`
  display: grid;
  padding: 5px;
  border-radius: 5px;
`;
export const DoubleWrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  padding: 15px;
  border: 2px solid ${p => p.theme.BtnVioletMain};
  border-radius: 15px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px;

  button {
    width: fit-content;
    font-family: 'Sigmar One', cursive;

    padding: 10px 15px;
    border-radius: 50px;

    transition: box-shadow 300ms ease-in-out, transform 300ms ease-in-out;
  }

  button:hover,
  button:focus {
    box-shadow: ${p => p.theme.boxShadow};
    transform: scale(1.02);
  }
`;

export const SaveButton = styled.button`
  background-color: ${p => p.theme.BtnVioletMain};
`;

export const CancelButton = styled.button`
  border: 2px solid ${p => p.theme.BtnVioletMain};
  background-color: ${p => p.theme.whiteBg};
`;

export const InputLabel = styled.label`
  margin: 0 0 10px 15px;

  font-weight: 700;
  font-size: 1.2rem;
  display: block;
`;

export const SelectInput = styled.select`
  width: 200px;
  padding: 10px;

  font-weight: 700;

  /* min-width: 155px; */
  border: 2px solid ${p => p.theme.BtnVioletMain};

  border-radius: 50px;

  margin-bottom: 10px;

  & > option {
    font-size: 0.8rem;
    width: fit-content;
  }
`;

export const Input = styled.input`
  height: 55px;
  border: 2px solid ${p => p.theme.BtnVioletMain};
  border-radius: 50px;

  padding: 0 20px;

  font-weight: 700;

  outline: none;
`;
export const DescriptionInput = styled.textarea`
  border: 2px solid ${p => p.theme.BtnVioletMain};
  border-radius: 50px;
  padding: 15px;
  min-height: 55px;
  width: 100%;
  resize: vertical;

  outline: none;
`;

export const NumberInput = styled.input`
  height: 55px;
  border: 2px solid ${p => p.theme.BtnVioletMain};
  border-radius: 50px;

  padding: 0 20px;

  font-weight: 700;

  outline: none;

  margin-bottom: 15px;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & label {
    font-weight: 700;
  }

  & > input {
    width: 20px;
  }
`;
