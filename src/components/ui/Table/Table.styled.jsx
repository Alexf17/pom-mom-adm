import styled from 'styled-components';

export const StyledTable = styled.table`
  border-radius: 50px;

  margin: 0 auto;
  width: 80%;

  overflow: hidden;

  border-spacing: 0;

  border: 2px solid ${p => p.theme.BtnVioletMain};

  thead {
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    height: 50px;
    width: 100%;

    background-color: ${p => p.theme.BtnVioletMain};
    text-align: center;

    font-size: 1.2rem;
    font-weight: 700;

    td {
      & div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        button {
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  tbody {
    text-align: center;

    tr {
      transition: background-color 300ms ease-in-out;

      &:hover,
      &:focus {
        background-color: ${p => p.theme.lightGreyText};
      }
    }

    td {
      border: 1px solid ${p => p.theme.BtnVioletMain};

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
