import axios from "axios";

const api = axios.create({
    baseURL: "https://taskmanager-etharaai-production.up.railway.app/api",
    withCredentials: true
});




export const getProjects = async () => {
    try {

        const response = await api.get("/project");

        return response.data;

    } catch (error) {

        console.error("Error fetching projects:", error);

        throw error;
    }
};

export const getProject = async (projectId) => {
    try {

        const response = await api.get(`/project/${projectId}`);

        return response.data;

    } catch (error) {

        console.error("Error fetching project:", error);

        throw error;
    }
};

export const createProject = async ({
    title,
    description
}) => {
    try {

        const response = await api.post("/project/create", {
            title,
            description
        });

        return response.data;

    } catch (error) {

        console.error("Error creating project:", error);

        throw error;
    }
};



// UPDATE PROJECT
export const updateProject = async (
   { projectId,
    updatedData}
) => {
    try {

        const response = await api.put(
            `/project/${projectId}`,
            updatedData
        );

        return response.data;

    } catch (error) {

        console.error("Error updating project:", error);

        throw error;
    }
};



// DELETE PROJECT
export const deleteProject = async (projectId) => {
    try {

        const response = await api.delete(
            `/project/${projectId}`
        );

        return response.data;

    } catch (error) {

        console.error("Error deleting project:", error);

        throw error;
    }
};



// ADD MEMBER TO PROJECT
export const addMember = async ({projectId,email}) => {
    try {

        const response = await api.post(
            `/project/${projectId}/members`,
            { email }
        );

        return response.data;

    } catch (error) {

        console.error("Error adding member:", error);

        throw error;
    }
};