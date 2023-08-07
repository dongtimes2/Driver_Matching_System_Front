import styled from "styled-components";
import HeaderButton from "../atoms/HeaderButton";
import { HEADER_HEIGHT, SIDE_PADDING } from "../../constants/layout";
import signoutIcon from "../../assets/img/signout.png";
import logoIcon from "../../assets/img/logo.png";
import useAuth from "../../hooks/useAuth";

interface Props {
  userName?: string;
  showRightArea: boolean;
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${HEADER_HEIGHT}rem;
  padding: 0 ${SIDE_PADDING}rem;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.grayLight};

  .leftArea {
    flex-basis: 30%;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.grayDark};
    font-size: ${({ theme }) => theme.fontSize.subTitle};
    font-weight: ${({ theme }) => theme.fontWeight.heavy};

    img {
      width: 2.5rem;
      height: 2.5rem;
    }

    p {
      transform: translateY(10%);
    }
  }

  .rightArea {
    flex-basis: 70%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    color: ${({ theme }) => theme.colors.grayDark};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.heavy};

    p {
      transform: translateY(17%);
    }
  }
`;

function Header({ userName, showRightArea }: Props) {
  const { signout } = useAuth();

  const handleSignoutButtonClick = async () => {
    await signout();
  };

  return (
    <Wrapper>
      <div className="leftArea">
        <img src={logoIcon} alt="logo" />
        <p>drinder</p>
      </div>
      {showRightArea && (
        <div className="rightArea">
          <p>{userName ?? "사용자"} 님</p>
          <HeaderButton onClick={handleSignoutButtonClick}>
            <img src={signoutIcon} alt="signoutIcon" />
          </HeaderButton>
        </div>
      )}
    </Wrapper>
  );
}

export default Header;
