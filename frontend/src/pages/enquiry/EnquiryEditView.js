import { useParams } from "react-router-dom";
import EditEnquiryForm from "../../components/enquiry/EditEnquiryForm";

const EnquiryEditFormView = () => {
  const { id } = useParams();
  return (
      <EditEnquiryForm enquiryID={id} />
  );
};

export default EnquiryEditFormView;
