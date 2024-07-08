import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEnquiryForm from "./pages/enquiry/GeneralView";
import DashboardView from "./pages/enquiry/DashboardView";
import DetailView from "./pages/enquiry/DetailsView";
import EditView from "./pages/enquiry/EditView";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
            </Route>

            <Route
              path="/"
              element={!user ? <Login /> : <Navigate to="/enquiry/dashboard" />}
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