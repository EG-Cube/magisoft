import HotelCreateForm from "../../components/hotel/HotelCreateForm";

const AdminHotelCreateView = () => {
  return (
      <HotelCreateForm isAdmin={true}/>
  );
};

export default AdminHotelCreateView;
