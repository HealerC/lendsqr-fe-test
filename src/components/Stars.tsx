import starOutlinedIcon from "../assets/icons/star-outlined.svg";
import starContainedIcon from "../assets/icons/star-contained.svg";

type StarsProps = {
  starCount: number;
  starMax: number;
};
export default function Stars({ starCount, starMax = 5 }: StarsProps) {
  if (starCount >= starMax) {
    return (
      <div>
        {Array(starMax)
          .fill(undefined)
          .map((_item, index) => (
            <img src={starContainedIcon} key={index} />
          ))}
      </div>
    );
  }
  return (
    <div>
      {Array(starCount)
        .fill(undefined)
        .map((_item, index) => {
          console.log(starCount, index);
          return <img src={starContainedIcon} key={index} />;
        })}
      {Array(starMax - starCount)
        .fill(undefined)
        .map((_item, index) => (
          <img key={index} src={starOutlinedIcon} />
        ))}
    </div>
  );
}
