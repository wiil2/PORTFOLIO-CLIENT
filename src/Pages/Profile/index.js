import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components";
import Fundo from "../Assets/fundo.png"
import Fundo2 from "../Assets/fundo2.png"



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

            <h1>Oi, eu sou o {loggedInUser.user.name}! </h1>
            <span className="front">front end</span> <span className="dev">developer</span>

            <SGif>
                <img src="https://static.wixstatic.com/media/3a5df9_81b94f0536ef4a379857d7195426117c~mv2.gif" alt="gif"/>
            </SGif>
        </SSection1>

        <SSection2>

            <h1> TESTE TESTE TESTE</h1>
        </SSection2>
    
    </>

    )
}

export default Profile;


// =========================== STYLES ============================= // 


const SSection1 = styled.div`
background-image: url(${Fundo});
background-size: cover;
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
`;

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
}
& button {
    font-size: 30px;
    margin-left: 25px;
    font-family: 'Gantari';
    background-color: #FF004F;
    border: 1px solid #FF004F;
    border-radius: 12px;
    color: white;
}
`;

const SGif = styled.div`
 text-align: center;
& img {
    width: 80px;
    margin-top: 50px;
}



`