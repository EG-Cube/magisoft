import RestaurantCreateForm from "../../components/restaurant/RestaurantCreateForm";

const AdminRestaurantCreateView = () => {
  return (
      <RestaurantCreateForm isAdmin={true}/>
  );
};

export default AdminRestaurantCreateView;
