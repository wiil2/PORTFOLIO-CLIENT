import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components";
import {toast} from 'react-toastify'

export function ProfileEdit() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    citystate: "",
    phone: "",
    age: "",
    denomination: "",
    interests: "",
    skills: "",
    description: "",
    instagram: "",
    linkedin:"",
    github: "",
    curriculo: "",
  });

  const [ img, setImg ] = useState("")

  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCadastro() {
      const response = await api.get("/user/profile");
      setForm({ ...response.data });
    }
    // *** VERIFICAR SE HOUVE ERRO
    fetchCadastro().catch((err) => console.log(err));
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
        await api.patch("/user/profileEdit", { ...form, img: imgURL });
        navigate("/profile");
      } catch (err) {
        console.log("***ERRO DO PATCH***", err);
      }
      toast.success("Editado com sucesso")
    })();
  }

  const formId = form._id;

  function deleteUser() {
    api.delete("/user/delete-user", { formId });
    navigate("/");
    return;
  }

  return (
    <>
      <SContainer>
        <h1>editar perfil</h1>

        <SMiddle>
          <form onSubmit={handleSubmit}>
            <div className="forms1">
              <input
                id="formName"
                name="name"
                type="text"
                value={form.name || ''}
                onChange={handleChange}
                placeholder="Your Name"
              />
              <input
                id="formEmail"
                name="email"
                type="email"
                value={form.email || ''}
                onChange={handleChange}
                placeholder="Your E-mail"
              />
              <input
                id="formCityState"
                name="citystate"
                type="text"
                value={form.citystate || ''}
                onChange={handleChange}
                placeholder="Your City And State"
              />
              <input
                id="formPhone"
                name="phone"
                type="text"
                value={form.phone || ''}
                onChange={handleChange}
                placeholder="Your Phone"
              />
              <input
                id="formAge"
                name="age"
                type="text"
                value={form.age || ''}
                onChange={handleChange}
                placeholder="Your Age"
              />
            </div>
            <div className="forms2">
              <input
                id="formDenomination"
                name="denomination"
                type="text"
                value={form.denomination || ''}
                onChange={handleChange}
                placeholder="Your Denomination"
              />
              <input
                id="formInterests"
                name="interests"
                type="text"
                value={form.interests || ''}
                onChange={handleChange}
                placeholder="Your Interests"
              />
            </div>
            <div className="forms3">
              <textarea
                id="formDescription"
                name="description"
                type="text"
                value={form.description || ''}
                onChange={handleChange}
                placeholder="Your Description"
              />
              <textarea
                id="formSkills"
                name="skills"
                type="text"
                value={form.skills || ''}
                onChange={handleChange}
                placeholder="Your Skills"
              />
            </div>
            <div className="social-media">
              <h2>MAIS INFORMAÇÕES</h2>
              <div>
              <h3>Meu currículo</h3>
                <input
                  id="formCurriculo"
                  name="curriculo"
                  type="text"
                  value={form.curriculo || ''}
                  onChange={handleChange}
                  placeholder="insira o link aqui"
                />
                <h3>Instagram</h3>
                <input
                  id="formInstagram"
                  name="instagram"
                  type="text"
                  value={form.instagram || ''}
                  onChange={handleChange}
                  placeholder="insira o link aqui"
                />
              </div>
              <div>
                <h3>Linkedin</h3>
                <input
                  id="formLinkedin"
                  name="linkedin"
                  type="text"
                  value={form.linkedin || ''}
                  onChange={handleChange}
                  placeholder="insira o link aqui"
                />
              </div>
              <div>
                <h3>Github</h3>
                <input
                  id="formGithub"
                  name="github"
                  type="text"
                  value={form.github || ''}
                  onChange={handleChange}
                  placeholder="insira o link aqui"
                />
              </div>
            </div>
            <div className="buttons">
              <button id="confirm" type="submit">confirmar</button>
              <button id="delete" onClick={deleteUser}>deletar perfil</button>
            </div>
          </form>

          <div className="photo">
            <img src={loggedInUser.user.img} alt={loggedInUser.user.name} />
            <input type="file" id="formImg" onChange={handleImg}/>
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
    text-decoration-color: #ff004f;
    font-family: "Mukta";
    color: #faeaa7;
    font-size: 60px;
    margin-left: 40px;
  }
  & .buttons {
    text-align: end;
    
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
& #confirm {
  border: 1px solid #008037;
  background-color: #008037;
}
& #delete {
  border: 1px solid #FF1616;
  background-color: #FF1616;
}
`;

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
    border: 1px solid #05263B;
    background-color: #05263B;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
    //border-radius: 15px;
  }
  & .forms2 {
    //border: 3px solid yellow;
  }
  & .forms2 input {
    width: 384px;
    height: 50px;
    margin: 2px;
    font-size: 20px;
    border: 1px solid #05263B;
    background-color: #05263B;
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
    border: 1px solid #05263B;
    background-color: #05263B;
    color: #faeaa7;
    font-family: "Gantari";
    padding-left: 15px;
    resize: none;
  }
  & .social-media h2 {
    font-family: "Mukta";
    color: #faeaa7;
    margin-bottom: 2px;
  }
  & .social-media h3 {
    font-family: "Mukta";
    color: #faeaa7;
    margin-bottom: 2px;
    font-weight: 100;
  }
  & .social-media input {
    color: #faeaa7;
    background-color: #05263B;
    border: 1px solid #05263B;
    height: 20px;
    align-items: center;
    height: 30px;
    width: 400px;
  }
  & .photo {
    //border: 3px solid gray;
    display: flex;
    flex-direction: column;
  }
  & .photo img {
    border-radius: 180px;
    width: 300px;
    margin-bottom: 20px;
    margin-top: -50px;
    margin-left: 50px;
    height: 300px;
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
`;
