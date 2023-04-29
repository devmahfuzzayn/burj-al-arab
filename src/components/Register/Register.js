import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

const Register = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { registerUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email, password);
        setSuccess("");
        setError("");

        // Password Validation
        if (password !== confirm) {
            setError("Password doesn't match.");
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError("Password must have two uppercase characters.");
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setError("Password must have one special character.");
            return;
        }
        if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError("Password must have two numbers.");
            return;
        }
        if (!/.{8}/.test(password)) {
            setError("Password must be 8 characters long.");
            return;
        }

        registerUser(email, password)
            .then((result) => {
                setSuccess("Registration done successfully.");
                console.log(result);
                form.reset();
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const message = error.message;
                setError(message);
                console.log(message);
            });
    };

    return (
        <div className="register">
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="user-inputs-container">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        required
                    />
                    <input
                        type="password"
                        name="confirm"
                        id="confirm"
                        placeholder="confirm password"
                        required
                    />
                </div>
                <p>
                    <small>
                        Already have an account?{" "}
                        <Link to="/login" className="link">
                            Login
                        </Link>
                    </small>
                </p>
                <p style={{ color: "green" }}>
                    <small>{success}</small>
                </p>
                <p style={{ color: "red" }}>
                    <small>{error}</small>
                </p>
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;
