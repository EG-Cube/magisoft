import { useParams } from "react-router-dom";
import TransportEditForm from "../../components/transport/TransportEditForm";

const AdminTransportEditFormView = () => {
  const { id } = useParams();
  return (
      <TransportEditForm transportID={id} isAdmin={true}/>
  );
};

export default AdminTransportEditFormView;
