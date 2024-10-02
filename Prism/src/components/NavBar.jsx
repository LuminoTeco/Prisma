import React from 'react';
import Icon from '../assets/svg/Icon';
import "../App.css";
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate(); // Hook para navegação

    const handleClick = () => {
        window.scrollTo({
            top: 2250, 
            behavior: 'smooth'
        });
    };

    const handleLoginClick = () => {
        const token = localStorage.getItem('token'); 
        if (token) {
            navigate('/dashboard'); // Redireciona para a página inicial
        } else {
            navigate('/login'); // Redireciona para a página de login
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
