import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import { useParams } from "react-router-dom";
import EnquiryDetails from "../../components/enquiry/EnquiryDetails";
import Spinner from "../../components/Spinner";

const AdminEnquiryDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;

  const [enquiry, setEnquiry] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiry = async () => {
      const response = await axios.get(`${API_URL}/api/enquiry/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEnquiry(response.data);
      setLoading(false);
    };

    if (user) {
      fetchEnquiry();
    }
  }, [user, id]);

  return (
    <div className="home">
      <div className="enquiries">
        {loading ? (
          <Spinner />
        ) : (
          <EnquiryDetails key={id} enquiry={enquiry} isAdmin={true} />
        )}
      </div>
    </div>
  );
};

export default AdminEnquiryDetailView;
