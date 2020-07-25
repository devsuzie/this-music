import React from "react";
import { ThemeProvider } from "emotion-theming";
import { BrowserRouter } from "react-router-dom";
import {
  LoadingProvider,
  ModalProvider,
  SearchMusicProvider,
  PlaylistsProvider,
} from "./store";
import theme from "@/theme";

import Router from "@/Router";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/theme/bootstrap.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <ModalProvider>
          <SearchMusicProvider>
            <PlaylistsProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </PlaylistsProvider>
          </SearchMusicProvider>
        </ModalProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
