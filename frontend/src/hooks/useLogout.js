import { useAuthContext } from "./useAuthContext";
import { useEnquiryContext } from "./useEnquiryContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: itinerariesDispatch } = useEnquiryContext();

  const logout = async (email, password) => {
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    itinerariesDispatch({ type: "SET_ITINERARYS", payload: null });
  };

  return { logout };
};
