import styled from 'styled-components';


export const StyledSegment = styled.div`
  display: flex;
  flex-direction: row;
  
  &:not(:last-child) {
    margin-bottom: 14px;
  }
`;

export const SegmentPart = styled.div`
  flex: 1.5;
  
  &:last-child {
    flex: 1.3;
  }
`;

export const PartHeader = styled.div`
   font-size: 12px;
   font-weight: 600;
   color: ${({ theme }) => theme.colors.textMuted};
   text-transform: uppercase;
   margin-bottom: 6px;
`;

export const PartBody = styled.div`
  font-weight: 600;
`;
