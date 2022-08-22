import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/authContext";


export function ProjectsPage() {
    const navigate = useNavigate();
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
    const { loggedInUser } = useContext(AuthContext)
    

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

          { loggedInUser ? 
          (<div className="button2">
            <Link to={`/update-project/${id}`}><button id="edit">Editar Projeto</button></Link>
            <button onClick={deleteProject} id="delete">Deletar Projeto</button>
          </div>) : null }

        </div>

        <hr></hr>

        <SFooter>
          <a href="/profile">página inicial</a>
        </SFooter>

      </SContainer>)
}

export default ProjectsPage;

// =========================== STYLES ============================= // 

const SContainer = styled.div`
height: auto;
& .title {
    font-family: "Montserrat";
    color: #FAEAA7;
    font-size: 40px;
    margin-left: 40px;
    margin-top: -15px;
}
& .middle {
  display: flex; 
  margin-left: 40px;
  margin-top: -55px;
  justify-content: space-between;
}
& h2 {
  width: 650px;
  font-family: "Montserrat";
  color: #FAEAA7;
  font-weight: 200;
}
& span {
  font-style: italic;
  font-weight: bold;
}
& img {
  width: 490px;
  margin-right: 100px;
  margin-top: -10px;
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
    font-family: "Montserrat";
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
    font-family: "Montserrat";
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
  margin-top: 109px;
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, transparent, #00F6EF, transparent);
}
`
const SFooter = styled.section`
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
& a {
    color: #FAEAA7;
    font-family: 'Gantari';
    text-transform: lowercase;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    
}
`
