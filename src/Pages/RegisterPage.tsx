import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiUrl}/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({email, firstName, lastName, password})
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Något gick fel");
            } else {
                setSuccess("Ditt konto har skapats, du skickas nu vidare till sidan för inloggning");

                // Wait 6 seconds before navigate
                setTimeout(() => {
                    navigate('/login');  
                }, 5000);
            }
            
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ett okänt fel inträffade");
            }
        }
    }
    
    return (
        <div>
            <h2>Skapa konto</h2>

            <form onSubmit={handleSubmit}>
                {
                    error && <p className='errorMsg'>{error}</p>
                }
                {
                    success && <div className='successMsg'><p>{success}</p></div>
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
                    <label htmlFor="firstName">Förnamn</label>
                    <input 
                        type="text"
                        id="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Efternamn</label>
                    <input 
                        type="text"
                        id="lastName"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                    <button type="submit">Skapa konto</button>
                </div>
                <p>Har du redan ett konto? <Link to="/login">Logga in!</Link></p>
            </form>
        </div>
    )
}

export default RegisterPage