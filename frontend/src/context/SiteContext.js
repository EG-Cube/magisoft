import { createContext, useReducer } from "react";

export const SiteContext = createContext();

export const siteReducer = (state, action) => {
  switch (action.type) {
    case "SET_SITES":
      return {
        sites: action.payload,
      };
    case "CREATE_SITE":
      return {
        sites: [action.payload, ...state.sites],
      };
    case "DELETE_SITE":
      return {
        sites: state.sites.filter((site) => site._id !== action.payload._id),
      };
    case "UPDATE_SITE":
      return {
        sites: state.sites.map((site) =>
          site._id === action.payload._id ? action.payload : site
        ),
      };
    default:
      return state;
  }
};

export const SiteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(siteReducer, {
    sites: null,
  });

  return (
    <SiteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SiteContext.Provider>
  );
};
