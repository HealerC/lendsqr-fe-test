import bellIcon from "../assets/icons/bell.svg";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./Bell.scss";

export default function Bell() {
  return (
    <Tooltip title="You have no notifications" className="notification-icon">
      <IconButton>
        <img src={bellIcon} alt="" />
      </IconButton>
    </Tooltip>
  );
}
