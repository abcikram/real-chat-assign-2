import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isregisterLoading, setIsRegisterLoading] = useState(false);


  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [loginError, setLoginError] = useState(null);
  const [isloginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  console.log("User",user);
  console.log("loginInfo",loginInfo)

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);


  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);




  // create a function to able to register user
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true); //

      setRegisterError(null); // amara akane setRegisterError ke null kore dilam, jodi error thake tahole
      //amara if(response.error) diye handle korbo

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      ); // this is the first parameter of post request

      setIsRegisterLoading(false); // after compleating the request loading will stop

      //if response.error is exist
      if (response.error) {
        return setRegisterError(response);
      }

      //save the user to local stroage, amara localstroage a data save kore rakhlam jate bar bar login korte na hoy
      localStorage.setItem("User", JSON.stringify(response));
      //if not error tokon amara setUser ar modhey  response diye dibo
      setUser(response);
    },
    [registerInfo]
  );




  const loginUser = useCallback(async (e) => {
    e.preventDefault();

    setIsLoginLoading(true);
    setLoginError(null);

    const response = await postRequest(
      `${baseUrl}/users/login`,
      JSON.stringify(loginInfo)
    );
    if (response.error) {
      return setLoginError(response);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [loginInfo]);



  //logout user, when the user want to logout
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null)
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isregisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isloginLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
