import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styled from "styled-components";
import Default from "../Assets/project.png"
import {toast} from 'react-toastify'


export function Projects() {
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        name: "",
        language: "",
        description: "",
        tags: "",
        img: "",
        project: "",
        repo: "",
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
            console.log(response.data)
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
            toast.success("Projeto adicionado com sucesso")
        })();
    }


    return ( 
        <SContainer>
            <div id="header">
                <h1>adicionar projeto</h1>
                <Link to="/profile"><h4>página inicial</h4></Link>
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
                    <div className="forms4">
                    <h3>Link do Projeto</h3>
                  <input
                    id="formProject"
                    name="project"
                    type="text"
                    value={form.project || ''}
                    onChange={handleChange}
                    placeholder="insira o link aqui"
                  />
                <h3>Link do Github</h3>
                  <input
                    id="formRepo"
                    name="repo"
                    type="text"
                    value={form.repo || ''}
                    onChange={handleChange}
                    placeholder="insira o link aqui"
                  />
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
  height: auto;
  & h1 {
    text-decoration: overline;
    text-decoration-color: #ff004f;
    font-family: "Montserrat";
    color: #faeaa7;
    font-size: 60px;
    margin-left: 40px;
  }
  & h4 {
    font-family: "Montserrat";
    color: #faeaa7;
    font-size: 25px;
    margin-right: 40px;
  }
  & a {
    text-decoration: none;
  }
  & #header {
    display: flex;
    justify-content: space-between;
  }
`
const SMiddle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 40px;
  & .forms1 input {
    width: 290px;
    margin: 2px;
    height: 30px;
    font-size: 20px;
    border: 1px solid #05263B;
    background-color: #05263B;
    color: #faeaa7;
    font-family: "Montserrat";
    padding-left: 15px;
    //border-radius: 15px;
  }
  & .forms1 select {
    width: 290px;
    margin: 2px;
    height: 34px;
    font-size: 20px;
    border: 1px solid #05263B;
    background-color: #05263B;
    color: #faeaa7;
    font-family: "Montserrat";
    padding-left: 15px;
  }  
  & .forms2 input {
    width: 584px;
    height: 50px;
    margin: 2px;
    font-size: 20px;
    border: 1px solid #05263B;
    background-color: #05263B;
    color: #faeaa7;
    font-family: "Montserrat";
    padding-left: 15px;
  }
  & .forms3 textarea {
    width: 585px;
    height: 150px;
    margin: 2px;
    font-size: 15px;
    border: 1px solid #05263B;
    background-color: #05263B;
    color: #faeaa7;
    font-family: "Montserrat";
    padding-left: 15px;
    resize: none;
  }
  & .forms4 input {
    color: #faeaa7;
    background-color: #05263B;
    border: 1px solid #05263B;
    height: 20px;
    align-items: center;
    height: 30px;
    width: 400px;
  }
  & .forms4 h3 {
    font-family: "Montserrat";
    color: #faeaa7;
    margin-bottom: 2px;
    font-weight: 100;
  }
  & .photo {
    display: flex;
    flex-direction: column;
    margin-right: 80px;
  }
  & .photo img {
    width: 450px;
    margin-bottom: 20px;
    margin-top:  10px;
    margin-left: 50px;
    height: 300px;
  }
  & .photo input {
    color: #faeaa7;
    background-color: transparent;
    align-items: center;
    border-radius: 5px;
    font-family: "Montserrat";
    font-size: 20px;
    margin-left: 80px;
  }
  & .buttons button {
    color: #faeaa7;
    background-color: #008037;
    border: 1px solid #008037;
    align-items: center;
    border-radius: 5px;
    font-family: "Montserrat";
    font-size: 30px;
    font-style: italic;
    margin: 3px;
    margin-top: 55px;
    padding: 0px 35px;
  }

`
