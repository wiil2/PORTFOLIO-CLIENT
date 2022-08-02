import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styled from "styled-components";
import Default from "../Assets/project.png"


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

    function handleSubmit(e) {
        e.preventDefault();

        // *** CHECAR SE OF FORM TA CERTO ANTES DE MANDAR
        if (!form) return console.log("***FORMULARIO UNDEFINED***");

        (async () => {
            try{
                const imgURL = await handleUpload();
                await api.post("/projects/createproject", { ...form, img: imgURL });
                navigate("/profile");
            } catch (err) {
                console.log("***ERRO DO PATCH***", err);
            }
        })();
    }


    return ( 
        <SContainer>
            <div>
                <h1>adicionar projeto</h1>
            </div>

            <SMiddle>
                <form onSubmit={handleSubmit}>
                    <div className="forms1">
                        <input 
                            id="formName" 
                            name="name" 
                            type="text" 
                            value={form.name || ''} 
                            onChange={handleChange} 
                            placeholder="Project Name"
                        />
                        <select onClick={handleChange} name="tags">
                            <option value="empty"></option>
                            <option value="FINALIZADO">FINALIZADO</option>
                            <option value="EM ANDAMENTO">EM ANDAMENTO</option>
                        </select>
                    </div>
                    <div className="forms2">
                        <input 
                            id="formLanguage" 
                            name="language" 
                            type="text" 
                            value={form.language || ''} 
                            onChange={handleChange} 
                            placeholder="Project Languages"/>
                    </div>
                    <div className="forms3">
                        <textarea 
                            id="formDescription" 
                            name="description" 
                            type="text" 
                            value={form.description || ''} 
                            onChange={handleChange} 
                            placeholder="Project Description"/>
                    </div>
                    <div className="buttons">
                        <button type="submit">ADICIONAR</button>
                    </div>
                </form>

                <div className="photo">
                    <img src={Default} alt=""/>
                    <input type="file" id="formImg" onChange={handleImg}/>
                </div>
            </SMiddle>
        
        
        </SContainer>
     );
}

export default Projects;

// =========================== STYLES ============================= //
const SContainer = styled.div`
& h1 {
    text-decoration: overline;
    text-decoration-color: #ff004f;
    font-family: "Mukta";
    color: #faeaa7;
    font-size: 90px;
    margin-left: 40px;
  }
`
const SMiddle = styled.div`
display: flex;
justify-content: space-around;
& .forms1 input {
    width: 190px;
    margin: 2px;
    height: 30px;
    font-size: 20px;
    border: 1px solid #14202e;
    background-color: #14202e;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
    //border-radius: 15px;
  }
& .forms1 select {
    width: 190px;
    margin: 2px;
    height: 34px;
    font-size: 20px;
    border: 1px solid #14202e;
    background-color: #14202e;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
}  
  & .forms2 {
    //border: 3px solid yellow;
  }
  & .forms2 input {
    width: 384px;
    height: 50px;
    margin: 2px;
    font-size: 20px;
    border: 1px solid #14202e;
    background-color: #14202e;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
  }
  & .forms3 {
    //border: 3px solid pink;
  }
  & .forms3 textarea {
    width: 385px;
    height: 150px;
    margin: 2px;
    font-size: 15px;
    border: 1px solid #14202e;
    background-color: #14202e;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
    resize: none;
  }
& .photo {
    //border: 3px solid gray;
    display: flex;
    flex-direction: column;
  }
  & .photo img {
    //border-radius: 100px;
    width: 300px;
    margin-bottom: 20px;
    margin-top:  10px;
    margin-left: 50px;
    height: 200px;
  }
  & .photo input {
    color: #faeaa7;
    background-color: transparent;
    align-items: center;
    border-radius: 5px;
    //padding: 5px 70px;
    font-family: "Mukta";
    font-size: 20px;
  }
  & .buttons button {
    color: #faeaa7;
    background-color: #14202e;
    border: 1px solid #14202e;
    align-items: center;
    border-radius: 5px;
    font-family: "Mukta";
    font-size: 20px;
    font-style: italic;
    margin: 3px;
    margin-top: 25px;
    padding: 0px 35px;
  }

`
