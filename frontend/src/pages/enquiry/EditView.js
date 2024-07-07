import { useParams } from "react-router-dom";
import EditEnquiryForm from "../../components/EditEnquiryForm";

const editFormView = () => {
  const { id } = useParams();
  return <EditEnquiryForm enquiryID={id} />;
};

export default editFormView;
