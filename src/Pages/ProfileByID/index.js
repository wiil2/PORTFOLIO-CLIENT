import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { toast } from 'react-toastify'
import styled from "styled-components";
import Fundo2 from "../Assets/fundo2.png"
import Section4 from "../Assets/fundofooter.png"
import Instagram from "../Assets/2.png"
import Linkedin from "../Assets/1.png"
import GitHub from "../Assets/4.png"
import Whats from "../Assets/3.png"
import LogOut from "../Assets/logout.png"
import Configs from "../Assets/configs.png"
import More from "../Assets/more.png"
import Video from "../Assets/bg-video.mp4"


export function ProfileByID() {

    const navigate = useNavigate();
    const [pageYPosition, setPageYPosition] = useState(0);
    const { id } = useParams();
    const [loggedInUser, setLoggedInUser] = useState({});

    console.log("console dos projetos", loggedInUser)
    useEffect(() => {
        async function fetchUser() {
            const response = await api.get(`/user/profile/${id}`)
            setLoggedInUser(response.data[0])
            console.log("console aqui", response)
        }
        fetchUser();
    }, [id]);


    function handleLogOut() {
        localStorage.removeItem("loggedInUser");
        navigate("/")
    }

    function getPageYAfterScroll() {
        setPageYPosition(window.scrollY);
    }

    function handleSubmit(e) {

        toast.success("Email enviado com sucesso!", {
            position: "top-left",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    window.addEventListener('scroll', getPageYAfterScroll);

    return (
        <div id="container">
            <SSection1>
                <video autoPlay loop muted id="meuVideo">
                    <source src={Video} type="video/mp4" />
                </video>
                <SHeader>
                    {/* <div>
                    <img className="photo" src={loggedInUser.img || ""} alt="imagem de perfil"  id="perfil"/>
                </div> */}

                    {loggedInUser ?
                        (<div className="content2">
                            <Link to="/profileEdit"><img src={Configs} alt="" id="configs" /></Link>
                            <button onClick={handleLogOut}><img src={LogOut} alt="" id="quit" /></button>
                        </div>) : null}
                </SHeader>

                <div>
                    <h1>Oi, eu sou {loggedInUser.name}! </h1>
                    <span className="front">{loggedInUser.denomination}</span> <span className="dev">developer</span>
                </div>

                <div className="gif1">
                    <a href="#section2"><img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif" /></a>
                </div>

            </SSection1>

            <SSection2 id="section2">
                <div className="header1">
                    <h1> um pouco sobre mim...</h1>
                </div>
                <div>
                    <h2> {loggedInUser.name}, {loggedInUser.age}</h2>
                    <p>  {loggedInUser.description} </p>
                    <h2>Habilidades</h2>
                    <p>{loggedInUser.skills}</p>
                    <a href={loggedInUser.curriculo} download="curriculo" target="_blank" rel="noreferrer"><button>MEU CURRÍCULO</button></a> <span> - Vamos desenvolver juntos?</span>
                </div>
                <div className="gif2">
                    <a href="#section3"><img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif" /></a>
                </div>
            </SSection2>

            <SSection3 id="section3">
                <div className="header">
                    <h1>meus projetos</h1>

                    {loggedInUser ?
                        (<Link to="/createProject"><img src={More} alt="" /></Link>) : null}
                </div>
                <div className="projects">
                    {loggedInUser.projects &&
                        loggedInUser.projects.map((currentProjects) => {
                            const { name, tags, img, _id: id } = currentProjects;
                            return (
                                <div className="container" key={id}>
                                    {tags.includes("FINALIZADO") ? <img src={img} alt="" className="image" /> : null}
                                    {tags.includes("EM ANDAMENTO") ? <img src={img} alt="" className="image" /> : null}
                                    <div className="middle">
                                        <div className="text">
                                            <h2>{name}</h2>
                                            <Link to={`/projects/${id}`}><h3>ver mais</h3></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <div className="gif3">
                    <a href="#contato"><img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif" /></a>
                </div>
            </SSection3>

            <SSection4 id="contato">
                <h1>entre em contato comigo</h1>
                <p>Estou interessado em {loggedInUser.interests}. Mas se tiver outra solicitação ou pergunta, preenche o formulário abaixo:</p>

                <div className="bottom">

                    <form action={`https://formsubmit.co/${loggedInUser.email}`} method="POST" className="forms" onSubmit={handleSubmit}>
                        <input type="hidden" name="_next" value="http://localhost:3000/profile#contato" />
                        <input type="hidden" name="_captcha" value="false" />

                        <div className="form1">
                            <input type="text" name="name" placeholder="seu nome" />
                            <input type="email" name="email" placeholder="seu email" />
                        </div>
                        <div className="form2">
                            <input type="subject" name="subject" placeholder="qual o assunto?" />
                        </div>
                        <div className="textarea">
                            <textarea name="message" placeholder="digite aqui sua mensagem" />
                        </div>
                        <input id="enviar" type="submit" value="Enviar" />
                        <input id="limpar" type="reset" value="Limpar" />
                    </form>

                    <div>
                        <h2>Visite minhas redes sociais</h2>
                        <ul id="social-media">
                            <a href={loggedInUser.linkedin} target="_blank" rel="noreferrer"><li><img src={Linkedin} alt="" /></li></a>
                            <a href={loggedInUser.instagram} target="_blank" rel="noreferrer"><li><img src={Instagram} alt="" /></li></a>
                            <a target="_blank" href={`https://api.whatsapp.com/send?1=pt_BR&phone=55${loggedInUser.phone}`} rel="noreferrer"><li><img src={Whats} alt="" /></li></a>
                            <a href={loggedInUser.github} target="_blank" rel="noreferrer"><li><img src={GitHub} alt="" /></li></a>
                        </ul>
                    </div>

                </div>
                <hr></hr>

            </SSection4>

            <SFooter>
                {pageYPosition > 900 && <a href="#container">VOLTAR AO TOPO</a>}
            </SFooter>
        </div>
    )
}

export default ProfileByID;


// =========================== STYLES ============================= // 
const SSection1 = styled.section`
height: auto;
& .front {
    color: #00F6EF;
    font-family: 'Montserrat';
    font-style: italic;
    margin-left: 40px;
    font-size: 25px;
    font-weight: bold;
}
& .dev {
    color: #FF004F;
    font-family: 'Montserrat';
    font-style: italic;
    margin-left: 5px;
    font-size: 25px;
    font-weight: bold;
}
& h1 {
    font-family: 'Montserrat';
    color: #FAEAA7;
    font-size: 70px;
    margin-left: 40px;
    margin-bottom: 5px;
}
& .gif1 {
    text-align: center;
& img {
    width: 80px;
    margin-top: 125px;
    //margin-bottom: -10px;
}
}
& #meuVideo {
  position: absolute;
  width: 100%;
  height: auto;
  z-index: -1000;
  opacity: 0.5;
}
`;
const SSection2 = styled.section`
height: auto;
& h1 {
    font-family: 'Montserrat';
    color: #FAEAA7;
    font-size: 70px;
    margin-left: 40px;
    margin-bottom: 75px;
}
& h2 {
    font-size: 25px;
    font-family: 'Montserrat';
    color: #00F6EF;
    margin-left: 40px;
}
& p {
    width: 850px;
    font-size: 20px;
    font-family: 'Montserrat';
    color: #FAEAA7;
    margin-left: 40px;
    margin-top: -10px;
    
}
& span {
    font-size: 20px;
    font-family: 'Montserrat';
    color: #FAEAA7;
    font-style: italic;
}
& button {
    font-size: 20px;
    margin-left: 40px;
    margin-top: 40px;
    font-family: 'Montserrat';
    background-color: #FF004F;
    border: 1px solid #FF004F;
    font-weight: bold;
    border-radius: 12px;
    color: #FAEAA7;
    cursor: pointer;
}

& .gif2 {
    text-align: center;
& img {
    width: 80px;
    margin-top: 98px;
}
}
`;
const SSection3 = styled.section`
//background-image: url(${Fundo2});
//background-size: cover;
height: auto;
& h1 {
    font-family: 'Montserrat';
    color: #FAEAA7;
    font-size: 70px;
    margin-left: 40px;
    margin-top: 15px;
    margin-bottom: 35px;
}
& .projects {
    display: grid ;
    grid-template-columns: auto auto auto auto;
    justify-content: start;
}
& .container {
  position: relative;
}
& .image {
  opacity: 1;
  display: block;
  width: 340px;
  height: 215px;
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
  font-family: 'Montserrat';
}
& .text h2 {
    font-size: 30px;
    margin-bottom: -25px;
}
& .text a {
    //font-size: 20px;
    text-decoration: none;
    color: #FAEAA7;
}
& .text h3 {
    background-color:#FF004F;
    border-radius: 10px;
}
& .gif3 {
    text-align: center;
    margin-top: 100px;
& img {
    width: 80px;
}
}
& .header {
  display: flex;
  justify-content: space-between;
& img {
  width: 100px;
  margin-top: 20px;
  margin-left: 20px;
  height: 100px;
}
}
`
const SSection4 = styled.section`
//background-image: url(${Section4});
//background-size: auto;
height: auto;
& h1 {
    font-family: 'Montserrat';
    color: #FAEAA7;
    font-size: 70px;
    margin-left: 40px;
    margin-bottom: -5px;
}
& p{
    width: 950px;
    color: #FAEAA7;
    font-family: 'Montserrat';
    font-style: italic;
    text-align: left;
    font-size: 20px;
    margin-left: 40px;
    margin-bottom: 65px;
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
    font-size: 25px;
    margin: 3px;
    margin-top: 18px;
    border: 1px solid #008037;
    background-color: #008037;
    color: #FAEAA7;
    font-family: 'Montserrat';;
    border-radius: 10px;
    cursor: pointer;
}
& #limpar {
    font-size: 25px;
    margin: 3px;
    margin-top: 18px;
    border: 1px solid #FF1616;
    background-color: #FF1616;
    color: #FAEAA7;
    font-family: 'Montserrat';;
    border-radius: 10px;
    cursor: pointer;
}
& #social-media {
    display: flex;
    grid-template-columns: auto auto;
    justify-content: center;
    margin-right: 150px;
    margin-top: -25px;
   
}
& .form1 input {
    margin: 5px;
    width: 310px;
    height: 50px;
    background-color: #05263B;
    border: 1px solid #05263B;
    padding-left: 10px;
    color: #FAEAA7;
    font-size: 20px;
    ::placeholder {
      font-size: 17px;
      color: #FAEAA7;
      font-style: italic;
      padding-left: 10px;
      opacity: 0.5;
      font-family: 'Montserrat';;
    }
}
& .form2 input {
    margin: 5px;
    width: 643px;
    height: 50px;
    background-color: #05263B;
    border: 1px solid #05263B;
    padding-left: 10px;
    color: #FAEAA7;
    font-size: 20px;
    ::placeholder {
      font-size: 17px;
      color: #FAEAA7;
      font-style: italic;
      padding-left: 10px;
      opacity: 0.5;
      font-family: 'Montserrat';;
    }
}
& .textarea textarea {
    margin: 5px;
    resize: none;
    width: 643px;
    height: 150px;
    background-color: #05263B;
    border: 1px solid #05263B;
    color: #FAEAA7;
    font-family: 'Montserrat';;
    font-size: 20px;
    padding-left: 10px;
    ::placeholder {
      font-size: 17px;
      color: #FAEAA7;
      font-style: italic;
      padding-left: 10px;
      opacity: 0.5;
      font-family: 'Montserrat';;
    }
}
& li {
    list-style-type: none;
}
& img {
    width: 100px;
}
& hr {
  margin-top: 20px;
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, transparent, #00F6EF, transparent);
}
& h2 {
    color: #FAEAA7;
    font-family: 'Montserrat';;
    font-style: italic;
    margin-left: 90px;
    font-weight: 100;
}
`
const SFooter = styled.section`
    display: flex;
    justify-content: space-evenly;
    //margin-top: -150px;
    height: auto;
& a {
    color: #FF004F;
    font-family: 'Montserrat';;
    text-transform: lowercase;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
}     
`
const SHeader = styled.section`
display: flex;
justify-content: space-between;
& img {
  width: 200px;
  margin-top: 30px;
  //margin-left: 40px;
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
    font-family: 'Montserrat';
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
    margin-left: 50px;
    cursor: pointer;

}
& #configs {
    border: none;
    width: 80px;
    margin-left: 1100px;
    cursor: pointer;
}
`;