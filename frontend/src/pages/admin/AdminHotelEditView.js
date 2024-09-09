import { useParams } from "react-router-dom";
import HotelEditForm from "../../components/hotel/HotelEditForm";

const AdminHotelEditFormView = () => {
  const { id } = useParams();
  return (
      <HotelEditForm hotelID={id} isAdmin={true}/>
  );
};

export default AdminHotelEditFormView;
