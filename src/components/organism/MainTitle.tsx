import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Label from "../atoms/Label";
import BottomFixedButton from "../molecule/BottomFixedButton";
import { getAccount } from "../../api/accounts";
import useAuth from "../../hooks/useAuth";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

function MainTitle() {
  const navigate = useNavigate();
  const { signin, isSignedin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSigninButtonClick = async () => {
    try {
      !isSignedin && (await signin());
    } catch (error) {
      console.error(error);
      return;
    }

    try {
      setIsLoading(true);
      const { type, name } = await getAccount();

      if (type) {
        navigate(`/map/${type}`, { state: { name } });
      } else {
        navigate("/signup", { state: { name } });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      {!isLoading && (
        <>
          <Label size="title" weight="bold">
            대리운전 매칭 시스템
          </Label>
          <BottomFixedButton
            buttonText={isSignedin ? "시작하기" : "로그인 하기"}
            mode="light"
            onClick={handleSigninButtonClick}
          />
        </>
      )}
    </Wrapper>
  );
}

export default MainTitle;
