import styled from 'styled-components';
import { getThemePath } from '../styles';


export const StyledFilters = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: ${getThemePath('colors.white')};
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;
export const Title = styled.p`
  padding: ${getThemePath('spacing.large')} 0 0 ${getThemePath('spacing.large')};
  margin: 0 0 9px;
  font-weight: 600;
  font-size: ${getThemePath('font.size.small')};
  text-transform: uppercase;
`;
