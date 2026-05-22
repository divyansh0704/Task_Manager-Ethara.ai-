import { getProjects,createProject,addMember } from "../services/projectApi";
import {useContext,useEffect} from "react"
import { ProjectContext } from "../ProjectContext";

export const useProject =()=>{
    const context = useContext(ProjectContext);
    const {loading,setLoading,projects,setProjects} = context;

    const handleGetProjects = async()=>{
        setLoading(true);
        try {
            const data = await getProjects();
            setProjects(data.projects);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
        }
    }
    const handleCreateProject = async({title,description})=>{
        setLoading(true);
        try {
            const data = await createProject({title,description});
            setProjects([...projects,data.project]);
            setLoading(false);
        } catch (error) {
            console.error("Error creating project:", error);
            setLoading(false);
        }
    }
    const handleAddMember = async({projectId,email})=>{
        setLoading(true);
        try{

            const data = await addMember({projectId,email});
            // setProjects([...projects,data.project]);
            setLoading(false);


        }catch(error){
            console.error("Error adding member:",error);
            setLoading(false);

        }

    }
    useEffect(()=>{
        
        handleGetProjects();

        
        
    },[])

    return{loading,projects,handleCreateProject,handleAddMember};
}