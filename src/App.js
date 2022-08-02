import { Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import Profile from "./Pages/Profile";
import { AuthContextComponent } from "./contexts/authContext";
import ProfileEdit from "./Pages/ProfileEdit";
import "../src/index.css"
import Projects from "./Pages/NewProject";
import { ProjectsPage } from "./Pages/ProjectsPage";
import ProjectEdit from "./Pages/ProjectEdit";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <>
      <AuthContextComponent>
        <ToastContainer autoClose={3000}/>
        <Routes>
          <Route path="/"  element= { <Login/>  } />
          <Route path="/signup" element= { <Signup/> } />
          <Route path="/profile" element= { <Profile/> } />
          <Route path="/profileEdit" element= { <ProfileEdit/> } />
          <Route path="/createProject" element= { <Projects/> } />
          <Route path="/projects/:id" element= { <ProjectsPage/> } />
          <Route path="/update-project/:projectId" element= { <ProjectEdit/> } />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
