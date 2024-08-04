import { useParams } from "react-router-dom";
import EnquiryEditForm from "../../components/enquiry/EnquiryEditForm";

const AdminEnquiryEditFormView = () => {
  const { id } = useParams();
  return (
      <EnquiryEditForm enquiryID={id} isAdmin={true}/>
  );
};

export default AdminEnquiryEditFormView;
