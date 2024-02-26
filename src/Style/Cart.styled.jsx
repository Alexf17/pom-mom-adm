import styled from 'styled-components';
import ModalImage from 'react-modal-image';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 20px;
`;

export const SuccessWrapper = styled.div`
  display: block;
  height: 100%;

  text-align: center;
`;

export const SuccessText = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid honeydew;
  border-radius: 5px;
  padding: 5px;
`;

export const ContinueButton = styled.button`
  padding: 5px;
  font-size: 20px;
  border: 1px solid honeydew;
  border-radius: 5px;
  color: #3085d6;
  cursor: pointer;
  margin: 10px auto;
`;
export const Input = styled.input`
  width: 80%;
  border: 1px solid honeydew;
  border-radius: 3px;
  margin: 3px auto;
`;
export const EmptyCart = styled.div`
  margin-top: 40px;
  font-size: 20px;
  height: 100px;
`;

export const Table = styled.table`
  width: 100%;
  font-weight: 600;
  border: 1px solid honeydew;
  margin: 0 auto;
  padding: 10px;
  border-collapse: collapse;
  & table > th,
  td {
    padding: 3px;
    border: 1px solid honeydew;
    text-align: center;
  }
  & tr:nth-child(2n) {
    background-color: #f0fff04d;
  }
`;

export const Img = styled(ModalImage)`
  width: 100px;
`;

export const ImgCells = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
export const ChangeQuantityButton = styled.button`
  padding: 0 3px;
  margin: 0 3px;
`;

export const SumWrap = styled.div`
  width: 100%;
  padding: 10px;
  text-align: end;
`;
