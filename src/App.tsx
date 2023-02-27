import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserList from "./pages/dashboard/UserList";
import User from "./pages/dashboard/User/User";
import Home from "./pages/dashboard/Home";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Landing from "./pages/Landing";
import OtherDetails from "./pages/dashboard/User/OtherDetails";
import SharedLayoutUser from "./pages/dashboard/User/SharedLayout";
import Documents from "./pages/dashboard/User/Documents";
import BankDetails from "./pages/dashboard/User/BankDetails";
import Loans from "./pages/dashboard/User/Loans";
import Savings from "./pages/dashboard/User/Savings";
import AppAndSystem from "./pages/dashboard/User/AppAndSystem";

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
            <Route path=":userId" element={<SharedLayoutUser />}>
              <Route index element={<User />} />
              <Route path="general-details" element={<User />} />
              <Route path="documents" element={<Documents />} />
              <Route path="bank-details" element={<BankDetails />} />
              <Route path="loans" element={<Loans />} />
              <Route path="savings" element={<Savings />} />
              <Route path="app-and-system" element={<AppAndSystem />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
