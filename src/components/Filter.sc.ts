import styled from 'styled-components';
import { getThemePath } from '../styles';


export const StyledCheckBox = styled.span`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: ${getThemePath('spacing.small')};
`;

export const InputCheckBox = styled.input`
  display: none;
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
