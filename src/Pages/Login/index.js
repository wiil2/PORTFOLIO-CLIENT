import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
background-image: url(${Login1});
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
    font-family: "Mukta";
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
    font-family: "Mukta";
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
    width: 292px;
    border: 1px solid #008037;
    border-radius: 5px;
    padding: 10px 87px;
    margin-top: 10px;
    background-color: #008037;
    color: white;
    font-family: "Mukta";
    cursor: pointer;
    font-size: 20px;
}
`