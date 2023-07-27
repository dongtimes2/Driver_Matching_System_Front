import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 2.5px solid ${({ theme }) => theme.colors.grayLight};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.grayDark};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
`;

function HeaderButton({ children, onClick }: Props) {
  const handleButtonClick = () => {
    onClick();
  };

  return <Button onClick={handleButtonClick}>{children}</Button>;
}

export default HeaderButton;
