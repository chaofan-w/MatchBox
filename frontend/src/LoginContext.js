import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(null);
  const [helpTasks, setHelpTasks] = useState(null);
  // const [showNotification, setShowNotification] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        helpTasks,
        setHelpTasks,
        loginState,
        setLoginState,
        // showNotification,
        // setShowNotification,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
