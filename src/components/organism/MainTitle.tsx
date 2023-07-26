import styled from "styled-components";
import Label from "../atoms/Label";
import MainButton from "../atoms/MainButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 0 1.5rem;
  height: 100vh;

  button {
    width: 40%;
  }
`;

function MainTitle() {
  return (
    <Wrapper>
      <Label size="title" weight="bold">
        대리운전 매칭 시스템
      </Label>
      <MainButton mode="light" onClick={() => {}}>
        로그인하기
      </MainButton>
    </Wrapper>
  );
}

export default MainTitle;
