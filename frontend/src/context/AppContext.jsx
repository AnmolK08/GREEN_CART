import { createContext , useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{
    const navgate = useNavigate();
    const [user, setuser] = useState(null);
    const [isSeller, setisSeller] = useState(null);

    const value = {navigate , user , setuser , isSeller , setisSeller};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppcontext = ()=>{
    return useContext(AppContext);
}