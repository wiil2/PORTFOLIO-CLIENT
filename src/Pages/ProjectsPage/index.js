import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import styled from "styled-components";


export function ProjectsPage() {
    const [projects, setProjects] = useState({});
    const { id } = useParams();

    useEffect(() => {
      async function fetchProjects() {
        const response = await api.get(`/projects/projects/${id}`)
        setProjects(response.data)
        console.log(response.data)
      }
      fetchProjects();
      
    }, [id])


    return (<><h1>PROJETOS</h1></>)
}

export default ProjectsPage;
