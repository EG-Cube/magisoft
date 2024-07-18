import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";

import AdminSalesDashboardView from "./pages/admin/AdminSalesDashboardView";
import AdminEnquiryDetailView from "./pages/admin/AdminEnquiryDetailsView";
import AdminEnquiryEditView from "./pages/admin/AdminEnquiryEditView";
import AdminEnquiryListView from "./pages/admin/AdminEnquiryListView";
import AdminEnquiryCreateView from "./pages/admin/AdminEnquiryCreateView";

import AdminUserDashboardView from "./pages/admin/AdminUserDashboardView";
import AdminUserDetailView from "./pages/admin/AdminUserDetailsView";
import AdminUserEditView from "./pages/admin/AdminUserEditView";
import AdminUserCreateView from "./pages/admin/AdminUserCreateView";

import CreateEnquiryForm from "./pages/sales/EnquiryGeneralView";
import SalesDashboardView from "./pages/sales/SalesDashboardView";
import EnquiryDetailView from "./pages/sales/EnquiryDetailsView";
import EnquiryEditView from "./pages/sales/EnquiryEditView";
import EnquiryListView from "./pages/sales/EnquiryListView";
import EnquiryCreateView from "./pages/sales/EnquiryCreateView";
import SalesDashboardLayout from "./components/sales/SalesDashboardLayout";

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
                    element={<AdminSalesDashboardView />}
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
                </Route>
              </Route>
            </Route>
            {/* Sales */}
            <Route element={<RequireAuth allowedRoles={["Admin", "Sales"]} />}>
              <Route path="enquiry/" element={<SalesDashboardLayout />}>
                <Route path="create/" element={<EnquiryCreateView />} />
                <Route path="edit/:id" element={<EnquiryEditView />} />
                <Route path="view/:id" element={<EnquiryDetailView />} />
                <Route path="dashboard" element={<SalesDashboardView />} />
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
            {/* <Route path="/signup" element={<Signup />} /> */}
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
