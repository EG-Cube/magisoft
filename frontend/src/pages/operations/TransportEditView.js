import { useParams } from "react-router-dom";
import TransportEditForm from "../../components/transport/TransportEditForm";

const TransportEditFormView = () => {
  const { id } = useParams();
  return (
    <TransportEditForm transportID={id} />
  );
};

export default TransportEditFormView;
