import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/context";

export default function User() {
  const { userId } = useParams();
  const { userList } = useAppContext();
  const user = userList[Number(userId)];
  return (
    <div>
      <h1>User details</h1>
      <button>Blacklist user</button>
      <button>Activate user</button>
      <section>
        <h1>Personal information</h1>
        {JSON.stringify(user.profile)}
      </section>
      <section>
        <h1>Education and employment</h1>
        {JSON.stringify(user.education)}
      </section>
      <section>
        <h1>Socials</h1>
        {JSON.stringify(user.socials)}
      </section>
      <section>
        <h1>Guarantor</h1>
        {JSON.stringify(user.guarantor)}
      </section>
    </div>
  );
}
