import axios from "axios";

const api = axios.create({
    baseURL: "https://task-manager-ethara-ai-yor6.onrender.com/api",
    withCredentials: true
});




export const createTask = async ({title,description,project,assignedTo,dueDate,priority}) => {

    try {

        const response = await api.post(
            "/task",
            {
                title,
                description,
                project,
                assignedTo,
                dueDate,
                priority
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error creating task:",
            error
        );

        throw error;
    }
};




export const getTasks = async () => {

    try {

        const response = await api.get(
            "/task"
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching tasks:",
            error
        );

        throw error;
    }
};




export const getTask = async (taskId) => {

    try {

        const response = await api.get(
            `/task/${taskId}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching task:",
            error
        );

        throw error;
    }
};



export const updateTask = async (taskId,updatedData) => {

    try {

        const response = await api.put(
            `/task/${taskId}`,
            updatedData
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error updating task:",
            error
        );

        throw error;
    }
};




export const deleteTask = async (taskId) => {

    try {

        const response = await api.delete(
            `/task/${taskId}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error deleting task:",
            error
        );

        throw error;
    }
};