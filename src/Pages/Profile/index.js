import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import {toast} from 'react-toastify'
import styled from "styled-components";
import Fundo from "../Assets/fundo.png"
import Fundo2 from "../Assets/fundo2.png"
import Section4 from "../Assets/fundofooter.png"
import Instagram from "../Assets/2.png"
import Linkedin from "../Assets/1.png"
import GitHub from "../Assets/4.png"
import Whats from "../Assets/3.png"
import LogOut from "../Assets/logout.png"
import Configs from "../Assets/configs.png"
import More from "../Assets/more.png"


export function Profile() {

    const [projects, setProjects] = useState([]);
    const Context = useContext(AuthContext);
    const {loggedInUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [ pageYPosition, setPageYPosition ] = useState(0);

    /* console.log(loggedInUser) */
    
    useEffect (() => {
        async function fetchProjects() {
            const response = await api.get("/projects/projects");
            setProjects(response.data)
            console.log(response.data) 
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
        navigate("/")
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
                <Link to="/profileEdit"><img src={Configs} alt="" id="configs"/></Link>
                <button onClick={handleLogOut}><img src={LogOut} alt="" id="quit"/></button>
                
                 
            </SHeader>

            <h1>Oi, eu sou o {loggedInUser.user.name}! </h1>
            <span className="front">{loggedInUser.user.denomination}</span> <span className="dev">developer</span>

            <div className="gif1">
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </div>
        </SSection1>

        <SSection2>
            <div className="header1">
                <h1> um pouco sobre mim...</h1>
            </div>
            <div>
                    <h2> {loggedInUser.user.name}, {loggedInUser.user.age}</h2>
                    <p>  {loggedInUser.user.description} </p>
                    <h2>Habilidades</h2>
                    <p>{loggedInUser.user.skills}</p>
                    <a href={loggedInUser.user.curriculo} download="curriculo"><button>MEU CURRÍCULO</button></a> <span> - Vamos fazer alguma coisa juntos?</span>
            </div>
            <div>
                <ul>
                    <a href={loggedInUser.user.linkedin}><li><img src={Linkedin} alt=""/></li></a>
                    <a href={loggedInUser.user.instagram}><li><img src={Instagram} alt=""/></li></a>
                    <a target="blank" href={`https://api.whatsapp.com/send?1=pt_BR&phone=55${loggedInUser.user.phone}`}><li><img src={Whats} alt=""/></li></a>
                    <a href={loggedInUser.user.github}><li><img src={GitHub} alt=""/></li></a>
                </ul>
                </div>

            <div className="gif2">
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </div>
        </SSection2>

        <SSection3>
            <div className="header">
                <h1>meus projetos</h1>
                <Link to="/createProject"><img src={More} alt=""/></Link>
            </div>
            <div className="projects">
                { 
                    filteredProjects.map((currentProjects) => {
                        const { name, tags, img, _id : id } = currentProjects;
                    return (
                            <div className="container" key={id}>
                                { tags.includes("FINALIZADO") ? <img src={img} alt="" className="image"/> : null }
                                { tags.includes("EM ANDAMENTO") ? <img src={img} alt="" className="image"/> : null }
                                <div className="middle">
                                    <div className="text">
                                        <h2>{name}</h2>
                                        <Link to={`/projects/${id}`}><h3>ver mais</h3></Link>
                                    </div>
                                </div>
                            </div>
                    )})}
            </div>
            <div className="gif3">
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </div>
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
                    <input id="enviar" type="submit" value="Enviar"/>
                    <input id="limpar" type="reset" value="Limpar"/>
                </form>
            </div>
            <hr></hr>
            
        </SSection4>

        <SFooter>
            { pageYPosition > 900 && <a href="#container">VOLTAR AO TOPO</a> }
        </SFooter>
            
    
    
    </div>

    )
}

export default Profile;


// =========================== STYLES ============================= // 
const SSection1 = styled.div`
//background-image: url(${Fundo});
//background-size: cover;
height: auto;
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
& .gif1 {
    text-align: center;
& img {
    width: 80px;
    margin-top: 98px;
}
}
`;
const SSection2 = styled.div`
//background-image: url(${Fundo2});
//background-size: cover;
height: auto;
& h1 {
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 75px;
    margin-left: 40px;
    margin-bottom: -5px;
    text-decoration: overline;
    text-decoration-color: #FF004F;
}
& h2 {
    font-size: 25px;
    font-family: 'Gantari';
    color: #00F6EF;
    margin-left: 40px;
}
& p {
    width: 850px;
    font-size: 20px;
    font-family: 'Gantari';
    color: #FAEAA7;
    margin-left: 40px;
    margin-top: -10px;
}
& span {
    font-size: 20px;
    font-family: 'Gantari';
    color: #FAEAA7;
    font-style: italic;
}
& button {
    font-size: 20px;
    margin-left: 40px;
    margin-top: 40px;
    font-family: 'Gantari';
    background-color: #FF004F;
    border: 1px solid #FF004F;
    border-radius: 12px;
    color: #FAEAA7;
    cursor: pointer;
}
& ul {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-top: 10px;
    margin-left: -25px;
}
& li {
    list-style-type: none;
}
& img {
    width: 125px;
}
& .gif2 {
    text-align: center;
& img {
    width: 80px;
    margin-top: -58px;
}
}
`;
const SSection3 = styled.div`
//background-image: url(${Fundo2});
//background-size: cover;
height: auto;
& h1 {
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 90px;
    margin-left: 40px;
    margin-bottom: 35px;
    text-decoration: overline;
    text-decoration-color: #00F6EF;
}
& .projects {
    display: grid ;
    grid-template-columns: auto auto auto auto;
    justify-content: start;
    margin-left: 45px;
    gap: 5px;
}
& .container {
  position: relative;
  //width: 50%;
}
& .image {
  opacity: 1;
  display: block;
  width: 320px;
  height: 250px;
  transition: .5s ease;
  backface-visibility: hidden;
}
& .middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  margin-left: 25%;
  line-height: 45px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
& .container:hover .image {
  opacity: 0.3;
}

& .container:hover .middle {
  opacity: 1;
}
& .text {
  color: white;
  font-size: 16px;
  
  margin-left: 160px;
  font-family: 'Mukta';
}
& .text h2 {
    font-size: 50px;
    margin-bottom: -25px;
}
& .text a {
    font-size: 20px;
    text-decoration: none;
    color: #FAEAA7;
}
& .text h3 {
    background-color:#FF004F;
    border-radius: 15px;
}
& .gif3 {
    text-align: center;
    margin-top: 135px;
& img {
    width: 80px;
}
}
& .header {
  display: flex;
  justify-content: space-between;
& img {
  width: 100px;
  margin-top: 90px;
  margin-left: 20px;
  height: 100px;
}
}
`
const SSection4 = styled.div`
//background-image: url(${Section4});
//background-size: auto;
height: auto;
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
    width: 950px;
    color: #FAEAA7;
    font-family: 'Gantari';
    font-style: italic;
    text-align: left;
    font-size: 25px;
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
    margin-top: -15px;
}
& #enviar {
    font-size: 30px;
    margin: 3px;
    margin-top: 18px;
    border: 1px solid #008037;
    background-color: #008037;
    color: #FAEAA7;
    font-family: 'Gantari';
    border-radius: 10px;
    cursor: pointer;
}
& #limpar {
    font-size: 30px;
    margin: 3px;
    margin-top: 18px;
    border: 1px solid #FF1616;
    background-color: #FF1616;
    color: #FAEAA7;
    font-family: 'Gantari';
    border-radius: 10px;
    cursor: pointer;
}

& .form1 input {
    margin: 5px;
    width: 310px;
    height: 50px;
    background-color: #14202E;
    border: 1px solid #14202E;
    padding-left: 10px;
    color: #FAEAA7;
    font-size: 20px;
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
    color: #FAEAA7;
    font-size: 20px;
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
    height: auto;
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
& a {
    text-decoration: none;
}
& button {
    background-color: transparent;
    color: white;
    border: none;
}
& #quit {
    border: none;
    width: 90px;
    margin-right: 50px;
    margin-top: -50px;
    cursor: pointer;

}
& #configs {
    border: none;
    width: 80px;
    margin-left: 850px;
    margin-top: 40px;
    cursor: pointer;
}
`;