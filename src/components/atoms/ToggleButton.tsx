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
  height: 3rem;
  border: 2.5px solid
    ${({ theme, $mode }) =>
      $mode === "light" ? theme.colors.pointPink : theme.colors.grayLight};
  border-radius: 0.5rem;
  color: ${({ theme, $mode }) =>
    $mode === "light" ? theme.colors.pointPink : theme.colors.grayLight};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

function ToggleButton({ children, onClick, mode }: Props) {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <Button $mode={mode} onClick={handleButtonClick}>
      {children}
    </Button>
  );
}

export default ToggleButton;
