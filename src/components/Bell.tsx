import bellIcon from "../assets/icons/bell.svg";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function Bell() {
  return (
    <Tooltip title="You have no notifications">
      <IconButton>
        <img src={bellIcon} />
      </IconButton>
    </Tooltip>
  );
}
