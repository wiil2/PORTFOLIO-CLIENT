import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";


export function UserEdit() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        citystate: "",
        phone: "",
    });

    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        async function fetchCadastro() {
            const response = await api.get("/user/profile");
            setForm({ ...response.data })
        }
        fetchCadastro();
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try{

            await api.patch("/user/update-profile", { ...form });
            navigate("/profile")

        } catch(err) {
            console.log(err)
        }
    }


    const formId = form._id

    function deleteUser() {
        api.delete("/user/delete-user", {formId});
        navigate("/");
        return
    }



 return (  
  <>
        <form onSubmit={handleSubmit}>
            <input id="formName"
                   name="name"
                   type="text" 
                   value={form.name}
                   onChange={handleChange} 
                   placeholder="Your Name" 
            />
            <input id="formEmail"
                   name="email"
                   type="email" 
                   value={form.email}
                   onChange={handleChange} 
                   placeholder="Your E-mail" 
            />
            <input id="formCityState"
                   name="citystate"
                   type="text" 
                   value={form.citystate}
                   onChange={handleChange} 
                   placeholder="Your City And State" 
            />
            <input id="formPhone"
                   name="Phone"
                   type="text" 
                   value={form.phone}
                   onChange={handleChange} 
                   placeholder="Your Phone" 
            />
        </form>

        <button type="submit">CONFIRM</button>
        <button onClick={deleteUser}>DELETE PROFILE</button>
  
  
  
  
  </>


    );
}

export default UserEdit;