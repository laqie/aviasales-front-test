import styled from 'styled-components';


export const StyledTicket = styled.li`
  max-width: 502px;
  background-color: white;
  padding: 19px 21px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  &:not(:last-child) {
    margin-bottom: 21px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 21px;
`;

export const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue};
  flex: 3;
`;

export const Carrier = styled.div`
  flex: 1.3;
`;
