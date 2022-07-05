import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import styled from "styled-components";
import Fundo from "../Assets/fundo.png"
import Fundo2 from "../Assets/fundo2.png"
import Fundo3 from "../Assets/fundo3.png"
import Linkedin from "../Assets/linkedin.png"
import Instagram from "../Assets/insta.png"
import GitHub from "../Assets/github.png"
import Whats from "../Assets/wpp.png"

export function Profile() {

    const [projects, setProjects] = useState([]);
    const Context = useContext(AuthContext);
    const {loggedInUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [ pageYPosition, setPageYPosition ] = useState(0);
    
    useEffect (() => {
        async function fetchProjects() {
            const response = await api.get("/projects/all-projects");
            setProjects(response.data) 
        }
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter((elemento) => {
        if(elemento.user !== Context.loggedInUser.user._id) {
            return elemento
        }

    })

    function handleLogOut() {
        localStorage.removeItem("loggedInUser");
        navigate("/login")
    }

    //function handleEdit() {
        //navigate("/userEdit")
    //}

    function getPageYAfterScroll() {
        setPageYPosition(window.scrollY);
    }

    window.addEventListener('scroll', getPageYAfterScroll);
    

    return (
    <div id="container">
        <SSection1>
            <SHeader>
                <div>
                    <img className="photo" src={loggedInUser.user.img} alt="imagem de perfil" />
                </div>

                <ul>
                    <li>Sobre Mim</li>
                    <li>Projetos</li>
                    <li>Contato</li>
                    <button onClick={handleLogOut}>SAIR</button>
                </ul>
            </SHeader>

            <h1>Oi, eu sou o {loggedInUser.user.name}! </h1>
            <span className="front">front end</span> <span className="dev">developer</span>

            <SGif>
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </SGif>
        </SSection1>

        <SSection2>
            <h1> um pouco sobre mim...</h1>
            <p> sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim 
                sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim 
                sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim 
                sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim sobre mim
            </p>
            <SGif>
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </SGif>
        </SSection2>

        <SSection3>
            <h1>meus projetos</h1>
            <div className="projects">
                { 
                    filteredProjects.map((currentProjects) => {
                        const { name, language, tags, img } = currentProjects;
                    return (
                        <>
                            <div>
                                { tags.includes("FINISHED") ? <img src={img} alt=""/> : null }
                                { tags.includes("IN PROGRESS") ? <img src={img} alt=""/> : null }
                                <div>
                                    <h2>{name}</h2>
                                    <h3>{language}</h3>
                                </div>
                            </div>
                        </>
                    )})}
            </div>
            <SGif>
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </SGif>
        </SSection3>

        <SSection4>
            <h1>entre em contato comigo</h1>
            <span className="email">meu email é</span> <span className="dev">{loggedInUser.user.email}</span>
            <p>ou visite alguma das minhas redes abaixo</p>
            <ul>
                <a href="https://www.linkedin.com/in/william-berbet/"><li><img src={Linkedin} alt=""/></li></a>
                <a href="https://www.instagram.com/willnasredes/"><li><img src={Instagram} alt=""/></li></a>
                <a target="_blank" href={`https://api.whatsapp.com/send?1=pt_BR&phone=55${loggedInUser.user.phone}`}><li><img src={Whats} alt=""/></li></a>
                <a href="https://github.com/will10iam"><li><img src={GitHub} alt=""/></li></a>
            </ul>
            <hr></hr>
            
        </SSection4>

        <SFooter>
            { pageYPosition > 900 && <a href="#container">VOLTAR AO TOPO</a> }
            <button onClick={handleLogOut}>SAIR?</button>
        </SFooter>
            
    
    
    </div>

    )
}

export default Profile;


// =========================== STYLES ============================= // 


const SSection1 = styled.div`
//background-image: url(${Fundo});
//background-size: cover;
& .front {
    color: #00F6EF;
    font-family: 'Gantari';
    font-style: italic;
    margin-left: 40px;
    font-size: 35px;
}
& .dev {
    color: #FF004F;
    font-family: 'Gantari';
    font-style: italic;
    margin-left: 5px;
    font-size: 35px;
}
& h1 {
    font-family: 'Mukta';
    color: white;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: -35px;
}
`;

const SSection2 = styled.div`
background-image: url(${Fundo2});
background-size: cover;
& h1 {
    font-family: 'Mukta';
    color: white;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: -35px;
    text-decoration: overline;
    text-decoration-color: #FF004F;
}
& p {
    font-size: 35px;
    font-family: 'Gantari';
    color: white;
    margin-left: 40px;
}
`;

const SSection3 = styled.div`
background-image: url(${Fundo2});
background-size: cover;
& h1 {
    font-family: 'Mukta';
    color: white;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: -35px;
    text-decoration: overline;
    text-decoration-color: #00F6EF;
}

& .projects {
    width: 1000px;
    height: 400px;
}
`
const SSection4 = styled.div`
background-image: url(${Fundo3});
background-size: cover;
height: 700px;
& h1 {
    font-family: 'Mukta';
    color: white;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: 35px;
    text-decoration: overline;
    text-decoration-color: #00F6EF;
}
& span {
    color: white;
    font-size: 50px;
    font-family: 'Gantari';
}
& .email {
    margin-left: 40px;
}
& .dev {
    color: #00F6EF;
    font-family: 'Gantari';
    font-style: italic;
}
& p{
    color: white;
    font-family: 'Gantari';
    font-style: italic;
    text-align: right;
    font-size: 50px;
    margin-right: 25px;
}
& ul {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 85px;
}
& li {
    list-style-type: none;
}
& img {
    width: 200px;
}

& hr {
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, transparent, #00F6EF, transparent);
}
`

const SFooter = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: -60px;
    height: 50px;
& a {
    color: #FF004F;
    font-family: 'Gantari';
    text-transform: lowercase;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
}     

& button {
    background-color: transparent;
    border: none;
    color: #00F6EF;
    font-family: 'Gantari';
    text-transform: lowercase;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
}
`

const SHeader = styled.div`
display: flex;
justify-content: space-between;
& img {
  width: 200px;
  margin-top: 10px;
  margin-left: 20px;
  border-left: solid 3px #FF004F;
  border-right: solid 3px #00F6EF;
  border-radius: 100px;
}
& ul {
    display: flex;
    margin-right: 50px;
    align-items: center;
    margin-top: -35px;
    margin-right: 50px; 
}
& li {
    margin-left: 25px;
    list-style-type: none;
    font-size: 35px;
    font-family: 'Gantari';
    color: white;
    font-style: normal;
    cursor: pointer;
}
& button {
    font-size: 30px;
    margin-left: 25px;
    font-family: 'Gantari';
    background-color: #FF004F;
    border: 1px solid #FF004F;
    border-radius: 12px;
    color: white;
    cursor: pointer;
}
`;

const SGif = styled.div`
 text-align: center;
& img {
    width: 80px;
    margin-top: 50px;
}
`