import { useParams } from "react-router-dom";
import ItineraryEditForm from "../../components/itinerary/ItineraryEditForm";

const AdminItineraryEditFormView = () => {
  const { id } = useParams();
  return (
      <ItineraryEditForm itineraryID={id} isAdmin={true}/>
  );
};

export default AdminItineraryEditFormView;
