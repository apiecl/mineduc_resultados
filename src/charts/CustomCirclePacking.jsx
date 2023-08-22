import { Link } from "react-router-dom";
import slugify from "slugify";
import "../scss/customcirclepacking.scss";

function Circle({ circledata }) {
  const baseSize = 112;
  const baseNumber = 785;

  return (
    <Link className="circle-link" to={circledata.url}>
      <div
        style={{
          width: `${(circledata.value / baseNumber / 2) * baseSize}px`,
          height: `${(circledata.value / baseNumber / 2) * baseSize}px`,
        }}
        className={`circle circle-${slugify(circledata.title.split(" ")[0], {
          lower: true,
        })}`}
        key={circledata.title}
        data-size={circledata.value}
        data-title={circledata.title}
      >
        <div className="circle-info">
          <p>{circledata.title}</p>
          <p>
            <strong>{circledata.value}</strong>
          </p>
        </div>
      </div>
    </Link>
  );
}

function CustomCirclePacking({ data }) {
  return (
    <div className="parent-circle">
      {data?.map((circledata) => (
        <>
          {circledata.value && (
            <Circle key={`key-${circledata.value}`} circledata={circledata} />
          )}
        </>
      ))}
    </div>
  );
}

export default CustomCirclePacking;
