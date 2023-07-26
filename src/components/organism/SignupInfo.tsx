import { styled } from "styled-components";
import { useState } from "react";
import Label from "../atoms/Label";
import ToggleSelector from "../molecule/ToggleSelector";
import MainButton from "../atoms/MainButton";
import { USER_TYPE_LIST } from "../../constants/user";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;

  .textArea {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bottomArea {
    position: absolute;
    bottom: 1.75rem;
    width: 100%;
  }
`;

function SignupInfo() {
  const [userType, setUserType] = useState<string | null>(null);

  return (
    <Wrapper>
      <div className="textArea">
        <Label size="title" weight="bold">
          ㅇㅇㅇ님 환영합니다
        </Label>
        <Label size="subTitle" weight="bold">
          회원유형을 선택해주세요
        </Label>
      </div>
      <ToggleSelector
        data={USER_TYPE_LIST}
        selectedItem={userType}
        setSelectedItem={setUserType}
      />
      <div className="bottomArea">
        <MainButton mode={userType ? "light" : "dark"} onClick={() => null}>
          가입하기
        </MainButton>
      </div>
    </Wrapper>
  );
}

export default SignupInfo;
