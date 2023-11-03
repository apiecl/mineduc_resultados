import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import CustomTreemap from "./charts/CustomTreemap";
import "./scss/regionescaracterizacion.scss";

function processRegionalData(data, labels, name) {
  const children = [];
  Object.keys(data).forEach((item) => {
    children.push({
      name: labels[item],
      loc: data[item],
      color: "#ff0000",
    });
  });

  return { name: name, children: children };
}

function RegionesCaracterizacion({
  regiones,
  data_tipos_administracion,
  modalidad_labels,
  data_modalidad,
  administracion_labels,
}) {
  const [activeRegion, setActiveRegion] = useState(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (regiones) {
      const firstRegion = Object.keys(regiones)[0];
      console.log(regiones[firstRegion]);
      setActiveRegion(firstRegion);
    }
  }, [regiones]);

  return (
    <div className="regiones-caracterizacion">
      <div className="pais">
        <ul className="regionList">
          {regiones &&
            Object.keys(regiones).map((region) => (
              <li
                className={region === activeRegion ? "active" : ""}
                key={`reg-${region}`}
                onClick={() => setActiveRegion(region)}
              >
                {" "}
                {regiones[region]}{" "}
              </li>
            ))}
        </ul>
      </div>
      <div className="graficos_regiones">
        {activeRegion && (
          <div>
            <h4>{regiones[activeRegion]}</h4>

            <h5>Tipos de administración</h5>
            <div className="region_caract">
              <CustomTreemap
                height={300}
                data={processRegionalData(
                  data_tipos_administracion[activeRegion],
                  administracion_labels,
                  "Tipo de administración"
                )}
                variant="red"
              />
            </div>

            <h5>Modalidad de enseñanza</h5>
            <div className="region_caract">
              <CustomTreemap
                height={300}
                data={processRegionalData(
                  data_modalidad[activeRegion],
                  modalidad_labels,
                  "Modalidad de enseñanza"
                )}
                variant="blue"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegionesCaracterizacion;
