import ItineraryCreateForm from "../../components/itinerary/ItineraryCreateForm";

const AdminItineraryCreateView = () => {
  return (
      <ItineraryCreateForm isAdmin={true}/>
  );
};

export default AdminItineraryCreateView;
