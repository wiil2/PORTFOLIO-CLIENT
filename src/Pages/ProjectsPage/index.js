import {useParams} from "react-router-dom";
import {api} from "../../api/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components";


export function ProjectPage() {

    const [projects, setProjects] = useState([]);
    const {loggedInUser} = useContext(AuthContext);
    //const navigate = useNavigate();
    const { id } = useParams();


    useEffect (() => {
        async function fetchProjects() {
            const response = await api.get(`/projects/${id}`);
            setProjects(response.data);
            console.log(response.data);
        }
        fetchProjects();
    }); 


    return ( 
        <>
            <h1>PROJETOS</h1>
        
        
        
        </>



    )
}

export default ProjectPage;