import { useParams } from "react-router-dom";
import TransportEditForm from "../../components/operations/TransportEditForm";

const TransportEditFormView = () => {
  const { id } = useParams();
  return (
      <TransportEditForm siteID={id} />
  );
};

export default TransportEditFormView;
