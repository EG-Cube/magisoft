import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import userImage from "../../assets/user.png";
import "../../styles/Sidebar.css";

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
            <Link to={"/enquiry/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/enquiry/pending"}>Pending</Link>
          </li>
          <li>
            <Link to={"/enquiry/ongoing"}>Ongoing</Link>
          </li>
          <li>
            <Link to={"/enquiry/completed"}>Completed</Link>
          </li>
          {/* <li>
            <Link to={"/enquiry/packages"}>Packages</Link>
          </li> */}
          <li>
            <Link to={"/enquiry/archive"}>Archive</Link>
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
        <Link to={"/"}>
          <button className="logout-btn" onClick={handleClick}>
            Logout
          </button>
        </Link>
      </div>
    </header>
  );
};

export default SideNavbar;
