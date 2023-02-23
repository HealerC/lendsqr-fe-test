import { Outlet } from "react-router-dom";
import "./SharedLayout.scss";
import MenuBar from "../../components/MenuBar";
import AppDrawer from "../../components/AppDrawer";
export default function SharedLayout() {
  return (
    <div className="dashboard">
      <MenuBar />
      <AppDrawer />
      <Outlet />
    </div>
  );
}
