import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <div>
      SharedLayout
      <Outlet />
    </div>
  );
}