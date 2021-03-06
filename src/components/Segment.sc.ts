import styled from 'styled-components';
import { getThemePath } from '../styles';


export const StyledSegment = styled.div`
  display: flex;
  
  &:not(:last-child) {
    margin-bottom: ${getThemePath('spacing.medium')};
  }
`;

export const SegmentPart = styled.div`
  flex: 1;
  
  &:nth-child(2) {
    flex: 0.9; 
  }
  
  &:nth-child(3) {
    flex: 1.1;
  }
`;

export const PartHeader = styled.div`
   font-size: ${getThemePath('font.size.small')};
   font-weight: 600;
   color: ${getThemePath('colors.textMuted')};
   text-transform: uppercase;
   margin-bottom: ${getThemePath('spacing.xSmall')};
`;

export const PartBody = styled.div`
  font-weight: 600;
`;
