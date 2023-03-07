import { Outlet } from "react-router-dom";
import "./SharedLayout.scss";
import MenuBar from "../../components/MenuBar";
import AppDrawer from "../../components/AppDrawer";

export default function SharedLayout() {
  return (
    <div className="app-dashboard">
      <MenuBar />
      <div className="drawer-and-app">
        <AppDrawer />
        <div className="app-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
