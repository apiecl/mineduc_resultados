import { useContent } from "./ContentContext";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import CustomTreemap from "./charts/CustomTreemap";
import RegionesCaracterizacion from "./RegionesCaracterizacion";
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
            {theContent.content[0].blocks.map((block, idx) => (
              <div className="block" key={`block-${idx}`}>
                {block.title} <span>{block.number}</span> {block.subtitle}
              </div>
            ))}
          </div>
          <h3 className="red">{theContent.content[1].title}</h3>
          <div className="is-resizeable">{theContent.content[1].text}</div>
          <CustomTreemap
            height={600}
            data={content.data?.tipos_administracion}
            variant={"red"}
          />
          <h3 className="blue">{theContent.content[2].title}</h3>
          <div className="is-resizeable">{theContent.content[2].text}</div>
          <CustomTreemap
            height={600}
            data={content.data?.modalidad_ensenanza}
            variant={"blue"}
          />
          <h3 className="red">{theContent.content[3].title}</h3>
          <div className="is-resizeable">{theContent.content[3].text}</div>
          <RegionesCaracterizacion
            modalidad_labels={content.data?.modalidad_labels}
            administracion_labels={content.data?.tipos_administracion_labels}
            regiones={content.data?.regiones}
            data_tipos_administracion={content.data?.tipos_administracion_region}
            data_modalidad={content.data?.modalidad_por_region}
          />
        </div>
      )}
    </div>
  );
}

export default Caracterizacion;
