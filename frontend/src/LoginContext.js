import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [helpTasks, setHelpTasks] = useState(null);

  return (
    <LoginContext.Provider
      value={{
        helpTasks,
        setHelpTasks,
        loginState,
        setLoginState,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
