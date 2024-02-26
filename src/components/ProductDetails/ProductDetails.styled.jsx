import ModalImage from 'react-modal-image';
import styled from 'styled-components';

export const ImgWrap = styled.div`
  padding: 10px;
  display: flex;
  gap: 15px;
  border: 2px solid honeydew;
  border-radius: 5px;
  margin-bottom: 10px;
  justify-content: center;
`;

export const SecondWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 2px solid honeydew;
  border-radius: 5px;
`;

export const AddToCurtButton = styled.button`
  margin: 20px auto;
  padding: 5px;
  font-size: 20px;
  border: 1px solid honeydew;
  border-radius: 5px;
  text-decoration: none;
  color: #3085d6;
  cursor: pointer;
`;
export const Img = styled(ModalImage)`
  width: 150px;
`;
