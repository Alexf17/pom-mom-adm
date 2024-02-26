import styled from 'styled-components';

export const SaveButton = styled.button`
  background-color: honeydew;
  padding: 5px;
  width: fit-content;
  cursor: pointer;
  border: 1px solid #c18989;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 10px;
`;

export const AddFeaturesButton = styled.button`
  width: fit-content;
  margin-bottom: 5px;
  padding: 3px;
  color: #3085d6;
  font-weight: 600;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  width: fit-content;
  margin-bottom: 5px;
  margin-left: 10px;
  padding: 3px;
  color: #d33;
  font-weight: 600;
  cursor: pointer;
`;

export const DeleteFeaturesButton = styled.button`
  width: fit-content;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 1px;
  color: #d33;
  font-weight: 600;
  cursor: pointer;
`;

export const Input = styled.input`
  width: fit-content;
  border: 1px solid honeydew;
  border-radius: 3px;
  margin-right: 5px;
`;

export const FeaturesInput = styled.input`
  width: fit-content;
  border: 1px solid honeydew;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const ButtonWrapper = styled.div`
  display: inline-block;
`;

export const OrdersTable = styled.table`
  width: 95%;
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
  width: fit-content;
  padding: 2px;
  color: #3085d6;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
`;
export const DeleteTableButton = styled.button`
  width: fit-content;
  padding: 2px;
  color: #d33;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
`;
export const ToolsButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;
