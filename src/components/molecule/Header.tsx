import styled from "styled-components";
import HeaderButton from "../atoms/HeaderButton";
import { HEADER_HEIGHT, SIDE_PADDING } from "../../constants/layout";

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
    width: 100%;
    flex-basis: 10%;
  }

  .rightArea {
    flex-basis: 80%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.5rem;
  }
`;

function Header({ userName, showRightArea }: Props) {
  return (
    <Wrapper>
      <div className="leftArea">
        <span>LOGO</span>
      </div>
      <div className="rightArea">
        {showRightArea && (
          <>
            <p>{userName ?? "사용자"}님</p>
            <HeaderButton onClick={() => null}>버</HeaderButton>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default Header;
