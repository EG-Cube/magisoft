import { useEffect, useState } from "react";
import axios from "axios";

// components
import UserDetails from "../../components/user/UserDetails";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminUserDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${API_URL}/api/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserData(response.data);
    };

    fetchUser();
    console.log(userData);
  }, []);

  return (
    <div className="home">
      <div className="enquiries">
        <UserDetails key={id} user={userData} />
      </div>
    </div>
  );
};

export default AdminUserDetailView;
