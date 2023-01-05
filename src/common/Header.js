import React from "react";
import './Header.css'
// import logo from "../images/Troll Face.png"

export default function Header(){
    return (
        <header className="header">
            {/* <img src={logo} alt="troll-logo" className="header--image" /> */}
            <h2 className="header--title">Student Attendance System</h2>
        </header>
    )
}