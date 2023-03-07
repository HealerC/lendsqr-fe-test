import Logo from "../assets/images/logo.png";
import profilePicture from "../assets/images/profile-picture.jpg";
import { useAppContext } from "../context/context";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import Bell from "./Bell";
import AppBar from "@mui/material/AppBar";
import "./MenuBar.scss";
import hamburgerIcon from "../assets/icons/hamburger.svg";
import IconButton from "@mui/material/IconButton";

export default function MenuBar() {
  const { logout, toggleMobileDrawer, toggleFilterModal } = useAppContext();
  return (
    <AppBar className="menu-bar">
      <div className="head-logos">
        <IconButton
          sx={{ mx: 1 }}
          onClick={toggleMobileDrawer}
          className="hamburger-wrapper"
        >
          <img
            src={hamburgerIcon}
            className="hamburger-icon"
            alt="toggle app drawer"
          />
        </IconButton>
        <img src={Logo} className="app-logo-menubar" alt="app logo" />
      </div>
      <main>
        <SearchBar
          value="Click to filter -->"
          // handleChange={() => console.log("change")}
          handleSubmit={toggleFilterModal}
        />
        <div>
          <a href="https://github.com/HealerC/lendsqr-fe-test">Docs</a>
          <Bell />
          <Profile
            username="Adedeji"
            profilePicturePath={profilePicture}
            menuProps={[{ text: "Logout", action: logout }]}
          />
        </div>
      </main>
    </AppBar>
  );
}
