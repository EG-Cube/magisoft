import TransportCreateForm from "../../components/transport/TransportCreateForm";

const AdminTransportCreateView = () => {
  return (
      <TransportCreateForm isAdmin={true}/>
  );
};

export default AdminTransportCreateView;
