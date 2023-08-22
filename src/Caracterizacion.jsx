import { useContent } from "./ContentContext";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import CustomTreemap from "./charts/CustomTreemap";
import "./scss/caracterizacion.scss";

function Caracterizacion() {
  const content = useContent();
  const [theContent, setTheContent] = useState(null);

  useEffect(() => {
    if (content) {
      setTheContent(content.sections?.caracterizacion);
    }
  }, [content]);

  return (
    <div className="content-wrapper">
      {theContent && (
        <div className="caracterizacion-wrapper">
          <h2>{theContent.title}</h2>
          <div className="is-resizeable">{theContent.content[0].text}</div>

          <div className="blocks">
            {theContent.content[0].blocks.map((block) => (
              <div className="block">
                {block.title} <span>{block.number}</span> {block.subtitle}
              </div>
            ))}
          </div>

          <h3 className="red">{theContent.content[1].title}</h3>
          <div className="is-resizeable">{theContent.content[1].text}</div>

          <CustomTreemap
            data={content.data?.tipos_administracion}
            variant={"red"}
          />
        </div>
      )}
    </div>
  );
}

export default Caracterizacion;
