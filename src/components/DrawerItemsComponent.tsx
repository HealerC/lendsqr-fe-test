import React from "react";
import { ListItemText } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import { drawerItems } from "../utils/app-drawer-content";
import expandMoreIcon from "../assets/icons/expand-more.svg";
import { DrawerItemBase, DrawerItemDetails } from "../utils/app-drawer-content";
import "./DrawerItemsComponent.scss";

function Item({ id, icon, text }: DrawerItemBase) {
  return (
    <ListItem key={id} disablePadding>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

function ItemWithDetails({ id, icon, text, details }: DrawerItemDetails) {
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <>
      <ListItem key={id} disablePadding>
        <ListItemButton onClick={handleExpandClick} disableRipple>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
          <ListItemIcon
            className={
              expanded ? "expand-more-icon expanded" : "expand-more-icon"
            }
          >
            <img src={expandMoreIcon} />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="collapsible-items-wrapper">
          {details?.map((itemDetails) => (
            <Item
              id={itemDetails.id}
              icon={itemDetails.icon}
              text={itemDetails.text}
            />
          ))}
        </div>
      </Collapse>
    </>
  );
}

export default function DrawerItemsComponent() {
  const getItems = () => {
    return Object.keys(drawerItems).map((category) => {
      return (
        <List key={category}>
          <p>{category !== "uncategorized" && category}</p>
          {drawerItems[category].map((item) => {
            if (item.details) {
              return <ItemWithDetails {...item} />;
            } else {
              return <Item {...item} />;
            }
          })}
        </List>
      );
    });
  };

  return <div>{getItems()}</div>;
}