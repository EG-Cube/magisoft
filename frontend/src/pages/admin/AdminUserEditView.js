import { useParams } from "react-router-dom";
import EditUserForm from "../../components/user/EditUserForm";

const AdminUserEditFormView = () => {
  const { id } = useParams();
  return (
      <EditUserForm userID={id} />
  );
};

export default AdminUserEditFormView;
