import { Link, useNavigate, useParams } from "react-router-dom";
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

    const projectId = projects._id;
    const navigate = useNavigate();

    function deleteProject() {
      api.delete(`/projects/delete-project/${id}`, { projectId });
      navigate("/profile");
      return;
    }

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
            <a href={projects.project} target="_blank" rel="noreferrer"><button>Ver Projeto</button></a>
            <a href={projects.repo} target="_blank" rel="noreferrer"><button>Repo no GitHub</button></a>
          </div>

          <div className="button2">
            <Link to={`/update-project/${id}`}><button id="edit">Editar Projeto</button></Link>
            <button onClick={deleteProject} id="delete">Deletar Projeto</button>
          </div>  

        </div>

        <hr></hr>

        <SFooter>
          <a href="/profile">home</a>
        </SFooter>

      </SContainer>)
}

export default ProjectsPage;

// =========================== STYLES ============================= // 

const SContainer = styled.div`
height: 563px;
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
    border-radius: 5px;
    margin-left: 5px;
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 25px;
  }
}
& #edit {
  border: 1px solid #008037;
  background-color: #008037;
}
& #delete {
  border: 1px solid #FF1616;
  background-color: #FF1616;
}
& hr {
  margin-top: 40px;
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, transparent, #00F6EF, transparent);
}
`
const SFooter = styled.section`
    display: flex;
    justify-content: center;
& a {
    color: #FF004F;
    font-family: 'Gantari';
    text-transform: lowercase;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
}
`
