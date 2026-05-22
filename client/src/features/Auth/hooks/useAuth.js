import {useContext,useEffect} from "react"
import { AuthContext } from "../AuthContext"
import {loginUser, registerUser ,getUser,logoutUser,getAllUser} from "../services/authApi"

export const useAuth = ()=>{
    const {user,setUser,loading,setLoading,members,setMembers} = useContext(AuthContext)
    const handleLogin = async({email,password})=>{
        setLoading(true);
        try {
            const data = await loginUser({ email, password });
            setUser(data.user);
            return { success: true };
        } catch (err) {
            console.error("Login failed:", err);
           
            return { success: false, error: err.response?.data?.error || "Login failed" };
        } finally {
            setLoading(false);
        }
    }
    const handleRegister = async ({ name, email, password,role }) => {
        setLoading(true);
        try {
            const data = await registerUser({ name, email, password,role });
            setUser(data.user);
            return { success: true };
        } catch (err) {
            console.error("Registration failed:", err);
            // Return error message for UI feedback
            return { success: false, error: err.response?.data?.error || "Registration failed" };
        } finally {
            setLoading(false);
        }
    }
    const handleLogout = async () => {
        setLoading(true);
        await logoutUser();
        setUser(null);
        setLoading(false);
    }
    const handleGetAllUser = async () => {
        setLoading(true);
        try {
            const data = await getAllUser();
            setMembers(data.users);
            console.log(members)
            
            

        } catch (error) {
            console.error("Error fetching users:", error);
            
        } finally {
            setLoading(false);
        }
    }
    

    useEffect(()=>{
        const getAndSetUser = async() =>{
           
            try {
                const data = await getUser();
                if (data?.user) setUser(data.user);
            } catch (error) {
                
                console.log("Error fetching user:", error.message);
                
            } finally {
                setLoading(false);
            }
        }
        getAndSetUser();
        // handleGetAllUser();
    },[]) 

    return {user,loading,handleLogin,handleRegister,handleLogout,handleGetAllUser,members}
}