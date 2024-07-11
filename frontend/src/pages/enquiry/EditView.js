import { useParams } from "react-router-dom";
import EditEnquiryForm from "../../components/EditEnquiryForm";
import DashboardLayout from "../../components/DashboardLayout";

const EditFormView = () => {
  const { id } = useParams();
  return (
    <DashboardLayout>
      <EditEnquiryForm enquiryID={id} />
    </DashboardLayout>
  );
};

export default EditFormView;
