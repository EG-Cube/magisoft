import { useParams } from "react-router-dom";
import TransportEditForm from "../../components/operations/TransportEditForm";

const TransportEditFormView = () => {
  const { id } = useParams();
  return (
    <TransportEditForm transportID={id} />
  );
};

export default TransportEditFormView;
