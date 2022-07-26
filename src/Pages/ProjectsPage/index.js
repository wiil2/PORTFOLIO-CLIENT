import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components";


export function ProjectsPage() {

  useEffect(() => {
    async function fetchProjects() {
      const response = await api.get(`/projects/projects/${id}`);
      setProjects(response.data);
      console.log(response.data);
    }
    fetchProjects();
  });


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

export default ProjectsPage;
