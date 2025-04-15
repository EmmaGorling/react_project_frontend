import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [firstNameErr, setFirstNameErr] = useState("");
    const [lastNameErr, setLastNameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const navigate = useNavigate();

    // Validering av formulär
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailErr("E-postadressen måste vara giltig");
            return false;
        }
        if (firstName.length < 2) {
            setFirstNameErr("Förnamnet måste vara minst 2 tecken");
            return false;
        }
        if(firstName.length > 20) {
            setFirstNameErr("Förnamnet får inte vara längre än 20 tecken");
            return false;
        }
        if (lastName.length < 2) {
            setLastNameErr("Efternamnet måste vara minst 2 tecken");
            return false;
        }
        if (lastName.length > 20) {
            setLastNameErr("Efternamnet får inte vara längra än 20 tecken");
            return false;
        }
        if (password.length < 6) {
            setPasswordErr("Lösenordet måste vara minst 6 tecken");
            return false;
        }

        return true;
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setEmailErr("");
        setFirstNameErr("");
        setLastNameErr("");
        setPasswordErr("");

        if (!validateForm()) return;
        try {
            const res = await fetch(`${apiUrl}/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({email, firstName, lastName, password})
            });

            const data = await res.json();

            if (!res.ok) {
                if(res.status == 409) {
                    setError("E-postadressen används redan");
                } else {
                    setError(data.message || "Något gick fel");
                }
            } else {
                // Reset form
                setEmail("");
                setFirstName("");
                setLastName("");
                setPassword("");
                // successmessage
                setSuccess("Ditt konto har skapats, du skickas nu vidare till sidan för inloggning");

                
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
                
                <div className='form-section-left'>
                    <label htmlFor="email">E-post </label>
                    { emailErr && <span className='errorMsg'> {emailErr}</span>}
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='form-section-left'>
                    <label htmlFor="firstName">Förnamn </label>
                    { firstNameErr && <span className='errorMsg'>{firstNameErr}</span>}
                    <input 
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className='form-section-left'>
                    <label htmlFor="lastName">Efternamn </label>
                    { lastNameErr && <span className='errorMsg'>{lastNameErr}</span>}
                    <input 
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className='form-section-left'>
                    <label htmlFor="password">Lösenord </label>
                    { passwordErr && <span className='errorMsg'>{passwordErr}</span>}
                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {
                    error && <p className='errorMsg'>{error}</p>
                }
                {
                    success && <div className='successMsg'><p>{success}</p></div>
                }
                
                <button type="submit">Skapa konto</button>
                
                <p>Har du redan ett konto? <Link to="/login">Logga in!</Link></p>
            </form>
        </div>
    )
}

export default RegisterPage