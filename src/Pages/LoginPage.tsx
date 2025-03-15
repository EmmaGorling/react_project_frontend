import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user, login } = useAuth();
    const navigate = useNavigate();

    // Control user
    useEffect(() => {
        if(user) {
            navigate("/profile");
        }
    },[user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await login({email, password});
            navigate("/profile");
        } catch (error) {
            setError("Inloggningen misslyckades");
        }
    }

    return (
        <div>
            <h2>Logga in</h2>

            <form onSubmit={handleSubmit}>
                {
                    error && <p>{error}</p>
                }
                <div>
                    <label htmlFor="email">E-post</label>
                    <input 
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Lösenord</label>
                    <input 
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <button type="submit">Logga in</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage