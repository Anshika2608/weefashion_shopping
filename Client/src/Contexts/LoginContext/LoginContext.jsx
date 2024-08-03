// LoginContext.js
import React, { createContext, useState } from 'react';
import axios from "axios"
const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null);
 const url="http://localhost:5000"
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    try {
      
      const res = await fetch(`${url}/api/validUser/validuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      const data = await res.json();
      setLoginData(data);
      
    } catch (error) {
      console.log("Error:", error);
    } 
  }
  return (
    <LoginContext.Provider value={{ loginData,setLoginData,DashboardValid}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
