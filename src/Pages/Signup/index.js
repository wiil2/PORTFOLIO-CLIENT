import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";



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

            navigate("/");

        } catch (error) {
            console.log(error);
        }
    }

    return ( 
    <>
        <form onSubmit={handleSubmit}>

            <label htmlFor="formName">Name</label>
            <input type="text" 
                   value={form.name} 
                   id="formName" 
                   onChange={handleChange} 
                   name="name"
            />

            <label htmlFor="formEmail">E-mail</label>
            <input type="email" 
                   value={form.email} 
                   id="formEmail" 
                   onChange={handleChange}
                   name="email"
            />

            <label htmlFor="formCityState">Cidade/Estado</label>
            <input type="text" 
                   value={form.citystate} 
                   id="formCityState" 
                   onChange={handleChange} 
                   name="citystate"
            />

            <label htmlFor="formPhone">Phone</label>
            <input type="text" 
                   value={form.phone} 
                   id="formPhone"
                   onChange={handleChange} 
                   name="phone"
            />

            <label htmlFor="formPassword">Password</label>
            <input type="password" 
                   value={form.password} 
                   id="formPassword" 
                   onChange={handleChange} 
                   name="password"
            />

            <label htmlFor="formConfirmPassword">Confirm Password</label>
            <input type="password" 
                   value={form.confirmPassword} 
                   id="formConfirmPassword" 
                   onChange={handleChange} 
                   name="confirmPassword"/>

            <input type="checkbox"/> <h5>Agree to terms and conditions</h5>
            <button type="submit">CREATE</button>

            <Link to="/"><h3>Already a user?</h3></Link>


        </form>




    </>


     );
}

export default Signup;