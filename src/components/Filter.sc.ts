import styled from 'styled-components';
import Checkbox from '../assets/images/Checkbox.svg';
import CheckboxActive from '../assets/images/CheckboxActive.svg';


export const CheckBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  margin-right: 12px;
  background: url("${Checkbox}");
  cursor: pointer;
  
  &:checked {
    background: url("${CheckboxActive}");
  }
`;
export const StyledFilter = styled.label`
  padding: 10px 21px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  
  &:last-child {
    margin-bottom: 10px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.paleBlue};
  }
`;
