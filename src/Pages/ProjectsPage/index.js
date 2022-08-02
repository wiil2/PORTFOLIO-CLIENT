import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import styled from "styled-components";


export function ProjectsPage() {
    const [projects, setProjects] = useState({});
    const { id }= useParams();

    useEffect(() => {
      async function fetchProjects() {
        const response = await api.get(`/projects/projects/${id}`)
        const [ project ] = response.data
        setProjects(project)
        console.log(response.data)
        // verificar se há algum erro
      }
      fetchProjects();
      
    }, [id])


    return (
      <SContainer>

        <div className="title">
          <h1>{projects.name}</h1>
        </div>

        <div className="middle">
          <div>
            <h2>{projects.description}</h2>
            <h2>Nesse projeto eu usei as linguagens <span>{projects.language}</span></h2>
            <h2>Este projeto está <span>{projects.tags}</span></h2>
          </div>

          <div>
            <img src={projects.img} alt={projects.name}/> 
          </div>
        </div>

        <div className="footer">

          <div className="button1">
            <button>Ver Projeto</button>
            <button>Repo no GitHub</button>
          </div>

          <div className="button2">
            <Link to={`/update-project/${id}`}><button>Editar Projeto</button></Link>
            <button>Deletar Projeto</button>
          </div>  

        </div>

      </SContainer>)
}

export default ProjectsPage;

// =========================== STYLES ============================= // 

const SContainer = styled.div`
height: auto;

& .title {
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 40px;
    margin-left: 40px;
    margin-bottom: 35px;
    text-decoration: overline;
    text-decoration-color: #00F6EF;
}
& .middle {
  display: flex; 
  margin-left: 40px;
  margin-top: -35px;
  justify-content: space-between;
}
& h2 {
  width: 650px;
  font-family: 'Mukta';
  color: #FAEAA7;
}
& span {
  font-style: italic;
  font-weight: 200;
}
& img {
  width: 480px;
  margin-right: 120px;
  margin-top: -120px;
}
& .footer {
  display: flex;
  justify-content: space-between;
}
& .button1 {
  margin-left: 33px;
  margin-top: 5px;
  & button {
    border: #0D3057;
    border-radius: 5px;
    background-color: #0D3057;
    margin-left: 5px;
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 25px;
  }
}
& .button2 {
  margin-right: 199px;
  margin-top: 15px;
  & button {
    border: #0D3057;
    border-radius: 5px;
    background-color: #0D3057;
    margin-left: 5px;
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 25px;
  }
}
`
