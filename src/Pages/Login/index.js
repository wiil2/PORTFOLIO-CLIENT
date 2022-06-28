import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";



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

            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }



    return ( 

        <>
            <form onSubmit={handleSubmit}>

                <label>E-mail</label>
                <input type="email" 
                       name="email" 
                       value={form.email} 
                       onChange={handleChange} 
                       placeholder="Email"
                />

                <label>Password</label>
                <input type="password" 
                       name="password" 
                       value={form.password} 
                       onChange={handleChange} 
                       placeholder="Password"
                />

                <button type="submit">LOGIN</button>

            </form>
        </>

     );
}

export default Login;