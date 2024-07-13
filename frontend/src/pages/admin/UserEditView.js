import { useParams } from "react-router-dom";
import EditUserForm from "../../components/user/EditUserForm";

const EditFormView = () => {
  const { id } = useParams();
  return (
      <EditUserForm adminID={id} />
  );
};

export default EditFormView;
