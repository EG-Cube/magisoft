import { useParams } from "react-router-dom";
import EditEnquiryForm from "../../components/enquiry/EditEnquiryForm";

const AdminUserEditFormView = () => {
  const { id } = useParams();
  return (
      <EditEnquiryForm enquiryID={id} />
  );
};

export default AdminUserEditFormView;
