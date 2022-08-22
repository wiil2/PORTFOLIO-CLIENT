import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components";
import Login1 from "../Assets/login.png"

export function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const { setLoggedInUser } = useContext(AuthContext)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            const response = await api.post("/user/login", form);
            setLoggedInUser({ ...response.data });

            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            console.log("USER AQUI", response.data)

            navigate("/profile")
        } catch(err) {
            console.log(err)
        }
    }

    return ( 
        <SContainer>
        <SLogin>
            <form onSubmit={handleSubmit}>
                <div className="email">
                    <input type="email" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        placeholder="Insira seu email"
                    />
                </div>
                <div className="pass">
                    <input type="password" 
                        name="password" 
                        value={form.password} 
                        onChange={handleChange} 
                        placeholder="Insira sua senha"
                    />
                </div>
                <button type="submit">LOGIN</button>
                <Link to="/signup"><h3>Crie seu portfólio agora!</h3></Link>
            </form>
        </SLogin>
        </SContainer>
     );
}

export default Login;

// =========================== STYLES ============================= // 

const SContainer = styled.div`
height: 750px;
`
const SLogin = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 750px;
background: url(${Login1});
background-repeat: no-repeat;
background-size: cover;
background-position: center;

& .email {
    & input {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 20px 10px;
    margin-top: 10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-weight: 600;
    font-size: 20px;
    

    ::placeholder {
      color: #B1C1B4;
      font-weight:bolder;
      font-size: 20px;
    }
 }
}

& .pass {
    & input {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 20px 10px;
    margin-top: 10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-weight: 600;
    font-size: 20px;
    

    ::placeholder {
      color: #B1C1B4;
      font-weight:bolder;
      font-size: 20px;
    }
 }
}

& button {
    width: 305px;
    border: 1px solid #040A18;
    border-radius: 5px;
    padding: 10px 87px;
    margin-top: 10px;
    background-color: #040A18;
    color: white;
    font-family: "Montserrat";
    cursor: pointer;
    font-size: 20px;
}
& h3 {
    text-align: center;
    color: white;
    font-family: "Montserrat";
    font-size: 20px;
    background-color: #05263B;
    opacity: 0.8;
    border-radius: 15px;
    font-style: italic;
    padding: 10px;
}
& a {
    text-decoration: none;
}
`