import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components";


export function ProfileEdit() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        citystate: "",
        phone: "",
        age: "",
        denomination: "",
        interests:"",
        description: "",
        tags: "",
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
    <SContainer>
        <h1>editar perfil</h1>

            <SMiddle>

                <form onSubmit={
                    handleSubmit}>
                    <div className="forms1">
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
                            <input id="formAge"
                            name="Age"
                            type="text" 
                            value={form.age}
                            onChange={handleChange} 
                            placeholder="Your Age" 
                        />
                    </div>
                    <div className="forms2">
                        <input id="formDenomination"
                            name="Denomination"
                            type="text" 
                            value={form.denomination}
                            onChange={handleChange} 
                            placeholder="Your Denomination" 
                        />
                        <input id="formInterests"
                            name="Interests"
                            type="text" 
                            value={form.interests}
                            onChange={handleChange} 
                            placeholder="Your Interests" 
                        />
                    </div>
                    <div className="forms3">
                        <textarea id="formDescription"
                            name="Description"
                            type="text" 
                            value={form.description}
                            onChange={handleChange} 
                            placeholder="Your Description" 
                        />
                    </div>
                     <div className="selects">
                        <h3>Redes Sociais</h3>
                        <div>
                            <select onClick={handleChange} name="tags">
                                <option  value="Instagram">Instagram</option>
                                <option  value="Linkedin">Linkedin</option>
                                <option  value="Github">GitHub</option>
                                <option  value="WhatsApp">WhatsApp</option>
                            </select>
                            <input id="formTags" name="tags" type="text" value={form.tags} onChange={handleChange} placeholder="insira o link aqui"/>
                        </div>
                        <div>
                            <select onClick={handleChange} name="tags">
                                <option  value="Instagram">Instagram</option>
                                <option  value="Linkedin">Linkedin</option>
                                <option  value="Github">GitHub</option>
                                <option  value="WhatsApp">WhatsApp</option>
                            </select>
                            <input id="formTags" name="tags" type="text" value={form.tags} onChange={handleChange}  placeholder="insira o link aqui"/>
                        </div>
                        <div>
                            <select onClick={handleChange} name="tags">
                                <option  value="Instagram">Instagram</option>
                                <option  value="Linkedin">Linkedin</option>
                                <option  value="Github">GitHub</option>
                                <option  value="WhatsApp">WhatsApp</option>
                            </select>
                            <input id="formTags" name="tags" type="text" value={form.tags} onChange={handleChange} placeholder="insira o link aqui"/>
                        </div>
                        <div>
                            <select onClick={handleChange} name="tags">
                                <option  value="Instagram">Instagram</option>
                                <option  value="Linkedin">Linkedin</option>
                                <option  value="Github">GitHub</option>
                                <option  value="WhatsApp">WhatsApp</option>
                            </select>
                            <input id="formTags" name="tags" type="text" value={form.tags} onChange={handleChange} placeholder="insira o link aqui"/>
                        </div>
                    </div>
                    <div className="buttons">
                    <button type="submit">CONFIRM</button>
                    <button onClick={deleteUser}>DELETE PROFILE</button>
                </div>

                </form>

                <div className="photo">
                    <img src={loggedInUser.user.img} alt={loggedInUser.user.name} />
                    <button>Change Photo</button>
                </div>

                

            </SMiddle>

                
            
    </SContainer>
  
  </>


    );
}

export default ProfileEdit;

// =========================== STYLES ============================= // 

const SContainer = styled.div`
& h1 {
    text-decoration: overline;
    text-decoration-color: #FF004F;
    font-family: 'Mukta';
    color: #FAEAA7;
    font-size: 90px;
    margin-left: 40px;
}
& .buttons {
    text-align: center;
}
& .buttons button {
    border: 3px solid white;
    color: #FAEAA7;
    background-color: #14202E ;
    border: 1px solid #14202E;
    align-items: center;
    border-radius: 5px;
    font-family: 'Mukta';
    font-size: 20px;
    margin: 3px;
    margin-top: 25px;
    
    
}
`

const SMiddle = styled.div`
display: flex;
justify-content: space-around;
//border: 5px solid red;
& .forms1 {
    //border: 3px solid green;
    
    
}
& .forms1 input {
    width: 140px;
    margin: 2px;
    height: 30px;
    font-size: 20px;
    border: 1px solid #14202E;
    background-color: #14202E;
    color: #FAEAA7;
    font-family: 'Gantari';
    padding-left: 15px;
    //border-radius: 15px;
}
& .forms2 {
    //border: 3px solid yellow;
    
}
& .forms2 input {
    width: 384px;
    height: 30px;
    margin: 2px;
    font-size: 20px;
    border: 1px solid #14202E;
    background-color: #14202E;
    color: #FAEAA7;
    font-family: 'Gantari';
    padding-left: 15px;
}
& .forms3 {
    //border: 3px solid pink;
}
& .forms3 textarea {
    width: 790px;
    height: 150px;
    margin: 2px;
    font-size: 20px;
    border: 1px solid #14202E;
    background-color: #14202E;
    color: #FAEAA7;
    font-family: 'Gantari';
    padding-left: 15px;
    resize: none;
}
& .selects {
    //border: 3px solid orange;
    
}
& .selects h3 {
    font-family: 'Mukta';
    color: #FAEAA7;
    margin-bottom: 5px;
}
& .selects select {
    font-family: 'Mukta';
    color: #FAEAA7;
    background-color: #14202E ;
    border: 1px solid #14202E;
    margin: 3px;
    height: 40px;
}
& .selects input {
    color: #FAEAA7;
    background-color: #14202E ;
    border: 1px solid #14202E;
    height: 20px;
    align-items: center;
    height: 30px;
    width: 600px;
}
& .photo {
    //border: 3px solid gray;
    display:flex;
    flex-direction: column;
}
& .photo img {
    border-radius: 2000px;
    width: 350px;
    margin-bottom: 10px;
}
& .photo button {
    color: #FAEAA7;
    background-color: #14202E ;
    border: 1px solid #14202E;
    align-items: center;
    border-radius: 5px;
    padding: 5px 70px;
    font-family: 'Mukta';
    font-size: 20px;
}
`
