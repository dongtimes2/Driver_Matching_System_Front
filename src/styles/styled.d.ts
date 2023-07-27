import { DefaultTheme as StyledDefaultTheme } from "styled-components/dist/types";
import {
  ColorsTypes,
  FontSizeTypes,
  FontWeightTypes,
  WindowSizeTypes,
} from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends StyledDefaultTheme {
    colors: ColorsTypes;
    fontSize: FontSizeTypes;
    fontWeight: FontWeightTypes;
    windowSize: WindowSizeTypes;
  }
}
