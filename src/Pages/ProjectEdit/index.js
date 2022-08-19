import { useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import { api } from "../../api/api";

import styled from "styled-components";
import {toast} from 'react-toastify'


export function ProjectEdit() {
    const navigate = useNavigate();
    
    const [ form, setForm ] = useState({
        name: "",
        language: "",
        description: "",
        tags: "",
        repo: "",
        project: "",
    })

    const [ img, setImg ] = useState("");
    const { id }= useParams();
    //console.log(id)

    useEffect(() => {
        async function fetchProjetos() {
          const response = await api.get(`/projects/projects/${id}`);
          const { name, language, description, tags, repo, project } = response.data[0]
          //console.log(response.data)
          setForm({ name, language, description, tags, repo, project });
        }
        // *** VERIFICAR SE HOUVE ERRO
        fetchProjetos().catch((err) => console.log(err));
      }, [id]);

      function handleChange(e) {
        // *** UTILIZAR O ESTADO PREVIO DO STATE PASSANDO UMA CALLBACK E RETORNANDO NOVO VALOR
        setForm((prevForm) => {
          return { ...prevForm, [e.target.name]: e.target.value };
        });
      }

      function handleImg(e) {
        setImg(e.target.files[0]);
      }

      async function handleUpload(){
        try{

          const uploadData = new FormData();
          uploadData.append("picture", img)

          const response = await api.post("/upload-image", uploadData);
          return response.data.url

        } catch(err) {
          console.log(err)
        }
      }

      function handleSubmit(e) {
        e.preventDefault();
    
        // *** CHECAR SE OF FORM TA CERTO ANTES DE MANDAR
        if (!form) return console.log("***FORMULARIO UNDEFINED***");
    
        (async () => {
          try {
            const imgURL = await handleUpload();
            await api.patch(`/projects/update-project/${id}`, { ...form, img: imgURL } );

            navigate(`/projects/${id}`)
          } catch (err) {
            console.log("***ERRO DO PATCH***", err);
          }
          toast.success("Editado com sucesso")
        })();
      }

      const formId = form._id;

      function deleteProject() {
        api.delete(`/projects/delete-project/${id}`, { formId });
        navigate("/");
        return;
      }


    return (
    <SContainer>
        <div id="header">
          <h1>editar projeto</h1>
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
                  placeholder="Project Languages"
                />
              </div>

              <div className="forms3">
                <textarea 
                  id="formDescription" 
                  name="description" 
                  type="text" 
                  value={form.description || ''} 
                  onChange={handleChange} 
                  placeholder="Project Description"
                />
              </div>

              <div className="links">
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
                <button id="save" onClick={handleSubmit}>SALVAR ALTERAÇÕES</button>
                <button id="delete" onClick={deleteProject}>EXCLUIR PROJETO</button>
              </div>
            </form>

            <div className="photo">
              <img src={form.img} alt=""/>
              <input type="file" id="formImg" onChange={handleImg}/>
            </div>
        </SMiddle>
    </SContainer>
    );
}

export default ProjectEdit;

// =========================== STYLES ============================= //
const SContainer = styled.div`
  & h1 {
    font-family: "Mukta";
    color: #faeaa7;
    font-size: 60px;
    margin-left: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  & h4 {
    font-family: "Mukta";
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

  & .forms1 input {
    width: 290px;
    margin: 2px;
    height: 30px;
    font-size: 20px;
    border: 1px solid #14202e;
    background-color: #14202e;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
    margin-left: 40px;
    
  }
  & .forms1 select {
    width: 290px;
    margin: 2px;
    height: 34px;
    font-size: 20px;
    border: 1px solid #14202e;
    background-color: #14202e;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
  }  
  & .forms2 input {
    width: 584px;
    height: 50px;
    margin: 2px;
    font-size: 20px;
    border: 1px solid #14202e;
    background-color: #14202e;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
    margin-left: 40px;
  }
  & .forms3 textarea {
    width: 585px;
    height: 150px;
    margin: 2px;
    font-size: 15px;
    border: 1px solid #14202e;
    background-color: #14202e;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
    resize: none;
    margin-left: 40px;
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
    font-family: "Mukta";
    font-size: 20px;
    margin-left: 80px;
  }
  & .buttons {
    margin-left: 40px;
  }
  & .buttons button {
    color: #faeaa7;
    align-items: center;
    border-radius: 5px;
    font-family: "Mukta";
    font-size: 20px;
    font-style: italic;
    margin: 3px;
    margin-top: 25px;
    padding: 0px 35px;
    
  }
  & #save {
    border: 1px solid #008037;
    background-color: #008037;
  }
  & #delete {
    border: 1px solid #FF1616;
    background-color: #FF1616;
  }
  & .links h3 {
    font-family: "Mukta";
    color: #faeaa7;
    margin-bottom: 2px;
    font-weight: 100;
    margin-left: 40px;
  }
  & .links input {
    color: #faeaa7;
    background-color: #14202e;
    border: 1px solid #14202e;
    height: 20px;
    align-items: center;
    height: 30px;
    width: 400px;
    margin-left: 40px;
  }

`
