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
            <Link to={"/admin/enquiry/dashboard"}>Enquiry</Link>
          </li>
          <li>
            <Link to={"/admin/enquiry/pending"}>Pending</Link>
          </li>
          <li>
            <Link to={"/admin/enquiry/ongoing"}>Ongoing</Link>
          </li>
          <li>
            <Link to={"/admin/enquiry/completed"}>Completed</Link>
          </li>
          {/* <li>
            <Link to={"/admin/enquiry/packages"}>Packages</Link>
          </li> */}
          <li>
            <Link to={"/admin/enquiry/archive"}>Archive</Link>
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
