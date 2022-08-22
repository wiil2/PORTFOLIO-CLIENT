import styled from "styled-components";
import Fundo from "../Assets/fundo5.png"
import Error from "../Assets/error-page.png"

export function ErrorPage() {
    return ( 
        <SError>
            <div id="image">
                <img src={Error} alt="error"/>
            </div>
            <div id="button">
                <a href="/profile">voltar para home</a>
            </div>
        </SError>


     );
}

export default ErrorPage;

// =========================== STYLES ============================= // 

const SError = styled.div`
align-items: center;
justify-content: center;
height: 610px;
background: url(${Fundo});
background-repeat: no-repeat;
background-size: cover;
background-position: center;
margin-top: 5px;
& #image {
    text-align: center;
}
& img {
    width: 950px;
}
& a {
    color: white;
    font-family: "Montserrat";
    font-size: 20px;
    background-color: #05263B;
    border-radius: 15px;
    text-decoration: none;
    padding: 10px 10px;
}
& #button {
    margin-top: -60px;
    text-align: center;
}
`