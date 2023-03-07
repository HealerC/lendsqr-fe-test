import starOutlinedIcon from "../assets/icons/star-outlined.svg";
import starContainedIcon from "../assets/icons/star-contained.svg";
import "./Stars.scss";

type StarsProps = {
  starCount: number;
  starMax: number;
};
export default function Stars({ starCount, starMax = 5 }: StarsProps) {
  if (starCount >= starMax) {
    return (
      <div className="stars">
        {Array(starMax)
          .fill(undefined)
          .map((_item, index) => (
            <img
              src={starContainedIcon}
              key={index}
              alt={`1 of ${starMax} stars`}
            />
          ))}
      </div>
    );
  }
  return (
    <div className="stars">
      {Array(starCount)
        .fill(undefined)
        .map((_item, index) => {
          return (
            <img
              src={starContainedIcon}
              key={index}
              alt={`One of the ${starCount} filled stars`}
            />
          );
        })}
      {Array(starMax - starCount)
        .fill(undefined)
        .map((_item, index) => (
          <img
            key={index}
            src={starOutlinedIcon}
            alt={`One of the ${starCount} empty stars`}
          />
        ))}
    </div>
  );
}
