import { useParams } from "react-router-dom";
import HotelEditForm from "../../components/operations/HotelEditForm";

const HotelEditFormView = () => {
  const { id } = useParams();
  return <HotelEditForm hotelID={id} />; // Updated prop name
};

export default HotelEditFormView;
