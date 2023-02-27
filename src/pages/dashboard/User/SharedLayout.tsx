import { useParams, Link, Outlet } from "react-router-dom";
import { useAppContext } from "../../../context/context";
import history from "history/browser";
import Button from "@mui/material/Button";
import backIcon from "../../../assets/icons/back.svg";
import "./SharedLayout.scss";
import Stars from "../../../components/Stars";

export default function User() {
  const { userId } = useParams();
  const { userList, activateUser, blacklistUser } = useAppContext();
  const user = userList.find((person) => person.id === userId);
  return (
    <div>
      <Button onClick={() => history.back()} startIcon={<img src={backIcon} />}>
        Back to users
      </Button>
      <section className="header-nav">
        <h1>User details</h1>
        <div>
          <Button
            variant="outlined"
            disabled={user?.status === "blacklisted"}
            onClick={() => blacklistUser(userId as string)}
          >
            Blacklist user
          </Button>
          <Button
            variant="outlined"
            color="warning"
            disabled={user?.status === "active"}
            onClick={() => activateUser(userId as string)}
          >
            Activate user
          </Button>
        </div>
      </section>
      <header>
        <section className="user-summary">
          <div>
            <h2>{`${user?.profile.firstName} ${user?.profile.lastName}`}</h2>
            <p>{user?.accountNumber}</p>
          </div>
          <div className="tier">
            <p>User's Tier</p>
            <Stars starCount={3} starMax={3} />
          </div>
          <div>
            <p>₦{user?.accountBalance}</p>
            <p>
              {user?.profile.bvn}/{user?.profile.address} Bank
            </p>
          </div>
        </section>
      </header>
      <section className="otherDetails">
        <Link to={`/users/${userId}/general-details`}>General Details</Link>
        <Link to={`/users/${userId}/documents`}>Documents</Link>
        <Link to={`/users/${userId}/bank-details`}>Bank Details</Link>
        <Link to={`/users/${userId}/loans`}>Loans</Link>
        <Link to={`/users/${userId}/savings`}>Savings</Link>
        <Link to={`/users/${userId}/app-and-system`}>App and System</Link>
      </section>
      <div className="user-details-container">
        <Outlet />
      </div>
    </div>
  );
}
