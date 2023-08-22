import { useReducer } from "react";
import { useContent } from "./ContentContext";
import CustomCirclePacking from "./charts/CustomCirclePacking";
import jugando from "./assets/imgs/jugando.png";

function Home() {
  const content = useContent();

  return (
    <div className="home">
      <div className="home-left accent-section is-resizeable">
        {content.textcontent?.site_intro}
        <img src={jugando} alt="Ilustración niñas jugando" />
      </div>
      <div className="home-right">
        <div className="legend">
          <h2>Actas por estamento</h2>
          <p>
            Estas corresponden a las actas analizadas por cada grupo
            participante de donde se extrajo la información.
          </p>
          <em>Haz click para acceder a las respuestas de un estamento</em>
          <div className="additional">
            <span>Actas procesadas</span>
            <span className="number">20.942</span>
            <span>de jornadas realizadas</span>
          </div>
        </div>
        {content.data && (
          <CustomCirclePacking
            data={content.textcontent?.sections}
            id="homeCircles"
          />
        )}
      </div>
    </div>
  );
}

export default Home;
