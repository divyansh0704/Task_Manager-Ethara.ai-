import { useAuth } from "../../features/Auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from 'react'

const Protected = ({children}) => {
    const {loading,user} = useAuth();
    
    if(loading){
        return <main><h1>Loading...</h1></main>
    }
    // console.log(user);
    if(!user){
        return <Navigate to="/login" />
    }
  return children
}

export default Protected