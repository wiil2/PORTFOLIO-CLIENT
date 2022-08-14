import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styled from "styled-components";
import Login1 from "../Assets/login.png"



export function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        citystate: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try{

            await api.post("/user/signup", form);

            navigate("/login");

        } catch (error) {
            console.log(error);
        }
    }

    return ( 
    <SContainer>
        <SLogin>
            <form onSubmit={handleSubmit}>

             <div>
                <input type="text" 
                    value={form.name} 
                    id="formName" 
                    onChange={handleChange} 
                    name="name"
                    placeholder="seu nome"
                />
                
                <input type="email" 
                    value={form.email} 
                    id="formEmail" 
                    onChange={handleChange}
                    name="email"
                    placeholder="seu email"
                />
                
                <input type="text" 
                    value={form.citystate} 
                    id="formCityState" 
                    onChange={handleChange} 
                    name="citystate"
                    placeholder="sua cidade e estado"
                />
             </div> 

             <div> 
                <input type="text" 
                    value={form.phone} 
                    id="formPhone"
                    onChange={handleChange} 
                    name="phone"
                    placeholder="seu telefone"
                />
                
                <input type="password" 
                    value={form.password} 
                    id="formPassword" 
                    onChange={handleChange} 
                    name="password"
                    placeholder="sua senha"
                />
                
                <input type="password" 
                    value={form.confirmPassword} 
                    id="formConfirmPassword" 
                    onChange={handleChange} 
                    name="confirmPassword"
                    placeholder="confirma sua senha"
                />
             </div> 
                <div className="buttons">
                    <button className="button1" type="submit">CRIAR MEU PORTFÓLIO!</button>
                    <Link to="/"><button className="button2">Já tem um?  Clique aqui.</button></Link>
                </div>
            </form>
        </SLogin>
    </SContainer>
     );
}

export default Signup;

// =========================== STYLES ============================= // 

const SContainer = styled.div`
height: 750px;
`
const SLogin = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 750px;
background-image: url(${Login1});
background-repeat: no-repeat;
background-size: cover;
background-position: center;

& form {
    margin-top: 60px;
}

& input {
    margin: 5px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 20px 10px;
    margin-top: 10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Mukta";
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 15px;

    ::placeholder {
      color: #B1C1B4;
      font-weight:bolder;
      font-size: 20px;
      text-align: center;
    }
}
& .buttons {
    text-align:center;
}
& .button1 {
    width: 235px;
    border: 1px solid #040A18;
    border-radius: 5px;
    padding: 10px 10px 10px 10px;
    margin-top: 10px;
    background-color: #040A18;
    color: white;
    font-family: "Mukta";
    cursor: pointer;
    font-size: 20px;
}
& .button2 {
    width: 235px;
    border: 1px solid #05263B;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 10px;
    background-color: #05263B;
    color: white;
    font-family: "Mukta";
    cursor: pointer;
    font-size: 20px; 
    margin-left: 5px;
    opacity: 0.8;
    font-style: italic;
}
& a {
    text-decoration: none;
}
`