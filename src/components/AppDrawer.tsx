import Drawer from "@mui/material/Drawer";
import DrawerItemsComponent from "./DrawerItemsComponent";
import { useAppContext } from "../context/context";
import "./AppDrawer.scss";

/**
 * The app drawer that is rendered on screen
 * There are two variants here --> temporary and permanent
 * The temporary variant is rendered on smaller screens
 * The permanent variant is rendered on larger screens
 */
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
