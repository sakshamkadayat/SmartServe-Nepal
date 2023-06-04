import { useContext, createContext ,useState } from "react";
const stateContext = createContext({
    user: null,
    setUser: () => {},
    settingToken: () =>{},
}
);

export const ContextProvider = ({ children }) => {
    const [user,setUser] = useState({});
    // const [token,setToken] = useState(sessionStorage.getItem('access_token'));
    const [token,setToken] = useState(null);

    const settingToken = (token) =>{
        if(token){
            sessionStorage.setItem('access_token');
            setToken(token);
        }else{
            sessionStorage.removeItem('access_token');
        }
    }

    return (
        <stateContext.Provider value={{
            user,
            setUser,
            token,
            settingToken,
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);