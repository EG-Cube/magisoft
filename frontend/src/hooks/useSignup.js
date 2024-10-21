import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const signup = async (firstName, lastName, country, email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`${API_URL}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, country, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update AuthContext
      dispatch({ type: "LOGIN", payload: json });

      setLoading(false);
    }
  };

  return { signup, loading, error };
};
