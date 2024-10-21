import { useEffect, useState } from "react";
import axios from "axios";

// components
import UserDetails from "../../components/user/UserDetails";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Spinner from "../../components/Spinner";

const AdminUserDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${API_URL}/api/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserData(response.data);
      setLoading(false);
    };

    fetchUser();
    console.log(userData);
  }, []);

  return (
    <div className="home">
      <div className="enquiries">
        {loading ? <Spinner /> : <UserDetails key={id} user={userData} />}
      </div>
    </div>
  );
};

export default AdminUserDetailView;
