import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./CurtainMenu.css";
import Menu from "../Pages/Assets/menu.svg"


export default function CurtainMenu() {

    const [ toggleNav, setToggleNav ] = useState(false);
    const [ checkWidth, setCheckWidth ] = useState(window.innerWidth);
    const navigate = useNavigate();

    /* function checkFunc() {
        console.log(checkWidth);
        setCheckWidth(window.innerWidth);
    } */

    /* function toggleNavFunc() {
        setToggleNav(!toggleNav);
    }; */

    const checkFunc = () => {
        console.log(checkWidth);
        setCheckWidth(window.innerWidth);
    }

    
    function handleLogOut() {
        localStorage.removeItem("loggedInUser");
        navigate("/login")
    }

    useEffect(() => {
        window.addEventListener( "resize", checkFunc);

        return () => {

            window.removeEventListener( "resize", checkFunc);
        }
    }, [])

    const toggleNavFunc = () => {
        setToggleNav(!toggleNav);
    }


    return ( 
        <>
            {checkWidth < 1370 && ( 
                <button onClick={toggleNavFunc} className="floating-btn">
                    <img src={Menu} alt=""/> 
                </button> 
            )}

            <nav className={toggleNav ? "active" : "" }>

                {checkWidth < 1370 && (<button onClick={toggleNavFunc} className="close-curtain"> X </button>)}

                <a href="/createProject">ADICIONAR PROJETO</a>
                <a href="/profileEdit">EDITAR PERFIL</a>
                <a onClick={handleLogOut} href="/">SAIR</a>
            </nav>
        </>
    );
}