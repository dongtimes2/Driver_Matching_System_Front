import { ReactNode } from "react";
import styled from "styled-components";
import { BOTTOM_PADDING, SIDE_PADDING, TOP_PADDING } from "../constants/layout";

interface Props {
  children: ReactNode;
}

const Wrapper = styled.div`
  width: 100%;
  min-width: ${({ theme }) => theme.windowSize.mobileM};
  height: 100%;
  padding: ${TOP_PADDING}rem ${SIDE_PADDING}rem ${BOTTOM_PADDING}rem;
`;

function Layout({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

export default Layout;
