import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyle from "./GlobalStyle";
import { theme } from "./styles/theme";

const root = createRoot(document.getElementById("root") as Element);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
