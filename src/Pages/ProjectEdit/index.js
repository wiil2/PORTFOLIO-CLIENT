import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components";
import {toast} from 'react-toastify'

export function ProjectEdit() {
    const { loggedInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        name: "",
        language: "",
        description: "",
        tags: "",
        img: "",
        repo: "",
        project: "",
    })

    const [ img, setImg ] = useState("");
    const { id }= useParams();

    useEffect(() => {
        async function fetchProjetos() {
          const response = await api.get("/projects/projects");
          setForm({ ...response.data });
        }
        // *** VERIFICAR SE HOUVE ERRO
        fetchProjetos().catch((err) => console.log(err));
      }, []);

      function handleChange(e) {
        // *** UTILIZAR O ESTADO PREVIO DO STATE PASSANDO UMA CALLBACK E RETORNANDO NOVO VALOR
        setForm((prevForm) => {
          return { ...prevForm, [e.target.name]: e.target.value };
        });
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
          try {
            console.log(form)
            const imgURL = await handleUpload();
            await api.patch(`/projects/update-project/${id}`, { ...form, img: imgURL });
            navigate(`/projects/projects/${id}`);
          } catch (err) {
            console.log("***ERRO DO PATCH***", err);
          }
          toast.success("Editado com sucesso")
        })();
      }

      const formId = form._id;

      function deleteUser() {
        api.delete(`/projects/delete-project/${id}`, { formId });
        navigate("/");
        return;
      }


    return (
    <>
        <h1>editar perfil</h1>
        



    </>
    );
}

export default ProjectEdit;
