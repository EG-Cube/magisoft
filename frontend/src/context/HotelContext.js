import { createContext, useReducer } from "react";

export const HotelContext = createContext();

export const hotelReducer = (state, action) => {
  switch (action.type) {
    case "SET_HOTELS":
      return {
        hotels: action.payload,
      };
    case "CREATE_HOTEL":
      return {
        hotels: [action.payload, ...state.hotels],
      };
    case "DELETE_HOTEL":
      return {
        hotels: state.hotels.filter((hotel) => hotel._id !== action.payload._id),
      };
    case "UPDATE_HOTEL":
      return {
        hotels: state.hotels.map((hotel) =>
          hotel._id === action.payload._id ? action.payload : hotel
        ),
      };
    default:
      return state;
  }
};

export const HotelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hotelReducer, {
    hotels: null,
  });

  return (
    <HotelContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HotelContext.Provider>
  );
};
