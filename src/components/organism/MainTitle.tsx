import styled from "styled-components";
import Label from "../atoms/Label";
import BottomFixedButton from "../molecule/BottomFixedButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

function MainTitle() {
  return (
    <Wrapper>
      <Label size="title" weight="bold">
        대리운전 매칭 시스템
      </Label>
      <BottomFixedButton
        buttonText="로그인 하기"
        mode="light"
        onClick={() => null}
      />
    </Wrapper>
  );
}

export default MainTitle;
