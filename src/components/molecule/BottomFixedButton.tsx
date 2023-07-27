import styled from "styled-components";
import MainButton from "../atoms/MainButton";
import { SIDE_PADDING } from "../../constants/layout";
import { ButtonModeType } from "../../types/button";

interface Props {
  buttonText: string;
  onClick: () => void;
  mode: ButtonModeType;
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5.75rem;
  padding: 1rem ${SIDE_PADDING}rem 1.75rem;
  z-index: 900;
`;

function BottomFixedButton({ buttonText, onClick, mode }: Props) {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <Wrapper>
      <MainButton onClick={handleButtonClick} mode={mode}>
        {buttonText}
      </MainButton>
    </Wrapper>
  );
}

export default BottomFixedButton;
