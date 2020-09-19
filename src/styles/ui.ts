import { Theme } from './theme';
import { css, keyframes } from 'styled-components';
import { lighten } from 'polished';


const pulse = (theme: Theme) => {
  return  keyframes`
    0%, 75% {
      background-color: ${theme.colors.gray};
    }
  
    50% {
      background-color: ${lighten(0.05, theme.colors.gray)};
    }
`;
}

export const skeletonStyle = (width: string, height: string) => css`
  height: ${height};
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 3px;
  width: ${width};
  animation: ${({theme}) => pulse(theme)} 1.5s ease-in-out infinite;
`;
