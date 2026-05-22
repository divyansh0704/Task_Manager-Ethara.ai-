import React from 'react'
import {useAuth} from "../hooks/useAuth"

const Dashboard = () => {
    const {loading,handleLogout} = useAuth();

    const handleClick = async () => {
        await handleLogout();
    }
    if(loading){
        return <main><h1>Loading...</h1></main>;
    }
  return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={handleClick}>Logout</button>
    </div>
  )
}

export default Dashboard