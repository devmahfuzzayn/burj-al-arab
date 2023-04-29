import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [resetPasswordVisibility, setResetPasswordVisibility] =
        useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logInUser, resetUserPassword, googleLogIn, githubLogIn } =
        useContext(AuthContext);

    const from = location.state?.from?.pathname || "/";
    const formRef = useRef(null);

    const handleLogInUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);
        setSuccess("");
        setError("");

        logInUser(email, password)
            .then((result) => {
                setSuccess("Login done successfully.");
                console.log(result);
                form.reset();
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const message = error.message;
                if (message === "Firebase: Error (auth/wrong-password).") {
                    setResetPasswordVisibility(true);
                }
                setError(message);
                console.log(message);
            });
    };

    const handleGoogleLogIn = () => {
        googleLogIn()
            .then((result) => {
                setSuccess("Google login done successfully.");
                console.log(result);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const message = error.message;
                setError(message);
                console.log(message);
            });
    };

    const handleGithubLogIn = () => {
        githubLogIn()
            .then((result) => {
                setSuccess("Github login done successfully.");
                console.log(result);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const message = error.message;
                setError(message);
                console.log(message);
            });
    };

    const handleResetPassword = () => {
        const form = formRef.current;
        const email = form.email.value;

        setSuccess("");
        setError("");

        resetUserPassword(email)
            .then((result) => {
                setSuccess("Password reset link has been sent to email");
            })
            .catch((error) => {
                const message = error.message;
                setError(message);
                console.log(message);
            });

        setResetPasswordVisibility(false);
        form.reset();
    };

    return (
        <div className="login">
            <form onSubmit={handleLogInUser} ref={formRef}>
                <h1>Login</h1>
                <div className="user-inputs-container">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your Password"
                        required
                    />
                    <input type="submit" value="Login" />
                </div>
                {resetPasswordVisibility && (
                    <p>
                        <small>
                            Forget password?{" "}
                            <span
                                onClick={handleResetPassword}
                                className="link"
                            >
                                Reset
                            </span>
                        </small>
                    </p>
                )}
                <p>
                    <small>
                        Don't have an account?{" "}
                        <Link to="/register" className="link">
                            Register
                        </Link>
                    </small>
                </p>
                <p style={{ color: "green" }}>
                    <small>{success}</small>
                </p>
                <p style={{ color: "red" }}>
                    <small>{error}</small>
                </p>
                <div className="third-party-buttons-container">
                    <button
                        onClick={handleGoogleLogIn}
                        className="google third-party-log-in-btn"
                    >
                        Sign in With Google
                    </button>
                    <button
                        onClick={handleGithubLogIn}
                        className="github third-party-log-in-btn"
                    >
                        Sign in With Github
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
