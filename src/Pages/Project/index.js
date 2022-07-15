import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";


export function Projects() {
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        name: "",
        language: "",
        description: "",
        tags: "",
        img: "",
    })

    const [ img, setImg ] = useState("")

    const { loggedInUser } = useContext(AuthContext); 

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleImg(e) {
        setImg(e.target.files[0]);
    }

    async function handleUpload() {
        try{

            const uploadData = new FormData();
            uploadData.append("picture", img);

            const response = await api.post("/upload-image", uploadData);

            return response.data.url;
        } catch (err) {
            console.log(err)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            await api.post("projects/createProject", {...form} )
            navigate("/profile");

        } catch (err) {
            console.log(err)
        }
    }


    return ( 
        <>
            <div>
                <h1>adicionar projeto</h1>
            </div>

            <div>
                <form>
                    <div>
                        <input 
                            id="formName" 
                            name="name" 
                            type="text" 
                            value={form.name || ''} 
                            onChange={handleChange} 
                            placeholder="Project Name"
                        />
                        <select onClick={handleChange} name="tags">
                            <option value="FINISHED">FINISHED</option>
                            <option value="IN PROGRESS">IN PROGRESS</option>
                        </select>
                    </div>
                    <div>
                        <input 
                            id="formLanguage" 
                            name="languages" 
                            type="text" 
                            value={form.language || ''} 
                            onChange={handleChange} 
                            placeholder="Project Languages"/>
                    </div>
                    <div>
                        <input 
                            id="formDescription" 
                            name="description" 
                            type="text" 
                            value={form.description || ''} 
                            onChange={handleChange} 
                            placeholder="Project Description"/>
                    </div>
                </form>
            </div>
        
        
        </>
     );
}

export default Projects;