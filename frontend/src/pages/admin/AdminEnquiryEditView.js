import { useParams } from "react-router-dom";
import AdminEditEnquiryForm from "../../components/admin/AdminEditEnquiryForm";

const AdminEnquiryEditFormView = () => {
  const { id } = useParams();
  return (
      <AdminEditEnquiryForm enquiryID={id} />
  );
};

export default AdminEnquiryEditFormView;
