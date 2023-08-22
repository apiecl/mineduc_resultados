import { useRouteError } from "react-router-dom";
import { isMobile, BrowserView, MobileView } from "react-device-detect";
import { ContentProvider } from "./ContentContext";
import { ThemeProvider } from "./ThemeContext";
import ThemeHandler from "./ThemeHandler";
import Header from "./Header";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <ContentProvider>
      <ThemeProvider>
        <ThemeHandler isMobile={isMobile}>
          <Header />
          <div className="content">
            <h1>Ooops ... </h1>
            <p>Contenido no encontrado</p>
          </div>
        </ThemeHandler>
      </ThemeProvider>
    </ContentProvider>
  );
}
