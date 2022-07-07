import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import styled from "styled-components";
import Fundo from "../Assets/fundo.png"
import Fundo2 from "../Assets/fundo2.png"
import Section4 from "../Assets/fundofooter.png"
import Linkedin from "../Assets/linkedin.png"
import Instagram from "../Assets/insta.png"
import GitHub from "../Assets/github.png"
import Whats from "../Assets/wpp.png"
import Edit from "../Assets/edit.png"

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
    console.log(loggedInUser.user)
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
                    <li>Projetos</li>
                    <li>Contato</li>
                </ul>

                <ul>
                    <Link to="/profileEdit"><li>Editar Perfil</li></Link>
                    <button onClick={handleLogOut}>SAIR</button>
                </ul>
            </SHeader>

            <h1>Oi, eu sou o {loggedInUser.user.name}! </h1>
            <span className="front">{loggedInUser.user.denomination}</span> <span className="dev">developer</span>

            <SGif>
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </SGif>
        </SSection1>

        <SSection2>
            <div className="header1">
                <h1> um pouco sobre mim...</h1>
                <img src={Edit} alt=""/>
            </div>
            <div className="middle">
                <div>
                    <h2> {loggedInUser.user.name}, {loggedInUser.user.age}</h2>
                    <p>  {loggedInUser.user.description} </p>
                    <p>Vamos fazer algo legal juntos?</p>
                </div>
                <div className="skills">
                    <h2>Habilidades</h2>
                    <p>{loggedInUser.user.skills}</p>
                    <button>MEU CURRÍCULO</button>
                </div>
            </div>
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

        <SSection4 id="contato">
            <h1>entre em contato comigo</h1>
            <p>Estou interessado em {loggedInUser.user.interests}. Mas se tiver outra solicitação ou pergunta, preenche o formulário abaixo:</p>
            
            <div className="bottom">

                <form action={`https://formsubmit.co/${loggedInUser.user.email}`} method="POST" className="forms">
                    <div className="form1">
                        <input type="text" name="name" placeholder="seu nome"/>
                        <input type="email" name="email" placeholder="seu email"/>
                    </div>
                    <div className="form2">
                        <input type="subject" name="subject" placeholder="qual o assunto?"/>
                    </div>
                    <div className="textarea">
                        <textarea name="message" placeholder="digite aqui sua mensagem"/>
                    </div>
                    <input type="submit" value="Enviar"/>
                    <input type="reset" value="Limpar"/>
                </form>

                <div>
                    <p>VISITE MINHAS REDES SOCIAIS</p>
                    <ul>
                        <a href="https://www.linkedin.com/in/william-berbet/"><li><img src={Linkedin} alt=""/></li></a>
                        <a href="https://www.instagram.com/willnasredes/"><li><img src={Instagram} alt=""/></li></a>
                        <a target="blank" href={`https://api.whatsapp.com/send?1=pt_BR&phone=55${loggedInUser.user.phone}`}><li><img src={Whats} alt=""/></li></a>
                        <a href="https://github.com/will10iam"><li><img src={GitHub} alt=""/></li></a>
                    </ul>
                </div>

            </div>
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
    color: #FAEAA7;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: -35px;
}
`;
const SSection2 = styled.div`
//background-image: url(${Fundo2});
//background-size: cover;

& .header1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

& .header1 img {
    width: 80px;
    height: 80px;
}

& .middle {
    display: flex;
    justify-content: space-between;
}
& .skills {
    margin-right: 75px;
}
& .skills h2 {
    color: #FF004F;
    text-decoration: none;
}
& h1 {
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: -35px;
    text-decoration: overline;
    text-decoration-color: #FF004F;
}
& h2 {
    font-size: 35px;
    font-family: 'Gantari';
    color: #00F6EF;
    margin-left: 40px;
}
& p {
    font-size: 25px;
    font-family: 'Gantari';
    color: #FAEAA7;
    margin-left: 40px;
}
& button {
    font-size: 20px;
    margin-left: 25px;
    font-family: 'Gantari';
    background-color: #FF004F;
    border: 1px solid #FF004F;
    border-radius: 12px;
    color: #FAEAA7;
    cursor: pointer;
}
`;
const SSection3 = styled.div`
//background-image: url(${Fundo2});
//background-size: cover;
& h1 {
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: -35px;
    text-decoration: overline;
    text-decoration-color: #00F6EF;
}
& .projects {
    //width: 1000px;
    //height: 400px;
}
`
const SSection4 = styled.div`
background-image: url(${Section4});
background-size: auto;
height: 600px;
& h1 {
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: -25px;
    text-decoration: overline;
    text-decoration-color: #00F6EF;
}
& p{
    color: #FAEAA7;
    font-family: 'Gantari';
    font-style: italic;
    text-align: left;
    font-size: 20px;
    margin-left: 40px;
    margin-bottom: 75px;
}
& .bottom {
    display: flex;
    justify-content: space-between;
}
& .bottom p {
    text-align: center;
    margin-bottom: -12px;
    font-size: 25px;
}
& .forms {  
    margin-left: 40px;
}
& .forms input {
    font-size: 20px;
    margin: 3px;
    border: 1px solid #FAEAA7;
    background-color: transparent;
    color: #FAEAA7;
    font-family: 'Gantari';
    font-size: 20px;
    border-radius: 15px;


}
& .form1 input {
    margin: 5px;
    width: 310px;
    height: 50px;
    background-color: #14202E;
    border: 1px solid #14202E;
    padding-left: 10px;
    ::placeholder {
      font-size: 17px;
      color: #FAEAA7;
      font-style: italic;
      padding-left: 10px;
      opacity: 0.5;
      font-family: 'Gantari';
    }
}
& .form2 input {
    margin: 5px;
    width: 643px;
    height: 50px;
    background-color: #14202E;
    border: 1px solid #14202E;
    padding-left: 10px;
    ::placeholder {
      font-size: 17px;
      color: #FAEAA7;
      font-style: italic;
      padding-left: 10px;
      opacity: 0.5;
      font-family: 'Gantari';
    }
}
& .textarea textarea {
    margin: 5px;
    resize: none;
    width: 643px;
    height: 150px;
    background-color: #14202E;
    border: 1px solid #14202E;
    border-radius: 15px;
    color: #FAEAA7;
    font-family: 'Gantari';
    font-size: 20px;
    padding-left: 10px;
    ::placeholder {
      font-size: 17px;
      color: #FAEAA7;
      font-style: italic;
      padding-left: 10px;
      opacity: 0.5;
      font-family: 'Gantari';
    }
}
& ul {
    //margin-top: -25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 85px;
}
& li {
    list-style-type: none;
}
& img {
    width: 120px;
}
& hr {
  margin-top: 20px;
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, transparent, #00F6EF, transparent);
}
`
const SFooter = styled.div`
    display: flex;
    justify-content: space-evenly;
    //margin-top: -150px;
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
    color: #FAEAA7;
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
    color: #FAEAA7;
    cursor: pointer;
}
& a {
    text-decoration: none;
}
`;
const SGif = styled.div`
 text-align: center;
& img {
    width: 80px;
    margin-top: 50px;
}
`