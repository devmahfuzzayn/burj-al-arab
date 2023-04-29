import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import header from "../../images/header.png";
import logo from "../../images/icons/logo.png";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { CodeSharp } from "@material-ui/icons";

const Header = () => {
    const { user, logOutUser } = useContext(AuthContext);

    const handleLogOut = () => {
        logOutUser()
            .then((result) => {})
            .catch((error) => {
                const message = error.message;
                console.log(message);
            });
    };

    return (
        <div
            style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})`,
            }}
            className="header"
        >
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt="" />
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link className="btn-book" to="/book">
                            Book
                        </Link>
                    </li>
                    {user && (
                        <li className="user-email">
                            {user.email ? user.email : "Not available"}{" "}
                            <button onClick={handleLogOut} className="sign-out">
                                Sign Out
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            <div className="title-container">
                <h1>Burj Al Arab</h1>
                <h2>A global icon of Arabian luxury</h2>
            </div>
        </div>
    );
};

export default Header;
