import { ReactNode } from "react";
import { styled } from "styled-components";
import { ButtonModeType } from "../../types/button";

interface Props {
  children: ReactNode;
  onClick: () => void;
  mode: ButtonModeType;
}

const Button = styled.button<{ $mode: ButtonModeType }>`
  width: 100%;
  min-width: 200px;
  height: 3rem;
  border: none;
  border-radius: 2rem;
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ theme, $mode }) =>
    $mode === "light" ? theme.colors.pointGradient : theme.colors.grayGradient};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

function MainButton({ children, onClick, mode }: Props) {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <Button $mode={mode} onClick={handleButtonClick}>
      {children}
    </Button>
  );
}

export default MainButton;
