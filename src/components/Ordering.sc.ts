import styled from 'styled-components';


export const OrderingButton = styled.button`
  font-size: 12px;
  font-weight: 600;
  flex: 1;
  height: 50px;
  background-color: white;
  text-transform: uppercase;
  outline: none;
  color: 1px solid ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  
  &:not(:last-child) {
    border-right: none;
  }
  
  &:first-child {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  
  &:last-child {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.blue};
    color: white;
    border-color: ${({ theme }) => theme.colors.blue};
    cursor: default;
  }
`;

export const StyledOrdering = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
