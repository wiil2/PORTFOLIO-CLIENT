import { Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import Profile from "./Pages/Profile";
import { AuthContextComponent } from "./contexts/authContext";
import UserEdit from "./Pages/UserEdit";


function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/signup" element= { <Signup/> } />
          <Route path="/login"  element= { <Login/>  } />
          <Route path="/profile" element= { <Profile/> } />
          <Route path="/userEdit" element= {<UserEdit/> } />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
