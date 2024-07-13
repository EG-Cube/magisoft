import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import EnquiryDetails from "../../components/enquiry/EnquiryDetails";
import { useParams } from "react-router-dom";

const AdminUserDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const [enquiry, setEnquiry] = useState();

  useEffect(() => {
    const fetchEnquiry = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/enquiry/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setEnquiry(response.data);
    };

    if (user) {
      fetchEnquiry();
    }
  }, [user, id]);

  return (
      <div className="home">
        <div className="enquiries">
          {enquiry && <EnquiryDetails key={id} enquiry={enquiry} />}
        </div>
      </div>
  );
};

export default AdminUserDetailView;
