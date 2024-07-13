import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";
import AdminEnquiryDashboardView from "./pages/admin/AdminEnquiryDashboardView";
import AdminEnquiryDetailView from "./pages/admin/AdminEnquiryDetailsView";
import AdminEnquiryEditView from "./pages/admin/AdminEnquiryEditView";
import AdminEnquiryListView from "./pages/admin/AdminEnquiryListView";
import AdminEnquiryCreateView from "./pages/admin/AdminEnquiryCreateView";
import AdminUserDashboardView from "./pages/admin/AdminUserDashboardView";
import AdminUserDetailView from "./pages/admin/AdminUserDetailsView";
import AdminUserEditView from "./pages/admin/AdminUserEditView";
import AdminUserListView from "./pages/admin/AdminUserListView";
import AdminUserCreateView from "./pages/admin/AdminUserCreateView";

import CreateEnquiryForm from "./pages/enquiry/EnquiryGeneralView";
import EnquiryDashboardView from "./pages/enquiry/EnquiryDashboardView";
import EnquiryDetailView from "./pages/enquiry/EnquiryDetailsView";
import EnquiryEditView from "./pages/enquiry/EnquiryEditView";
import EnquiryListView from "./pages/enquiry/EnquiryListView";
import EnquiryCreateView from "./pages/enquiry/EnquiryCreateView";
import EnquiryDashboardLayout from "./components/enquiry/EnquiryDashboardLayout";

import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./pages/RequireAuth";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            {/* Admin */}
            <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
              <Route path="admin/" element={<AdminDashboardLayout />}>
                <Route path="enquiry/">
                  <Route path="create/" element={<AdminEnquiryCreateView />} />
                  <Route path="edit/:id" element={<AdminEnquiryEditView />} />
                  <Route path="view/:id" element={<AdminEnquiryDetailView />} />
                  <Route
                    path="dashboard"
                    element={<AdminEnquiryDashboardView />}
                  />
                  <Route
                    path="ongoing"
                    element={<AdminEnquiryListView type={"Ongoing"} />}
                  />
                  <Route
                    path="pending"
                    element={<AdminEnquiryListView type={"Pending"} />}
                  />
                  <Route
                    path="completed"
                    element={<AdminEnquiryListView type={"Completed"} />}
                  />
                  <Route
                    path="archive"
                    element={<AdminEnquiryListView type={"Archived"} />}
                  />
                </Route>
                <Route path="user/">
                  <Route path="create/" element={<AdminUserCreateView />} />
                  <Route path="edit/:id" element={<AdminUserEditView />} />
                  <Route path="view/:id" element={<AdminUserDetailView />} />
                  <Route
                    path="dashboard"
                    element={<AdminUserDashboardView />}
                  />
                  <Route
                    path="ongoing"
                    element={<AdminUserListView type={"Ongoing"} />}
                  />
                  <Route
                    path="pending"
                    element={<AdminUserListView type={"Pending"} />}
                  />
                  <Route
                    path="completed"
                    element={<AdminUserListView type={"Completed"} />}
                  />
                  <Route
                    path="archive"
                    element={<AdminUserListView type={"Archived"} />}
                  />
                </Route>
              </Route>
            </Route>
            {/* Sales */}
            <Route element={<RequireAuth allowedRoles={["Admin", "Sales"]} />}>
              <Route path="enquiry/" element={<EnquiryDashboardLayout />}>
                <Route path="create/" element={<EnquiryCreateView />} />
                <Route path="edit/:id" element={<EnquiryEditView />} />
                <Route path="view/:id" element={<EnquiryDetailView />} />
                <Route path="dashboard" element={<EnquiryDashboardView />} />
                <Route
                  path="ongoing"
                  element={<EnquiryListView type={"Ongoing"} />}
                />
                <Route
                  path="pending"
                  element={<EnquiryListView type={"Pending"} />}
                />
                <Route
                  path="completed"
                  element={<EnquiryListView type={"Completed"} />}
                />
                <Route
                  path="archive"
                  element={<EnquiryListView type={"Archived"} />}
                />
              </Route>
            </Route>

            {/* No Authentication Required */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/enquiry/general" element={<CreateEnquiryForm />} />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
