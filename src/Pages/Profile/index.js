import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import styled from "styled-components";
import Fundo from "../Assets/fundo.png"
import Fundo2 from "../Assets/fundo2.png"
import Section4 from "../Assets/fundofooter.png"
import Instagram from "../Assets/insta.png"
import Linkedin from "../Assets/linkedin.png"
import GitHub from "../Assets/github.png"
import Whats from "../Assets/wpp.png"



export function Profile() {

    const [projects, setProjects] = useState([]);
    const Context = useContext(AuthContext);
    const {loggedInUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [ pageYPosition, setPageYPosition ] = useState(0);

    console.log(loggedInUser)
    
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

                <div className="checkbox-wrapper">
                    <input type="checkbox" id="toggle"/>
                    <label class="checkbox" for="toggle">
                        <div class="trace"></div>
                        <div class="trace"></div>
                        <div class="trace"></div>
                    </label>
                </div>

                <div className="menu">
                    <div className="menu-itens">
                        <ul>
                            <li>Projetos</li>
                            <Link to="/profileEdit"><li>Editar Perfil</li></Link>
                            <button onClick={handleLogOut}>SAIR</button>
                        </ul>
                </div>

                </div>
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
            <h1>meus projetos</h1>
            <div className="projects">
                { 
                    filteredProjects.map((currentProjects) => {
                        const { name, tags, img } = currentProjects;
                    return (
                        <>
                            <div className="image">
                                { tags.includes("FINISHED") ? <img src={img} alt=""/> : null }
                                { tags.includes("IN PROGRESS") ? <img src={img} alt=""/> : null }
                                <div className="overlay">
                                    <h2>{name}</h2>
                                    <h3>ver mais</h3>
                                </div>
                            </div>
                        </>
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
                    <input type="submit" value="Enviar"/>
                    <input type="reset" value="Limpar"/>
                </form>
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
height: 600px;
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
height: 550px;
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
    width: 120px;
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
height: 600px;
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
    display: grid ;
    grid-template-columns: auto auto auto;
    justify-content: start;
    margin-left: 45px;
    gap: 5px;
}
& .image {
    margin-top: 80px;
    position: relative;
}
& .image img {
    width: 330px;
    height: 210px;
    opacity: 0.5;
}
& .overlay {
    position: absolute;
    bottom: 45px;
    color: #f1f1f1;
    width: 270px;
    transition: .5s ease;
    opacity:0;
    color: white;
    text-align: center;
    font-family: 'Mukta';
}
& .overlay h2 {
    font-size: 35px;
    margin-left: 47px;
    margin-bottom: -25px;
}
& .overlay h3 {
    font-style: italic;
    margin-left: 47px;
    font-weight: 100;
}
& .image:hover .overlay {
    opacity: 1;
}
& .gif3 {
    text-align: center;
& img {
    width: 80px;
}
}
`
const SSection4 = styled.div`
//background-image: url(${Section4});
//background-size: auto;
height: 680px;
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
& .checkbox {
    height: 100px ;
    width: 100px;
    position: absolute;
    right: 0;
    //top: 0;
    display: flex;
    justify-content: center;
    cursor: pointer;
    z-index: 9999;
    transition: 400ms ease-in-out;
}
& .checkbox .trace {
    width: 50px;
    height: 2px;
    background-color: #FFFFFF;
    position: absolute;
    border-radius: 4px;
    transition: 0.5s ease-in-out;

}
& .checkbox .trace:nth-child(1) {
    top: 26px;
    transform: rotate(0);
}

& .checkbox .trace:nth-child(2) {
    top: 46px;
    transform: rotate(0);
}

& .checkbox .trace:nth-child(3) {
    top: 66px;
    transform: rotate(0);
}
& #toggle {
    display: none;
}
& .menu {
    position: absolute ;
    //top:28px ;
    right:30px ;
    background-color: transparent;
    height:4px ;
    width:10px ;
    border-radius: 50%;
    box-shadow: 0px 0px 0px 0px #FFFFFF;
    z-index: -1;
    transition: 400ms ease-in-out 0s;

}
& .menu-itens {
    position: fixed;
    //top: 0;
    left:0 ;
    width: 100px ;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -2;
    //opacity: 1;
    visibility:hidden ;
    transition: 400ms ease-in-out 0s;
}
& .menu-itens ul {
    list-style-type: none;
}
& .menu-itens li {  
    color: white;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-size: 15px;
}
& #toggle:checked + .checkbox .trace:nth-child(1) {
    transform: rotate(45deg);
    top: 47px;
}
& #toggle:checked + .checkbox .trace:nth-child(2) {
    transform: translate(-100px);
    height: 30px;
    visibility: hidden;
    opacity: 0;
}
& #toggle:checked + .checkbox .trace:nth-child(3) {
    transform: rotate(-45deg);
    top: 48px;
}
& #toggle:checked ~ .menu {
    box-shadow: 0px 0px 0px 100vmax white;
    z-index: -1;

}
& #toggle:checked ~ .menu-itens {
    visibility: visible;
    opacity: 1;
    font-weight: bold;
}
`;