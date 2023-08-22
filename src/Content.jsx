import { useLoaderData } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function Content() {
  let data = useLoaderData();
  const theme = useTheme();

  return (
    <div className="content">
      {data} {theme.darkTheme ? "dark" : "light"}
    </div>
  );
}

export default Content;
