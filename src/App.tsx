import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserList from "./pages/dashboard/UserList";
import GeneralDetails from "./pages/dashboard/User/GeneralDetails";
import Home from "./pages/dashboard/Home";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Landing from "./pages/Landing";
import SharedLayoutUser from "./pages/dashboard/User/SharedLayout";
import Documents from "./pages/dashboard/User/Documents";
import BankDetails from "./pages/dashboard/User/BankDetails";
import Loans from "./pages/dashboard/User/Loans";
import Savings from "./pages/dashboard/User/Savings";
import AppAndSystem from "./pages/dashboard/User/AppAndSystem";

/*
 *  All the routes used in the app are defined in this component.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        
        {/* The dashboard route is represented by '/' and it will go to the
            landing page if user is not logged in. (Protected Route) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          
          {/* The dashboard home page. However it is empty and logging in 
          will redirect instead to the page with the user list */}
          <Route index element={<Home />} />
          
          {/* The index route here goes to a page where there is a table of all the users.
          Viewing details of a user goes to another route where there are other routes (subroutes)
          for each category of user details */}
          <Route path="users">
            <Route index element={<UserList />} />

            <Route path=":userId" element={<SharedLayoutUser />}>
              <Route index element={<GeneralDetails />} />
              <Route path="general-details" element={<GeneralDetails />} />
              <Route path="documents" element={<Documents />} />
              <Route path="bank-details" element={<BankDetails />} />
              <Route path="loans" element={<Loans />} />
              <Route path="savings" element={<Savings />} />
              <Route path="app-and-system" element={<AppAndSystem />} />
            </Route>
          </Route>

          {/* All the other routes in the drawer goes to the general <Home /> route */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
