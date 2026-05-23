import {createContext,useState} from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children})=>{
    const [loadingT, setLoadingT] = useState(true);
    const [tasks, setTasks] = useState([])
    const [task,setTask] = useState(null)
    return(
        <TaskContext.Provider value={{loadingT,setLoadingT,tasks,setTasks,task,setTask}}>
            {children}
        </TaskContext.Provider>
    )
}
    