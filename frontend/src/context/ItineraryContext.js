import { createContext, useReducer } from "react";

export const ItineraryContext = createContext();

export const itineraryReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITINERARIES":
      return {
        itineraries: action.payload,
      };
    case "CREATE_ITINERARY":
      return {
        itineraries: [action.payload, ...state.itineraries],
      };
    case "DELETE_ITINERARY":
      return {
        itineraries: state.itineraries.filter(
          (itinerary) => itinerary._id !== action.payload._id
        ),
      };
    case "UPDATE_ITINERARY":
      return {
        itineraries: state.itineraries.map((itinerary) =>
          itinerary._id === action.payload._id ? action.payload : itinerary
        ),
      };
    default:
      return state;
  }
};

export const ItineraryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itineraryReducer, {
    itineraries: null,
  });

  return (
    <ItineraryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItineraryContext.Provider>
  );
};
