import { PropsWithRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import LogoUrl from '../assets/images/Logo.svg';
import PlaneUrl from '../assets/images/Plane.svg';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const StyledLogo = styled.span`
  width: 60px;
  height: 60px;
  display: inline-block;
  background-size: contain;
  background: url("${LogoUrl}") no-repeat center center;
`;

interface PlaneProps {
  pending: boolean;
}

export const Plane = styled.span<PropsWithRef<PlaneProps>>`
  width: 30px;
  height: 30px;
  position: relative;
  top: 15px;
  left: 15px;
  background-size: contain;
  display: inline-block;
  background: url("${PlaneUrl}") no-repeat center center; 
  
  ${({ pending }) => pending && css`
    animation: ${rotate} 1.2s ease-in-out infinite;
    animation-fill-mode: backwards;
  `}
`;
