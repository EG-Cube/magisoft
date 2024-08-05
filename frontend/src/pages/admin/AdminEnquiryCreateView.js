import EnquiryCreateForm from "../../components/enquiry/EnquiryCreateForm";

const AdminEnquiryCreateView = () => {
  return (
      <EnquiryCreateForm isAdmin={true}/>
  );
};

export default AdminEnquiryCreateView;
