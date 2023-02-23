import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import DrawerItemsComponent from "./DrawerItemsComponent";
import { useAppContext } from "../context/context";
import "./AppDrawer.scss";

export default function AppDrawer() {
  const { isMobileDrawerOpen, toggleMobileDrawer } = useAppContext();
  return (
    <nav className="app-drawer">
      <Drawer
        variant="temporary"
        open={isMobileDrawerOpen}
        onClose={toggleMobileDrawer}
        ModalProps={{ keepMounted: true }}
        className="temporary-drawer"
      >
        <Toolbar />
        <DrawerItemsComponent />
      </Drawer>
      <Drawer variant="permanent" className="permanent-drawer" open>
        <Toolbar />
        <DrawerItemsComponent />
      </Drawer>
    </nav>
  );
}
