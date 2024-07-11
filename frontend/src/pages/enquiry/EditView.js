import { useParams } from "react-router-dom";
import EditEnquiryForm from "../../components/EditEnquiryForm";

const EditFormView = () => {
  const { id } = useParams();
  return (
      <EditEnquiryForm enquiryID={id} />
  );
};

export default EditFormView;
