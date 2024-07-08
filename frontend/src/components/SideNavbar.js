import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import userImage from "../assets/user.png";
import "../styles/Sidebar.css";

const SideNavbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="side-nav">
      <nav className="nav">
        <ul>
          <li>
            <Link to={"/enquiry/dashboard"}>
              <a href="#">Dashboard</a>
            </Link>
          </li>
          <li>
            <Link to={"/enquiry/pending"}>
              <a href="#">Pending</a>
            </Link>
          </li>
          <li>
            <Link to={"/enquiry/ongoing"}>
              <a href="#">Ongoing</a>
            </Link>
          </li>
          <li>
            <Link to={"/enquiry/completed"}>
              <a href="#">Completed</a>
            </Link>
          </li>
          <li>
            <Link to={"/enquiry/packages"}>
              <a href="#">Packages</a>
            </Link>
          </li>
          <li>
            <Link to={"/enquiry/archive"}>
              <a href="#">Archive</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <div className="user">
          <div className="user-pic">
            <img src={userImage} alt={user?.user.firstName} />
          </div>
          <div className="user-name">
            <p>{user?.user.firstName}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleClick}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default SideNavbar;
