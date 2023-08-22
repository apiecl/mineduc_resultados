import { useTheme } from "./ThemeContext";

export default function ThemeHandler({ children, isMobile }) {
  const theme = useTheme();

  return (
    <main
      id="mineduc-wrapper"
      data-dark={theme.darkTheme}
      data-size={theme.fontSize}
      className={`fullwidth ${isMobile ? "mobile" : "desktop"}`}
    >
      {children}
    </main>
  );
}
