import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";
const stateContext = createContext({
    user: null,
    token: null,
    settingToken: () => {},
    settingUser: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [token, setToken] = useState(sessionStorage.getItem("access_token"));
    // const [token,setToken] = useState(null);

    const settingToken = (token) => {
        setToken(token);
        if (token) {
            sessionStorage.setItem("access_token", token);
        } else {
            sessionStorage.removeItem("access_token");
        }
    };

    const settingUser = (user) => {
        setUser(user);
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
        else {
            sessionStorage.removeItem("user");
        } 
    };

    //toast
     const handleSuccess = (msg) => {
         // API call is successful
         toast.success(msg, {
             position: toast.POSITION.TOP_RIGHT,
         });
     };
     const handleError = (msg) => {
         // API call resulted in an error
         toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
     };

    return (
        <stateContext.Provider
            value={{
                user,
                settingUser,
                token,
                settingToken,
                handleSuccess,
                handleError,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
