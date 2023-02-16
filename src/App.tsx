import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserList from "./pages/dashboard/UserList";
import User from "./pages/dashboard/User/User";
import Home from "./pages/dashboard/Home";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Landing from "./pages/Landing";
import OtherDetails from "./pages/dashboard/User/OtherDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":userId">
              <Route index element={<User />} />
              <Route path=":otherDetails" element={<OtherDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
