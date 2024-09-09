import { useParams } from "react-router-dom";
import SiteEditForm from "../../components/site/SiteEditForm";

const AdminSiteEditFormView = () => {
  const { id } = useParams();
  return (
      <SiteEditForm siteID={id} isAdmin={true}/>
  );
};

export default AdminSiteEditFormView;
