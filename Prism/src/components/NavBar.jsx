import React from 'react';
import Icon from '../assets/svg/Icon';
import "../App.css";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation()
    const navigate = useNavigate(); 

    const routes = ["/contact", "/about"]

    const handleClick = () => {
        if(routes.includes(location.pathname)) {
            navigate("/")
                setTimeout(() => {
                    window.scrollTo({
                        top: 2350, 
                        behavior: 'smooth'
                    });
                }, 100)
        } else if (!routes.includes(location.pathname) || location.pathname === "/") {
            window.scrollTo({
                top: 2350, 
                behavior: 'smooth'
            });
        }
    };

    const handleLoginClick = () => {
        const token = localStorage.getItem('token'); 
        if (token) {
            navigate('/dashboard'); 
        } else {
            navigate('/choice'); 
        }
    };

    return (
        <nav>
            <ul className="left-links">
                <li>
                    <NavLink to="/about">Sobre</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contato</NavLink>
                </li>
                <li>
                    <a onClick={handleClick}>Planos</a>
                </li>
            </ul>
            <ul className="center-links">
                <li>
                    <NavLink to="/">
                        <Icon />
                    </NavLink>
                </li>
            </ul>
            <ul className='right-link'>
                <li>
                    <button onClick={handleLoginClick} className="login-button">Entrar</button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
