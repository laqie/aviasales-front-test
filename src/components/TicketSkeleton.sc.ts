import styled from 'styled-components';
import { PartBody, PartHeader } from './Segment.sc';
import { skeletonStyle } from '../styles/ui';


export const PriceSkeleton = styled.div`
  ${skeletonStyle('40%', '24px')};
`;

export const CarrierSkeleton = styled.div`
  ${skeletonStyle('90%', '39px')};
`;

export const PartHeaderSkeleton = styled(PartHeader)`
  ${skeletonStyle('50%', '13px')};
`;

export const PartBodySkeleton = styled(PartBody)`
  ${skeletonStyle('40%', '16px')};
`;
