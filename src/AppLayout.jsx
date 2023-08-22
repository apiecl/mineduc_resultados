import { useState, useEffect } from "react";
import "./scss/AppLayout.scss";
import Header from "./Header";
import { ThemeProvider } from "./ThemeContext";
import { ContentProvider } from "./ContentContext";
import ThemeHandler from "./ThemeHandler";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { isMobile, BrowserView, MobileView } from "react-device-detect";

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <ThemeHandler isMobile={isMobile}>
          <Header />
          <Outlet />
        </ThemeHandler>
      </ContentProvider>
    </ThemeProvider>
  );
}

export default App;
