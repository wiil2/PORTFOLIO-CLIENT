import { Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { AuthContextComponent } from "./contexts/authContext";


function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/signup" element= { <Signup/> } />
          <Route path="/login"  element= { <Login/>  } />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
