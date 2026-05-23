import {useContext,useEffect} from "react"
import { TaskContext } from "../TaskContext";
import { createTask, getTasks ,getTask,updateTask} from "../services/taskApi";


export const useTask = () => {
    const context = useContext(TaskContext);
    const {loadingT,setLoadingT,tasks,setTasks,task,setTask} = context;

    const handleCreateTask = async({title,description,project,assignedTo,dueDate,priority})=>{
        setLoadingT(true);
        try {
            const data = await createTask({title,description,project,assignedTo,dueDate,priority});
            setTasks([...tasks,data.task]);
            setLoadingT(false);
        } catch (error) {
            console.error("Error creating project:", error);
            setLoadingT(false);
        }
    }
    const handleGetTasks = async()=>{
        setLoadingT(true);
        try {
            const data = await getTasks();
            setTasks(data.tasks);
            setLoadingT(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoadingT(false);
        }
    }
    const handleGetTask = async(taskId)=>{
        setLoadingT(true);
        try {
            const data = await getTask(taskId);
            setTask(data.task);
            setLoadingT(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoadingT(false);
        }
    }
    const handleUpdateTask = async(taskId,updatedData)=>{
        // setLoadingT(true);
        try {
            const data = await updateTask(taskId,updatedData);
            setTask(data.task);
            setLoadingT(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoadingT(false);
        }
    }

    useEffect(()=>{
        handleGetTasks();
    },[])

    return {handleCreateTask,loadingT,tasks,task,handleGetTask,handleUpdateTask}
}