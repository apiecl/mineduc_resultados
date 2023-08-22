import { useContent } from "./ContentContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./scss/resultados.scss";

function Resultados() {
  const location = useLocation();
  const [slug, setSlug] = useState(null);
  const content = useContent();
  const [theContent, setTheContent] = useState(null);

  useEffect(() => {
    setSlug(location.pathname.substring(1));
  }, [location]);

  useEffect(() => {
    if (content !== null) {
      setTheContent(content?.textcontent?.sectionscontent[slug], slug);
    }
  }, [content, slug]);

  return (
    <div className={`content-wrapper est-${slug}`}>
      {theContent && (
        <div className="resultados-wrapper">
          <h2>{theContent.title}</h2>
          <div className="intro is-resizeable">{theContent.intro}</div>
          <div className="preguntas">
            {theContent.preguntas.map((pregunta, index) => (
              <div className="pregunta">
                <h4 data-index={index + 1}>{pregunta.title}</h4>
                <div className="is-resizeable">{pregunta.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Resultados;
