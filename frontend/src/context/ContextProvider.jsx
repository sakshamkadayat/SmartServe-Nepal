import { useContext, createContext, useState } from "react";
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

   

     //for getting user 

    return (
        <stateContext.Provider
            value={{
                user,
                settingUser,
                token,
                settingToken,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
