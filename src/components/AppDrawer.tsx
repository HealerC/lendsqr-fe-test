import Drawer from "@mui/material/Drawer";
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
        <DrawerItemsComponent />
      </Drawer>
      <Drawer variant="permanent" className="permanent-drawer" open>
        <DrawerItemsComponent />
      </Drawer>
    </nav>
  );
}
