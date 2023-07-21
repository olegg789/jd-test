import background from "../img/background.svg";
import front from "../img/front.svg";

const Icon = ({}) => {
  return (
    <div className="icon-container">
      <img src={background} className="box" />
      <img src={front} className="box stack" />
    </div>
  );
};

export default Icon;
