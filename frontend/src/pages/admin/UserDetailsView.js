import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import UserDetails from "../../components/user/UserDetails";
import { useParams } from "react-router-dom";

const DetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const [admin, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/admin/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUser(response.data);
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
      <div className="home">
        <div className="users">
          {admin && <UserDetails key={id} admin={admin} />}
        </div>
      </div>
  );
};

export default DetailView;
