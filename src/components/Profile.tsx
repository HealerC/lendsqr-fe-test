import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import arrowDownIcon from "../assets/icons/arrow-down.svg";
import "./Profile.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type MenuProp = {
  text: string;
  action: () => void;
};
type Props = {
  username: string;
  profilePicturePath: string;
  menuProps: MenuProp[];
};
export default function Profile({
  username,
  profilePicturePath,
  menuProps,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className="profile"
        onClick={handleOpen}
        endIcon={<img src={arrowDownIcon} alt="" />}
      >
        <Avatar alt={username} src={profilePicturePath} />
        <p>{username}</p>
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuProps.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.action();
              handleClose();
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
