import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "../styles/Login.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  useEffect(() => {
    if (user) {
      if (from !== location.pathname) navigate(from, { replace: true });
      else if (user.user.roles.find((r) => r === "Admin")) {
        navigate("/admin/enquiry/dashboard", { replace: true });
      } else if (user.user.roles.find((r) => r === "Sales")) {
        navigate("/enquiry/dashboard", { replace: true });
      }
    }
  }, [user, from, location, navigate]);

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email : </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password : </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      {error && <div className="error">{error}</div>}
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </form>
  );
};

export default Login;
