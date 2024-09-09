import SiteCreateForm from "../../components/site/SiteCreateForm";

const AdminSiteCreateView = () => {
  return (
      <SiteCreateForm isAdmin={true}/>
  );
};

export default AdminSiteCreateView;
