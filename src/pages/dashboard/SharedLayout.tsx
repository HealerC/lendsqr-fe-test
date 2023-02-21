import { Outlet } from "react-router-dom";
import "./SharedLayout.scss";
import MenuBar from "../../components/MenuBar";

export default function SharedLayout() {
  return (
    <div className="dashboard">
      <MenuBar />
      <Outlet />
    </div>
  );
}
