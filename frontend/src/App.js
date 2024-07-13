import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboardView from "./pages/admin/AdminDashboardView";
import UserDetailView from "./pages/admin/UserDetailsView";
import UserEditView from "./pages/admin/UserEditView";
import UserCreateView from "./pages/admin/UserCreateView";

import CreateEnquiryForm from "./pages/enquiry/EnquiryGeneralView";
import EnquiryDashboardView from "./pages/enquiry/EnquiryDashboardView";
import EnquiryDetailView from "./pages/enquiry/EnquiryDetailsView";
import EnquiryEditView from "./pages/enquiry/EnquiryEditView";
import EnquiryListView from "./pages/enquiry/EnquiryListView";
import EnquiryCreateView from "./pages/enquiry/EnquiryCreateView";

import DashboardLayout from "./components/DashboardLayout";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="admin/"
              element={<DashboardLayout allowed={["Admin"]} />}
            >
              <Route
                path="create/"
                element={user ? <UserCreateView /> : <Navigate to="/" />}
              />
              <Route
                path="edit/:id"
                element={user ? <UserEditView /> : <Navigate to="/" />}
              />
              <Route
                path="view/:id"
                element={user ? <UserDetailView /> : <Navigate to="/" />}
              />
              <Route
                path="dashboard"
                element={user ? <AdminDashboardView /> : <Navigate to="/" />}
              />
            </Route>
            <Route
              path="enquiry/"
              element={<DashboardLayout allowed={["Admin", "Sales"]} />}
            >
              <Route
                path="create/"
                element={user ? <EnquiryCreateView /> : <Navigate to="/" />}
              />
              <Route
                path="edit/:id"
                element={user ? <EnquiryEditView /> : <Navigate to="/" />}
              />
              <Route
                path="view/:id"
                element={user ? <EnquiryDetailView /> : <Navigate to="/" />}
              />
              <Route
                path="dashboard"
                element={user ? <EnquiryDashboardView /> : <Navigate to="/" />}
              />
              <Route
                path="ongoing"
                element={
                  user ? (
                    <EnquiryListView type={"Ongoing"} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="pending"
                element={
                  user ? (
                    <EnquiryListView type={"Pending"} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="completed"
                element={
                  user ? (
                    <EnquiryListView type={"Completed"} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="archive"
                element={
                  user ? (
                    <EnquiryListView type={"Archived"} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="packages"
                element={user ? <EnquiryDashboardView /> : <Navigate to="/" />}
              />
            </Route>
            <Route
              path="/"
              element={!user ? <Login /> : user.department === "Admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/enquiry/dashboard" />}
            />
            <Route
              path="/signup"
              element={
                !user ? <Signup /> : <Navigate to="/enquiry/dashboard" />
              }
            />
            <Route path="/enquiry/general" element={<CreateEnquiryForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
