import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEnquiryForm from "./pages/enquiry/GeneralView";
import DashboardView from "./pages/enquiry/DashboardView";
import DetailView from "./pages/enquiry/DetailsView";
import EditView from "./pages/enquiry/EditView";
import ListView from "./pages/enquiry/ListView";
import CreateView from "./pages/enquiry/CreateView";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
            <div className="pages">
              <Routes>
                <Route path="enquiry/" element={<DashboardLayout />}>
                  <Route
                    path="create/"
                    element={user ? <CreateView /> : <Navigate to="/" />}
                  />
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
                    element={user ? <ListView type={"Ongoing"} /> : <Navigate to="/" />}
                  />
                  <Route
                    path="pending"
                    element={user ? <ListView type={"Pending"} /> : <Navigate to="/" />}
                  />
                  <Route
                    path="completed"
                    element={user ? <ListView type={"Completed"} /> : <Navigate to="/" />}
                  />
                  <Route
                    path="archive"
                    element={user ? <ListView type={"Archived"} /> : <Navigate to="/" />}
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
      </BrowserRouter>
    </div>
  );
}

export default App;
