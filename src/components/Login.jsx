import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (!login(username, password)) {
            setError("Invalid credentials");
        }
    };

    return (
        <section className="login-container">
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button className="login-btn" type="submit">
                    Login
                </button>
            </form>
        </section>
    );
};

export default Login;
