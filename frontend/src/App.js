import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";
import SalesDashboardLayout from "./components/sales/SalesDashboardLayout";
import OperationsDashboardLayout from "./components/operations/OperationsDashboardLayout";

import AdminSalesDashboardView from "./pages/admin/AdminSalesDashboardView";
import AdminEnquiryDetailView from "./pages/admin/AdminEnquiryDetailsView";
import AdminEnquiryEditView from "./pages/admin/AdminEnquiryEditView";
import AdminEnquiryListView from "./pages/admin/AdminEnquiryListView";
import AdminEnquiryCreateView from "./pages/admin/AdminEnquiryCreateView";

import AdminUserDashboardView from "./pages/admin/AdminUserDashboardView";
import AdminUserDetailView from "./pages/admin/AdminUserDetailsView";
import AdminUserEditView from "./pages/admin/AdminUserEditView";
import AdminUserCreateView from "./pages/admin/AdminUserCreateView";

import SalesDashboardView from "./pages/sales/SalesDashboardView";
import CreateEnquiryForm from "./pages/sales/EnquiryGeneralView";
import EnquiryDetailView from "./pages/sales/EnquiryDetailsView";
import EnquiryEditView from "./pages/sales/EnquiryEditView";
import EnquiryListView from "./pages/sales/EnquiryListView";
import EnquiryCreateView from "./pages/sales/EnquiryCreateView";

import OperationsDashboardView from "./pages/operations/OperationsDashboardView";

import SiteDetailView from "./pages/operations/SiteDetailsView";
import SiteEditView from "./pages/operations/SiteEditView";
import SiteListView from "./pages/operations/SiteListView";
import SiteCreateView from "./pages/operations/SiteCreateView";

import TransportDetailView from "./pages/operations/TransportDetailsView";
import TransportEditView from "./pages/operations/TransportEditView";
import TransportListView from "./pages/operations/TransportListView";
import TransportCreateView from "./pages/operations/TransportCreateView";

import HotelDetailView from "./pages/operations/HotelDetailsView";
import HotelEditView from "./pages/operations/HotelEditView";
import HotelListView from "./pages/operations/HotelListView";
import HotelCreateView from "./pages/operations/HotelCreateView";

import RestaurantDetailView from "./pages/operations/RestaurantDetailsView";
import RestaurantEditView from "./pages/operations/RestaurantEditView";
import RestaurantListView from "./pages/operations/RestaurantListView";
import RestaurantCreateView from "./pages/operations/RestaurantCreateView";

import ItineraryCreateView from "./pages/operations/ItineraryCreateView";
import ItineraryEditView from "./pages/operations/ItineraryEditView";
import ItineraryDetailsView from "./pages/operations/ItineraryDetailsView";

import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./pages/RequireAuth";
import NotFound from "./pages/NotFound";
import ItineraryListView from "./pages/operations/ItineraryListView";

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

            {/* Operations */}
            <Route
              element={<RequireAuth allowedRoles={["Admin", "Operations"]} />}
            >
              <Route path="operations/" element={<OperationsDashboardLayout />}>
              <Route path="dashboard/" element={<OperationsDashboardView />} />
                <Route path="site/">
                  <Route path="create/" element={<SiteCreateView />} />
                  <Route path="edit/:id" element={<SiteEditView />} />
                  <Route path="view/:id" element={<SiteDetailView />} />
                  <Route path="list/" element={<SiteListView />} />
                </Route>
                <Route path="hotel/">
                  <Route path="create/" element={<HotelCreateView />} />
                  <Route path="edit/:id" element={<HotelEditView />} />
                  <Route path="view/:id" element={<HotelDetailView />} />
                  <Route path="list/" element={<HotelListView />} />
                </Route>
                <Route path="restaurant/">
                  <Route path="create/" element={<RestaurantCreateView />} />
                  <Route path="edit/:id" element={<RestaurantEditView />} />
                  <Route path="view/:id" element={<RestaurantDetailView />} />
                  <Route path="list/" element={<RestaurantListView />} />
                </Route>
                <Route path="transport/">
                  <Route path="create/" element={<TransportCreateView />} />
                  <Route path="edit/:id" element={<TransportEditView />} />
                  <Route path="view/:id" element={<TransportDetailView />} />
                  <Route path="list/" element={<TransportListView />} />
                </Route>
                <Route path="itinerary/">
                  <Route path="create/" element={<ItineraryCreateView />} />
                  <Route path="edit/:id" element={<ItineraryEditView />} />
                  <Route path="view/:id" element={<ItineraryDetailsView />} />
                  <Route path="list/" element={<ItineraryListView />} />
                </Route>
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
