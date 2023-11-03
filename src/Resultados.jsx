import { useContent } from "./ContentContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./scss/resultados.scss";

function AnswerBlock({ respuestas, genero }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tmptotal = 0;
    if (respuestas !== undefined) {
      respuestas.forEach((respuesta) => {
        tmptotal += respuesta[1];
      });
    }
    setTotal(tmptotal);
  }, [respuestas]);

  function sizeFactor(amount) {
    const factor = 12 + amount * 0.2;
    return factor > 32 ? 32 : factor;
  }

  return (
    <>
      {genero && <h5>{genero}</h5>}
      <div className="answerBlockWrapper">
        <div className={`answerBlock ${genero ? genero.toLowerCase() : "unisex"}`}>
          {respuestas &&
            respuestas.map((respuesta, idx) => (
              <p
                key={`resp-${idx}`}
                style={{ fontSize: sizeFactor(respuesta[1]) + "px" }}
              >
                {respuesta[0]}
              </p>
            ))}
        </div>
        <div className="counter">
          <strong>{total}</strong> respuestas.
        </div>
      </div>
    </>
  );
}

function Resultados() {
  const location = useLocation();
  const [slug, setSlug] = useState(null);
  const content = useContent();
  const [theContent, setTheContent] = useState(null);
  const [theData, setTheData] = useState(null);

  useEffect(() => {
    setSlug(location.pathname.substring(1));
  }, [location]);

  useEffect(() => {
    if (content !== null) {
      setTheContent(content?.textcontent?.sectionscontent[slug], slug);
    }
  }, [content, slug]);

  useEffect(() => {
    if (content !== null) {
      setTheData(content?.data);
    }
  }, [content, slug]);

  return (
    <div className={`content-wrapper est-${slug}`}>
      {theContent && theData && (
        <div className="resultados-wrapper">
          <h2>{theContent.title}</h2>
          <div className="intro is-resizeable">{theContent.intro}</div>
          <div className="preguntas">
            {theContent.preguntas.map((pregunta, index) => (
              <div className="pregunta" key={`pregunta-${index}`}>
                <h4 data-index={index + 1}>{pregunta.title}</h4>
                <div className="is-resizeable">{pregunta.content}</div>
                <div className="block-palabras">
                  {theData.preguntas[slug][index].femenino && (
                    <AnswerBlock
                      genero="Femenino"
                      respuestas={theData.preguntas[slug][index].femenino}
                    />
                  )}
                  {theData.preguntas[slug][index].masculino && (
                    <AnswerBlock
                      genero="Masculino"
                      respuestas={theData.preguntas[slug][index].masculino}
                    />
                  )}
                  {theData.preguntas[slug][index].unisex && (
                    <AnswerBlock
                      genero={null}
                      respuestas={theData.preguntas[slug][index].unisex}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Resultados;
