import React from 'react'
import Icon from '../assets/svg/Icon'
import "../App.css"

import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
   <nav>
    <ul className="left-links">
        <li>
            <NavLink to="/about">About</NavLink>
        </li>
        <li>
            <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
            <NavLink to="/plans">Plans</NavLink>
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