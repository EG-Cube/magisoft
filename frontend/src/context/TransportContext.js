import { createContext, useReducer } from "react";

export const TransportContext = createContext();

export const transportReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRANSPORTS":
      return {
        transports: action.payload,
      };
    case "CREATE_TRANSPORT":
      return {
        transports: [action.payload, ...state.transports],
      };
    case "DELETE_TRANSPORT":
      return {
        transports: state.transports.filter((transport) => transport._id !== action.payload._id),
      };
    case "UPDATE_TRANSPORT":
      return {
        transports: state.transports.map((transport) =>
          transport._id === action.payload._id ? action.payload : transport
        ),
      };
    default:
      return state;
  }
};

export const TransportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transportReducer, {
    transports: null,
  });

  return (
    <TransportContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TransportContext.Provider>
  );
};
