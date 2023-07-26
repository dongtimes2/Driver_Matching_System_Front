import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

const Wrapper = styled.div`
  width: 100%;
  min-width: ${({ theme }) => theme.windowSize.mobileM};
  height: 100%;
  padding: 0 1.25rem;
`;

function Layout({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

export default Layout;
