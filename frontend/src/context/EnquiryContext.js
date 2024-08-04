import { createContext, useReducer } from "react";

export const EnquiryContext = createContext();

export const enquiryReducer = (state, action) => {
  switch (action.type) {
    case "SET_ENQUIRIES":
      return {
        enquiries: action.payload,
      };
    case "CREATE_ENQUIRY":
      return {
        enquiries: [action.payload, ...state.enquiries],
      };
    case "DELETE_ENQUIRY":
      return {
        enquiries: state.enquiries?.filter(
          (enquiry) => enquiry._id !== action.payload._id
        ),
      };
    case "UPDATE_ENQUIRY":
      return {
        enquiries: state.enquiries?.map((enquiry) =>
          enquiry._id === action.payload._id ? action.payload : enquiry
        ),
      };
    default:
      return state;
  }
};

export const EnquiryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(enquiryReducer, {
    enquiries: null,
  });

  return (
    <EnquiryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EnquiryContext.Provider>
  );
};
