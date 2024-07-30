import { useParams } from "react-router-dom";
import SiteEditForm from "../../components/operations/SiteEditForm";

const SiteEditFormView = () => {
  const { id } = useParams();
  return (
      <SiteEditForm siteID={id} />
  );
};

export default SiteEditFormView;
