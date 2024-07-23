import { useParams } from "react-router-dom";
import EditSiteForm from "../../components/operations/EditSiteForm";

const SiteEditFormView = () => {
  const { id } = useParams();
  return (
      <EditSiteForm siteID={id} />
  );
};

export default SiteEditFormView;
