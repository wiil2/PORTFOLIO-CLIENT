import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import styled from "styled-components";


export function ProjectsPage() {
    const [projects, setProjects] = useState({});
    const { _id }= useParams();

    useEffect(() => {
      async function fetchProjects() {
        const response = await api.get(`/projects/projects/${_id}`)
        setProjects(response.data)
        console.log(response.data)
      }
      fetchProjects();
      
    }, [_id])


    return (<><h1>PROJETOS</h1></>)
}

export default ProjectsPage;
