import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(null);
  const [helpTasks, setHelpTasks] = useState(null);
  const [showInBox, setShowInBox] = useState(false);
  // const [showNotification, setShowNotification] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        helpTasks,
        setHelpTasks,
        loginState,
        setLoginState,
        showInBox,
        setShowInBox,
        // showNotification,
        // setShowNotification,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
