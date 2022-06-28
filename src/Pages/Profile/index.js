import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";


export function Profile() {

    const navigate = useNavigate();
    const {loggedInUser} = useContext(AuthContext);

    function handleLogOut() {
        localStorage.removeItem("loggedInUser");
        navigate("/login")
    }

    function handleEdit() {
        navigate("/userEdit")
    }


    return (

        <></>

    )
}

export default Profile;