import {
  useParams,
  useLocation,
  Link,
  Outlet,
  matchPath,
} from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAppContext } from "../../../context/context";
import Button from "@mui/material/Button";
import backIcon from "../../../assets/icons/back.svg";
import "./SharedLayout.scss";
import Stars from "../../../components/Stars";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const userRoutes = [
  "/users/:userId/general-details",
  "/users/:userId/documents",
  "/users/:userId/bank-details",
  "/users/:userId/loans",
  "/users/:userId/savings",
  "/users/:userId/app-and-system",
];

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default function User() {
  const { userId } = useParams();
  const routeMatch = useRouteMatch(userRoutes);
  const currentTabRoutePattern =
    routeMatch?.pattern.path || "/users/:userId/general-details";
  console.log(currentTabRoutePattern);

  const { userList, activateUser, blacklistUser } = useAppContext();
  const user = userList.find((person) => person.id === userId);
  return (
    <div className="user-details-shared">
      <Button
        component={Link}
        to=".."
        startIcon={<img src={backIcon} />}
        className="back-button"
      >
        Back to users
      </Button>
      <section className="header-nav">
        <h1>User details</h1>
        <div>
          <Button
            variant="outlined"
            color="warning"
            className="blacklist-button"
            disabled={user?.status === "blacklisted"}
            onClick={() => blacklistUser(userId as string)}
          >
            Blacklist user
          </Button>
          <Button
            variant="outlined"
            className="activate-button"
            disabled={user?.status === "active"}
            onClick={() => activateUser(userId as string)}
          >
            Activate user
          </Button>
        </div>
      </section>
      <header>
        <section className="user-summary">
          <div className="profile-details">
            <Avatar
              alt={`${user?.profile.firstName} ${user?.profile.lastName}`}
              src={user?.profile.avatar}
              className="avatar"
            />
            <div className="profile-info">
              <h2>{`${user?.profile.firstName} ${user?.profile.lastName}`}</h2>
              <p>{user?.accountNumber}</p>
            </div>
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="divider"
          />
          <div className="tier">
            <p>User's Tier</p>
            <Stars starCount={2} starMax={3} />
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="divider"
          />
          <div className="bank-details">
            <p className="account-balance">₦{user?.accountBalance}</p>
            <p className="bank">
              {user?.profile.bvn}/{user?.profile.address} Bank
            </p>
          </div>
        </section>
        <Tabs value={currentTabRoutePattern} className="tabs">
          <Tab
            component={Link}
            to="general-details"
            value="/users/:userId/general-details"
            label="General Details"
          />
          <Tab
            component={Link}
            to="documents"
            value="/users/:userId/documents"
            label="Documents"
          />
          <Tab
            component={Link}
            to="bank-details"
            value="/users/:userId/bank-details"
            label="Bank Details"
          />
          <Tab
            component={Link}
            to="loans"
            value="/users/:userId/loans"
            label="Loans"
          />
          <Tab
            component={Link}
            to="savings"
            value="/users/:userId/savings"
            label="Savings"
          />
          <Tab
            component={Link}
            to={`/users/${userId}/app-and-system`}
            value="/users/:userId/app-and-system"
            label="App and System"
          />
        </Tabs>
      </header>
      <div className="user-details-outlet-container">
        <Outlet />
      </div>
    </div>
  );
}
