import { useContext, createContext ,useState } from "react";
const stateContext = createContext({
    user: null,
    setUser: () => {},
}
);

export const ContextProvider = ({ children }) => {
    const [user,setUser] = useState({});
    // const [token,setToken] = useState(sessionStorage.getItem('access_token'));
    const [token,setToken] = useState(null);

    return (
        <stateContext.Provider value={{
            user,
            setUser,
            token,
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);