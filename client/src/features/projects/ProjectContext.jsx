import {createContext} from "react" 
import { useState,useEffect } from "react";

import React from 'react'

export const ProjectContext = createContext();


export const ProjectProvider = ({children}) => {
    const [loadingP, setLoadingP] = useState(false);
    const [projects, setProjects] = useState([]);
    //  const [showAddMember,setShowAddMember] = useState(false)
     

  return (
    <ProjectContext.Provider value={{loadingP,setLoadingP,projects,setProjects}}>{children}</ProjectContext.Provider>
    
  )
}

