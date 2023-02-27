import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../../../context/context";
import history from "history/browser";
import Button from "@mui/material/Button";
import backIcon from "../../../assets/icons/back.svg";
import "./User.scss";
import Stars from "../../../components/Stars";

export default function User() {
  const { userId } = useParams();
  const { userList, activateUser, blacklistUser } = useAppContext();
  const user = userList.find((person) => person.id === userId);
  return (
    <div>
      <section>
        <h1>Personal information</h1>
        {JSON.stringify(user?.profile)}
      </section>
      <section>
        <h1>Education and employment</h1>
        {JSON.stringify(user?.education)}
      </section>
      <section>
        <h1>Socials</h1>
        {JSON.stringify(user?.socials)}
      </section>
      <section>
        <h1>Guarantor</h1>
        {JSON.stringify(user?.guarantor)}
      </section>
    </div>
  );
}
