import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/context";

export default function User() {
  const { userId } = useParams();
  const { userList, activateUser, blacklistUser } = useAppContext();
  const user = userList.find((person) => person.id === userId);
  return (
    <div>
      <h1>User details</h1>
      <button
        disabled={user?.status === "blacklisted"}
        onClick={() => blacklistUser(userId as string)}
      >
        Blacklist user
      </button>
      <button
        disabled={user?.status === "active"}
        onClick={() => activateUser(userId as string)}
      >
        Activate user
      </button>
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
