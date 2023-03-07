import React from "react";
import { NavLink, NavLinkProps, useMatch } from "react-router-dom";
import { ListItemText } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import { drawerItems } from "../utils/app-drawer-content";
import expandMoreIcon from "../assets/icons/expand-more.svg";
import { DrawerItemBase, DrawerItemDetails } from "../utils/app-drawer-content";
import Bell from "./Bell";
import ArticleIcon from "@mui/icons-material/Article";
import Toolbar from "@mui/material/Toolbar";
import "./DrawerItemsComponent.scss";

// A NavLink is used as the component for navigating between the different routes
// in the app drawer
const Link = React.forwardRef<HTMLAnchorElement, NavLinkProps>(function Link(
  itemProps,
  ref
) {
  return <NavLink ref={ref} {...itemProps} role={undefined} />;
});

// icon: Icon shown in the buttons of the drawer
// primary: text shown
// to: the route in which it navigates to on click
type ListItemButtonLinkProps = {
  icon?: React.ReactNode;
  primary: string;
  to: string;
};

// A list item button but which contains a link component that navigates to
// different
function ListItemButtonLink({ icon, primary, to }: ListItemButtonLinkProps) {
  const match = useMatch("/" + to + "/*");
  // Test if the particular route of the button is the active route
  // so we could give it some styling

  return (
    <ListItemButton
      component={Link}
      to={to}
      className={Boolean(match) ? "dashboard-link active" : "dashboard-link"}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

// An Item is just a ListItem (part of a List which is displayed in the drawer)
// that just contains a button that navigates to a route
function Item({
  id,
  icon,
  text,
  route = "",
  className = "",
}: DrawerItemBase & { className?: string }) {
  return (
    <ListItem key={id} disablePadding className={className}>
      <ListItemButtonLink icon={icon} primary={text} to={route} />
    </ListItem>
  );
}

// An ItemWithDetails renders sub items which is initially collapsed
// These sub items are now `Item`s that could navigate to routes
function ItemWithDetails({ id, icon, text, details }: DrawerItemDetails) {
  const [expanded, setExpanded] = React.useState(false);
  // Whether the sub items shows (collapsed or !expanded defaultly)

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <>
      <ListItem key={id} disablePadding>
        <ListItemButton onClick={handleExpandClick} disableRipple>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} className="expandable-text" />
          <ListItemIcon
            className={
              expanded ? "expand-more-icon expanded" : "expand-more-icon"
            }
          >
            <img src={expandMoreIcon} alt={"see more routes in " + text} />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="collapsible-items-wrapper">
          {details?.map((itemDetails) => (
            <Item
              key={"itemDetails" + itemDetails.id}
              id={itemDetails.id}
              icon={itemDetails.icon}
              text={itemDetails.text}
              route={itemDetails.route}
            />
          ))}
        </div>
      </Collapse>
    </>
  );
}

export default function DrawerItemsComponent() {
  // Render the contents of drawer item as items of the app drawer
  const getItems = () => {
    return Object.keys(drawerItems).map((category) => {
      return (
        <List key={category}>
          <p className="category">{category !== "uncategorized" && category}</p>
          {drawerItems[category].map((item) => {
            if (item.details) {
              return <ItemWithDetails key={"item" + item.id} {...item} />;
            } else {
              return <Item key={"item" + item.id} {...item} />;
            }
          })}
        </List>
      );
    });
  };

  return (
    <div className="drawer-components">
      {/* Create space so the buttons are not hidden by the menu bar */}
      <Toolbar sx={{ height: "80px" }} />

      {/* Notifications and Docs shown only on small screens */}
      <Toolbar className="drawer-mobile">
        <div className="notifications-mobile">
          <Bell />
          <p>Notifs</p>
        </div>
        <a
          className="documentation-mobile"
          href="https://github.com/HealerC/lendsqr-fe-test"
          target="_blank"
          rel="noreferrer"
        >
          <ArticleIcon color="secondary" />
          <p>Docs</p>
        </a>
      </Toolbar>

      {/* Drawer items */}
      {getItems()}
    </div>
  );
}
