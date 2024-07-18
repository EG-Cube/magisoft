import { useParams } from "react-router-dom";
import EditSiteForm from "../../components/site/EditSiteForm";

const SiteEditFormView = () => {
  const { id } = useParams();
  return (
      <EditSiteForm siteID={id} />
  );
};

export default SiteEditFormView;
