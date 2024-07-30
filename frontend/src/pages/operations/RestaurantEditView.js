import { useParams } from "react-router-dom";
import RestaurantEditForm from "../../components/operations/RestaurantEditForm";

const RestaurantEditFormView = () => {
  const { id } = useParams();
  return (
      <RestaurantEditForm siteID={id} />
  );
};

export default RestaurantEditFormView;
