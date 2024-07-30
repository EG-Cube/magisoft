import { useParams } from "react-router-dom";
import ItineraryEditForm from "../../components/operations/ItineraryEditForm";

const ItineraryEditFormView = () => {
  const { id } = useParams();
  return (
      <ItineraryEditForm itineraryID={id} />
  );
};

export default ItineraryEditFormView;
