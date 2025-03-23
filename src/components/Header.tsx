import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import logo from '../assets/logo.png'

import './css/Header.scss';

const Header = () => {

    const {user, logout} = useAuth();


    return (
        <header>
            

            <ul>
                <li><Link to="/"><img src={logo} alt="Logotyp" /></Link></li>
                <div className="menu-items">
                {
                    user && <li><NavLink to='/profile'>Min sida</NavLink></li>
                }
                <li>
                    {
                        !user ? <NavLink to='/login'>Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
                    }
                </li>
                </div>
            </ul>
        </header>
    )
}

export default Header