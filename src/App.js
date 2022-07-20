import { Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import Profile from "./Pages/Profile";
import { AuthContextComponent } from "./contexts/authContext";
import ProfileEdit from "./Pages/ProfileEdit";
import "../src/index.css"
import Projects from "./Pages/NewProject";



function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/"  element= { <Login/>  } />
          <Route path="/signup" element= { <Signup/> } />
          <Route path="/profile" element= { <Profile/> } />
          <Route path="/profileEdit" element= { <ProfileEdit/> } />
          <Route path="/createProject" element= { <Projects/> } />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
