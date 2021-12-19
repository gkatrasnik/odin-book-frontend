import React, { useState } from "react";

export const UserContext = React.createContext({ user: "" });

export function UserProvider({ children }) {
  //dummy user, use api jwt token
  const [user, setUser] = useState("");

  const login = (user) => {
    setUser(user);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser("");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
