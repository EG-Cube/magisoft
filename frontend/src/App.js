import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";
import SalesDashboardLayout from "./components/sales/SalesDashboardLayout";
import OperationsDashboardLayout from "./components/operations/OperationsDashboardLayout";
import AccountingDashboardLayout from "./components/accounting/AccountingDashboardLayout";

import AdminSalesDashboardView from "./pages/admin/AdminSalesDashboardView";
import AdminEnquiryDetailView from "./pages/admin/AdminEnquiryDetailsView";
import AdminEnquiryEditView from "./pages/admin/AdminEnquiryEditView";
import AdminEnquiryListView from "./pages/admin/AdminEnquiryListView";
import AdminEnquiryCreateView from "./pages/admin/AdminEnquiryCreateView";

import AdminUserDashboardView from "./pages/admin/AdminUserDashboardView";
import AdminUserDetailView from "./pages/admin/AdminUserDetailsView";
import AdminUserEditView from "./pages/admin/AdminUserEditView";
import AdminUserCreateView from "./pages/admin/AdminUserCreateView";

import AdminItineraryDetailView from "./pages/admin/AdminItineraryDetailsView";
import AdminItineraryEditView from "./pages/admin/AdminItineraryEditView";
import AdminItineraryListView from "./pages/admin/AdminItineraryListView";
import AdminItineraryCreateView from "./pages/admin/AdminItineraryCreateView";

import AdminSiteDetailView from "./pages/admin/AdminSiteDetailsView";
import AdminSiteEditView from "./pages/admin/AdminSiteEditView";
import AdminSiteListView from "./pages/admin/AdminSiteListView";
import AdminSiteCreateView from "./pages/admin/AdminSiteCreateView";

import AdminHotelDetailView from "./pages/admin/AdminHotelDetailsView";
import AdminHotelEditView from "./pages/admin/AdminHotelEditView";
import AdminHotelListView from "./pages/admin/AdminHotelListView";
import AdminHotelCreateView from "./pages/admin/AdminHotelCreateView";

import AdminRestaurantDetailView from "./pages/admin/AdminRestaurantDetailsView";
import AdminRestaurantEditView from "./pages/admin/AdminRestaurantEditView";
import AdminRestaurantListView from "./pages/admin/AdminRestaurantListView";
import AdminRestaurantCreateView from "./pages/admin/AdminRestaurantCreateView";

import AdminTransportDetailView from "./pages/admin/AdminTransportDetailsView";
import AdminTransportEditView from "./pages/admin/AdminTransportEditView";
import AdminTransportListView from "./pages/admin/AdminTransportListView";
import AdminTransportCreateView from "./pages/admin/AdminTransportCreateView";

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

import OperationsEnquiryListView from "./pages/operations/OperationsEnquiryListView";

import ItineraryCreateView from "./pages/operations/ItineraryCreateView";
import ItineraryEditView from "./pages/operations/ItineraryEditView";
import ItineraryDetailsView from "./pages/operations/ItineraryDetailsView";

import AccountingDashboardView from "./pages/accounting/AccountingDashboardView";

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
                    path="dashboard/"
                    element={<AdminSalesDashboardView />}
                  />
                  <Route
                    path="pending/"
                    element={<AdminEnquiryListView type={"Pending"} />}
                  />
                  <Route
                    path="verified/"
                    element={<AdminEnquiryListView type={"Verified"} />}
                  />
                  <Route
                    path="archive/"
                    element={<AdminEnquiryListView type={"Archived"} />}
                  />
                </Route>
                <Route path="itinerary/">
                  <Route
                    path="create/"
                    element={<AdminItineraryCreateView />}
                  />
                  <Route path="edit/:id" element={<AdminItineraryEditView />} />
                  <Route
                    path="view/:id"
                    element={<AdminItineraryDetailView />}
                  />
                  <Route path="list/" element={<AdminItineraryListView />} />
                </Route>
                <Route path="site/">
                  <Route path="create/" element={<AdminSiteCreateView />} />
                  <Route path="edit/:id" element={<AdminSiteEditView />} />
                  <Route path="view/:id" element={<AdminSiteDetailView />} />
                  <Route path="list/" element={<AdminSiteListView />} />
                </Route>
                <Route path="hotel/">
                  <Route path="create/" element={<AdminHotelCreateView />} />
                  <Route path="edit/:id" element={<AdminHotelEditView />} />
                  <Route path="view/:id" element={<AdminHotelDetailView />} />
                  <Route path="list/" element={<AdminHotelListView />} />
                </Route>
                <Route path="restaurant/">
                  <Route
                    path="create/"
                    element={<AdminRestaurantCreateView />}
                  />
                  <Route
                    path="edit/:id"
                    element={<AdminRestaurantEditView />}
                  />
                  <Route
                    path="view/:id"
                    element={<AdminRestaurantDetailView />}
                  />
                  <Route path="list/" element={<AdminRestaurantListView />} />
                </Route>
                <Route path="transport/">
                  <Route
                    path="create/"
                    element={<AdminTransportCreateView />}
                  />
                  <Route path="edit/:id" element={<AdminTransportEditView />} />
                  <Route
                    path="view/:id"
                    element={<AdminTransportDetailView />}
                  />
                  <Route path="list/" element={<AdminTransportListView />} />
                </Route>
                <Route path="user/">
                  <Route path="create/" element={<AdminUserCreateView />} />
                  <Route path="edit/:id" element={<AdminUserEditView />} />
                  <Route path="view/:id" element={<AdminUserDetailView />} />
                  <Route
                    path="dashboard/"
                    element={<AdminUserDashboardView />}
                  />
                </Route>
              </Route>
            </Route>
            {/* Sales */}
            <Route element={<RequireAuth allowedRoles={["Admin", "Sales"]} />}>
              <Route path="sales/" element={<SalesDashboardLayout />}>
                <Route path="dashboard/" element={<SalesDashboardView />} />
                <Route path="enquiry/">
                  <Route path="create/" element={<EnquiryCreateView />} />
                  <Route path="edit/:id" element={<EnquiryEditView />} />
                  <Route
                    path="view/:id"
                    element={<EnquiryDetailView type={"Sales"} />}
                  />
                  <Route
                    path="pending/"
                    element={<EnquiryListView type={"Pending"} />}
                  />
                  <Route
                    path="verified/"
                    element={<EnquiryListView type={"Verified"} />}
                  />
                  <Route
                    path="archive/"
                    element={<EnquiryListView type={"Archived"} />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Operations */}
            <Route
              element={<RequireAuth allowedRoles={["Admin", "Operations"]} />}
            >
              <Route path="operations/" element={<OperationsDashboardLayout />}>
                <Route
                  path="dashboard/"
                  element={<OperationsDashboardView />}
                />
                <Route path="enquiry/">
                  <Route
                    path="view/:id"
                    element={<EnquiryDetailView type={"Operations"} />}
                  />
                  <Route path="list/" element={<OperationsEnquiryListView />} />
                </Route>
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
                  <Route path="create/:id" element={<ItineraryCreateView />} />
                  <Route path="edit/:id" element={<ItineraryEditView />} />
                  <Route path="view/:id" element={<ItineraryDetailsView />} />
                  <Route path="list/" element={<ItineraryListView />} />
                </Route>
              </Route>
            </Route>

            
            {/* Accounting */}
            <Route
              element={<RequireAuth allowedRoles={["Admin", "Accounting"]} />}
            >
              <Route path="accounting/" element={<AccountingDashboardLayout />}>
                <Route
                  path="dashboard/"
                  element={<AccountingDashboardView />}
                />
                <Route path="itinerary/">
                  <Route path="create/:id" element={<ItineraryCreateView />} />
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
