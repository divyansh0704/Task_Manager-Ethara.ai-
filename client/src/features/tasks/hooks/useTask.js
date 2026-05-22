import {useContext,useEffect} from "react"
import { TaskContext } from "../TaskContext";
import { createTask, getTasks ,getTask,updateTask} from "../services/taskApi";


export const useTask = () => {
    const context = useContext(TaskContext);
    const {loading,setLoading,tasks,setTasks,task,setTask} = context;

    const handleCreateTask = async({title,description,project,assignedTo,dueDate,priority})=>{
        setLoading(true);
        try {
            const data = await createTask({title,description,project,assignedTo,dueDate,priority});
            setTasks([...tasks,data.task]);
            setLoading(false);
        } catch (error) {
            console.error("Error creating project:", error);
            setLoading(false);
        }
    }
    const handleGetTasks = async()=>{
        setLoading(true);
        try {
            const data = await getTasks();
            setTasks(data.tasks);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
        }
    }
    const handleGetTask = async(taskId)=>{
        setLoading(true);
        try {
            const data = await getTask(taskId);
            setTask(data.task);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
        }
    }
    const handleUpdateTask = async(taskId,updatedData)=>{
        setLoading(true);
        try {
            const data = await updateTask(taskId,updatedData);
            setTask(data.task);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        handleGetTasks();
    },[])

    return {handleCreateTask,loading,tasks,task,handleGetTask,handleUpdateTask}
}