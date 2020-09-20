import styled from 'styled-components';
import Checkbox from '../assets/images/Checkbox.svg';
import CheckboxActive from '../assets/images/CheckboxActive.svg';
import { getThemePath } from '../styles';


export const CheckBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  margin-right: ${getThemePath('spacing.small')};
  background: url("${Checkbox}");
  cursor: pointer;
  
  &:checked {
    background: url("${CheckboxActive}");
  }
`;
export const StyledFilter = styled.label`
  padding: ${getThemePath('spacing.small')} ${getThemePath('spacing.large')};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  
  &:last-child {
    margin-bottom: ${getThemePath('spacing.medium')};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.paleBlue};
  }
`;
