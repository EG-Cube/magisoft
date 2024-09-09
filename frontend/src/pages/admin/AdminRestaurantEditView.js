import { useParams } from "react-router-dom";
import RestaurantEditForm from "../../components/restaurant/RestaurantEditForm";

const AdminRestaurantEditFormView = () => {
  const { id } = useParams();
  return (
      <RestaurantEditForm restaurantID={id} isAdmin={true}/>
  );
};

export default AdminRestaurantEditFormView;
