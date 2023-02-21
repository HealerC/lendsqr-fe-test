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
  const { logout } = useAppContext();
  return (
    <AppBar className="menu-bar">
      <div className="head-logos">
        <IconButton sx={{ mx: 1 }}>
          <img src={hamburgerIcon} className="hamburger-icon" />
        </IconButton>
        <img src={Logo} />
      </div>
      <main>
        <SearchBar value="dorime" handleChange={() => console.log("change")} />
        <div>
          <a href="#">Docs</a>
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
