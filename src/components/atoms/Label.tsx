import { ReactNode } from "react";
import styled from "styled-components";
import { FontSizeTypes, FontWeightTypes } from "../../styles/theme";

interface Props {
  children: ReactNode;
  size: keyof FontSizeTypes;
  weight: keyof FontWeightTypes;
}

const Text = styled.div<{
  $size: keyof FontSizeTypes;
  $weight: keyof FontWeightTypes;
}>`
  font-size: ${({ theme, $size }) => theme.fontSize[$size]};
  font-weight: ${({ theme, $weight }) => theme.fontWeight[$weight]};
`;

function Label({ children, size, weight }: Props) {
  return (
    <Text $size={size} $weight={weight}>
      {children}
    </Text>
  );
}

export default Label;
