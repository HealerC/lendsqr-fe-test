import { useParams } from "react-router-dom";
export default function OtherDetails() {
  const params = useParams();
  return <div>{JSON.stringify(params)}</div>;
}
