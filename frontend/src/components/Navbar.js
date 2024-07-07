import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Magi Holidays</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>Hi {user.user.firstName} | {user.user.country}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
