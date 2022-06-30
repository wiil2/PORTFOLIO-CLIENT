import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components";
import Fundo from "../Assets/fundo.png"



export function Profile() {

    const navigate = useNavigate();
    const {loggedInUser} = useContext(AuthContext);

    function handleLogOut() {
        localStorage.removeItem("loggedInUser");
        navigate("/login")
    }

    //function handleEdit() {
        //navigate("/userEdit")
    //}


    return (
    <>
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

            <h1>Oi, eu sou o {loggedInUser.user.name} </h1>
            <span className="front">front end</span> <span className="dev">developer</span>

            <div>
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </div>
        </SSection1>
    
    </>

    )
}

export default Profile;


// =========================== STYLES ============================= // 

const SSection1 = styled.div`

//background-image: url(${Fundo});

& .front {
    color: #00F6EF;
}

& .dev {
    color: #FF004F;
}


`

const SHeader = styled.div`
display: flex;
justify-content: space-between;

& img {
  width: 200px;
  margin-top: 10px;
  margin-left: 20px;
}

& ul {
    display: flex;
    margin-right: 50px;
    align-items: baseline;
    
}

& li {
    margin-left: 25px;
    list-style-type: none;
    font-size: 35px;
}

& button {
    font-size: 25px;
    margin-left: 10px;
}

`