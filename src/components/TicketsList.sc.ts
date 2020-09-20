import styled from 'styled-components';
import { getThemePath } from '../styles';


export const StyledTickets = styled.ul`
   list-style: none;
   padding: 0;   
   margin: 0;
   display: flex;
   flex-direction: column;
`;

export const Info = styled.li`
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  margin: ${getThemePath('spacing.xLarge')} 0;
`;
