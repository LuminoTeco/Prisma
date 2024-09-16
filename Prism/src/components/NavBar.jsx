import React from 'react'
import Icon from './svg/Icon'
import "../App.css"

import { NavLink, Link } from 'react-router-dom'

const NavBar = () => {
    const handleClick = () => {
        window.scrollTo({
          top: 2250, 
          behavior: 'smooth'
        });
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
            <Link onClick={handleClick}>Planos</Link>
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
            <a href="#">Entrar</a>
        </li>
    </ul>
   </nav>
  )
}

export default NavBar