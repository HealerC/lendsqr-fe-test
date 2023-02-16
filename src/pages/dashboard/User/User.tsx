import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../../../context/context";
import history from "history/browser";

export default function User() {
  const { userId } = useParams();
  const { userList, activateUser, blacklistUser } = useAppContext();
  const user = userList.find((person) => person.id === userId);
  return (
    <div>
      <h1>User details</h1>
      <button onClick={() => history.back()}>Back to users</button>
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
      <section className="otherDetails">
        <Link to={`/users/${userId}/Documents`}>Documents</Link>
        <Link to={`/users/${userId}/Bank Details`}>Bank Details</Link>
        <Link to={`/users/${userId}/Loans`}>Loans</Link>
        <Link to={`/users/${userId}/Savings`}>Savings</Link>
        <Link to={`/users/${userId}/App and System`}>App and System</Link>
      </section>
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
