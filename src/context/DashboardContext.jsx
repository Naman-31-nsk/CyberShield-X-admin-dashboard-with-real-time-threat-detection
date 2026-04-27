/* src/context/DashboardContext.jsx
   Wraps the whole app so every component can read dashboard state
   without prop-drilling.
*/
import React, { createContext, useContext } from "react";
import useDashboard from "../hooks/useDashboard";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const value = useDashboard();
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardCtx = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboardCtx must be used inside <DashboardProvider>");
  return ctx;
};
