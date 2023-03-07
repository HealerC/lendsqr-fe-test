import { useAppContext } from "../../../context/context";
import { useParams, Link, Outlet } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import backIcon from "../../../assets/icons/back.svg";
import Stars from "../../../components/Stars";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useRouteMatch } from "../../../utils";
import "./SharedLayout.scss";

// All the subroutes of /users
const userRoutes = [
  "/users/:userId/general-details",
  "/users/:userId/documents",
  "/users/:userId/bank-details",
  "/users/:userId/loans",
  "/users/:userId/savings",
  "/users/:userId/app-and-system",
];

/* SharedLayout that renders summary of the user at the top and an outlet
where other details about the user is rendered */
export default function User() {
  const routeMatch = useRouteMatch(userRoutes);
  const currentTabRoutePattern =
    routeMatch?.pattern.path || "/users/:userId/general-details";
  // The current route pattern... Default is `general-details`

  const { userList, activateUser, blacklistUser } = useAppContext();
  const { userId } = useParams();
  const user = userList.find((person) => person.id === userId);

  return (
    <div className="user-details-shared">
      {/* Goes back to the page with the userlist table */}
      <Button
        component={Link}
        to=".."
        startIcon={<img src={backIcon} alt="" />}
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
            <Stars starCount={Math.ceil(Math.random() * 3) + 1} starMax={3} />
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

        {/* Control the route */}
        <Tabs
          value={currentTabRoutePattern}
          variant="scrollable"
          scrollButtons="auto"
          className="tabs"
        >
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
