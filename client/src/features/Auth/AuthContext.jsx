import { createContext } from "react";
import { useState,useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [members,setMembers] = useState([])
    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading,members,setMembers}}>
            {children}
        </AuthContext.Provider>
    )
}