import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.css";

// pages & components
import TopNavbar from "./components/TopNavbar";
import TopNav from "./components/TopNav";
import SideNavbar from "./components/SideNavbar";
import CentreSection from "./components/CentreSection";
import RightSide from "./components/RightSide";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEnquiryForm from "./pages/enquiry/GeneralView";
import DashboardView from "./pages/enquiry/DashboardView";
import DetailView from "./pages/enquiry/DetailsView";
import EditView from "./pages/enquiry/EditView";
import ListView from "./pages/enquiry/ListView";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <TopNav />
        <div className="main-content">
          <SideNavbar />
          <CentreSection>
            <div className="pages">
              <Routes>
                <Route path="enquiry">
                  <Route
                    path="edit/:id"
                    element={user ? <EditView /> : <Navigate to="/" />}
                  />
                  <Route
                    path="view/:id"
                    element={user ? <DetailView /> : <Navigate to="/" />}
                  />
                  <Route
                    path="dashboard"
                    element={user ? <DashboardView /> : <Navigate to="/" />}
                  />
                  <Route
                    path="ongoing"
                    element={user ? <ListView type={"ongoing"} /> : <Navigate to="/" />}
                  />
                  <Route
                    path="pending"
                    element={user ? <ListView type={"pending"} /> : <Navigate to="/" />}
                  />
                  <Route
                    path="completed"
                    element={user ? <ListView type={"completed"} /> : <Navigate to="/" />}
                  />
                  <Route
                    path="archive"
                    element={user ? <ListView type={"archive"} /> : <Navigate to="/" />}
                  />
                  <Route
                    path="packages"
                    element={user ? <DashboardView /> : <Navigate to="/" />}
                  />
                </Route>

                <Route
                  path="/"
                  element={
                    !user ? <Login /> : <Navigate to="/enquiry/dashboard" />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    !user ? <Signup /> : <Navigate to="/enquiry/dashboard" />
                  }
                />
                <Route
                  path="/enquiry/general"
                  element={<CreateEnquiryForm />}
                />
              </Routes>
            </div>
          </CentreSection>
          <RightSide />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
