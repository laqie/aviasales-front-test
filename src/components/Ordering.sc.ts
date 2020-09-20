import styled from 'styled-components';
import { getThemePath } from '../styles';


export const OrderingButton = styled.button`
  font-size: ${getThemePath('font.size.small')};
  font-weight: 600;
  flex: 1;
  height: 50px;
  background-color: ${getThemePath('colors.white')};
  text-transform: uppercase;
  outline: none;
  border: 1px solid ${getThemePath('colors.gray')};
  cursor: pointer;
  margin-bottom: ${getThemePath('spacing.large')};
  
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
    background-color: ${getThemePath('colors.blue')};
    color: ${getThemePath('colors.white')};
    border-color: ${getThemePath('colors.blue')};
    cursor: default;
  }
`;

export const StyledOrdering = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
