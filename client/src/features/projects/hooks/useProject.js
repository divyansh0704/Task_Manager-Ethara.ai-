import { getProjects,createProject,addMember } from "../services/projectApi";
import {useContext,useEffect} from "react"
import { ProjectContext } from "../ProjectContext";

export const useProject =()=>{
    const context = useContext(ProjectContext);
    const {loadingP,setLoadingP,projects,setProjects} = context;

    const handleGetProjects = async()=>{
        setLoadingP(true);
        try {
            const data = await getProjects();
            setProjects(data.projects);
            setLoadingP(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoadingP(false);
        }
    }
    const handleCreateProject = async({title,description})=>{
        setLoadingP(true);
        try {
            const data = await createProject({title,description});
            setProjects([...projects,data.project]);
            setLoadingP(false);
        } catch (error) {
            console.error("Error creating project:", error);
            setLoadingP(false);
        }
    }
    const handleAddMember = async({projectId,email})=>{
        setLoadingP(true);
        try{

            const data = await addMember({projectId,email});
            // setProjects([...projects,data.project]);
            setLoadingP(false);


        }catch(error){
            console.error("Error adding member:",error);
            setLoadingP(false);

        }

    }
    useEffect(()=>{
        
        handleGetProjects();

        
        
    },[])

    return{loadingP,projects,handleCreateProject,handleAddMember};
}