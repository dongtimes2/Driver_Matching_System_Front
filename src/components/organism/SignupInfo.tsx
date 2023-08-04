import { styled } from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Label from "../atoms/Label";
import ToggleSelector from "../molecule/ToggleSelector";
import { USER_TYPE_LIST } from "../../constants/user";
import BottomFixedButton from "../molecule/BottomFixedButton";
import { patchAccount } from "../../api/accounts";
import { IUser } from "../../types/accounts";

const Wrapper = styled.div`
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
`;

function SignupInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState<IUser | null>(null);
  const { name }: { name: string } = location.state;

  const handleSignupButtonClick = async () => {
    if (!userType) return;
    try {
      const { type } = await patchAccount({ type: userType.type });
      navigate(`/map/${type}`, { state: { name } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <div className="textArea">
        <Label size="title" weight="bold">
          {name.slice(0, 5)} 님 환영합니다
        </Label>
        <Label size="subTitle" weight="bold">
          회원유형을 선택해주세요
        </Label>
      </div>
      <ToggleSelector<IUser>
        data={USER_TYPE_LIST}
        selectedItem={userType}
        setSelectedItem={setUserType}
      />
      <BottomFixedButton
        buttonText="가입하기"
        mode={userType ? "light" : "dark"}
        onClick={handleSignupButtonClick}
      />
    </Wrapper>
  );
}

export default SignupInfo;
