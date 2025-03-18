import SearchBooks from "../components/SearchBooks"
import { useAuth } from "../context/authContext"
import oldBook from "../assets/old_book.jpg"

import './css/Homepage.scss';
import TopReviews from "../components/TopReviews";

const HomePage = () => {
    const {user} = useAuth();
    return (
        <div>
            <section className="welcome">
                
                    {!user ? (
                        <div className="container">
                            <div className="text">
                                <h1>Välkommen till bokvärlden!</h1>
                                <p>
                                    Utforska fantastiska böcker, skriv recensioner och dela dina tankar med andra bokfantaster!
                                </p>
                            </div>
                            <img src={oldBook} alt="Gammal bok" />
                        </div>
                    ) : 
                        <div>
                            <h1 className="user-welcome">Välkommen tillbaka {user.firstName}!</h1>
                        </div>    
                    }
            </section>
            <SearchBooks />
            <TopReviews />
        </div>
    )
}

export default HomePage