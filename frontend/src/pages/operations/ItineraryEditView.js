import { useParams } from "react-router-dom";
import ItineraryEditForm from "../../components/itinerary/ItineraryEditForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const ItineraryEditFormView = () => {
  const { user } = useAuthContext();

  return <ItineraryEditForm />;
};

export default ItineraryEditFormView;
