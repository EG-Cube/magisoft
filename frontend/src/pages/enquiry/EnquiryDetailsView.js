import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import EnquiryDetails from "../../components/enquiry/EnquiryDetails";
import { useParams } from "react-router-dom";

const EnquiryDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [enquiry, setEnquiry] = useState();

  useEffect(() => {
    const fetchEnquiry = async () => {
      const response = await axios.get(
        `${API_URL}/api/enquiry/${id}`,
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

export default EnquiryDetailView;
