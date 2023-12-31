import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import App from "./App";
import GlobalStyle from "./GlobalStyle";
import { theme } from "./styles/theme";

const root = createRoot(document.getElementById("root") as Element);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
