import { useState, useEffect, createContext } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Create the wrapper function
function AuthProviderWrapper(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  //const [loggedIn, setLoggedIn] = useState(false);

  // function to store the token
  const storeToken = token => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    // Check if there's a token on localstorage
    // we either get the token or null
    const storedToken = localStorage.getItem("authToken");

    // if there's a token we call /verify on the API

    if (storedToken) {
      try {
        setLoading(true);
        // on a get request the second argument is a configuration/options object, NOT the req.body
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        setUser(response.data);
        /* 
        {
        _id: '2324',
        username,
        email,
        profilePic
        }
        */
        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, user, storeToken, authenticateUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
