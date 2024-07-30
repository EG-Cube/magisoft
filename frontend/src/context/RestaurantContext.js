import { createContext, useReducer } from "react";

export const RestaurantContext = createContext();

export const restaurantReducer = (state, action) => {
  switch (action.type) {
    case "SET_RESTAURANTS":
      return {
        restaurants: action.payload,
      };
    case "CREATE_RESTAURANT":
      return {
        restaurants: [action.payload, ...state.restaurants],
      };
    case "DELETE_RESTAURANT":
      return {
        restaurants: state.restaurants.filter((restaurant) => restaurant._id !== action.payload._id),
      };
    case "UPDATE_RESTAURANT":
      return {
        restaurants: state.restaurants.map((restaurant) =>
          restaurant._id === action.payload._id ? action.payload : restaurant
        ),
      };
    default:
      return state;
  }
};

export const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, {
    restaurants: null,
  });

  return (
    <RestaurantContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
};
