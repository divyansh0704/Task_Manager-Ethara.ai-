import {createContext,useState} from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children})=>{
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([])
    const [task,setTask] = useState(null)
    return(
        <TaskContext.Provider value={{loading,setLoading,tasks,setTasks,task,setTask}}>
            {children}
        </TaskContext.Provider>
    )
}
    