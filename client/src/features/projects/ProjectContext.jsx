import {createContext} from "react" 
import { useState,useEffect } from "react";

import React from 'react'

export const ProjectContext = createContext();


export const ProjectProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    //  const [showAddMember,setShowAddMember] = useState(false)
     

  return (
    <ProjectContext.Provider value={{loading,setLoading,projects,setProjects}}>{children}</ProjectContext.Provider>
    
  )
}

