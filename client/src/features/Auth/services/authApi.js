import axios from "axios"

const api = axios.create({
    baseURL:"https://taskmanager-etharaai-production.up.railway.app/api",
    withCredentials:true
})

export const registerUser = async({name,email,password,role})=>{
    try{
        const response = await api.post("/auth/register",{
            name,
            email,
            password,
            role
        })
        return response.data
    }catch(error){
        console.error("Error registering user",error)
        throw error;
    }
}

export const loginUser = async ({email,password}) => {
    try{
        const response = await api.post("/auth/login",
            {email,password}
        );
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
    
}
export const logoutUser = async () => {
    try{
        const response = await api.get("/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
    
}

export const getUser = async () => {
    try{
        const response = await api.get("/auth/me");
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
    
}

export const getAllUser = async () => {
    try{
        const response = await api.get("/auth/alluser");
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}
