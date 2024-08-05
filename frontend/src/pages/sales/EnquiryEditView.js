import { useParams } from "react-router-dom";
import EnquiryEditForm from "../../components/enquiry/EnquiryEditForm";

const EnquiryEditFormView = () => {
  const { id } = useParams();
  return (
      <EnquiryEditForm enquiryID={id} />
  );
};

export default EnquiryEditFormView;
