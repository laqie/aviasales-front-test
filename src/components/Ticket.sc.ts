import styled from 'styled-components';
import { getThemePath } from '../styles';


export const StyledTicket = styled.li`
  max-width: 502px;
  background-color: white;
  padding: ${getThemePath('spacing.large')};
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  &:not(:last-child) {
    margin-bottom: ${getThemePath('spacing.medium')};
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${getThemePath('spacing.large')};
`;

export const Price = styled.div`
  font-size: ${getThemePath('font.size.large')};
  font-weight: 600;
  color: ${getThemePath('colors.blue')};
  flex: 1.9;
`;

export const Carrier = styled.div`
  flex: 1.1;
`;
