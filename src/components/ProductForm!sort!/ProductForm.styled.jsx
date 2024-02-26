import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 20px;
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
  border-radius: 5px;
  width: 90px;
  margin-left: 10px;
  border: 1px solid black;
  padding: 5px;
  text-align: center;
`;
export const SpinnerWrapper = styled.div`
  width: 150px;
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
