import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon_p from './svg/Icon_p';


const Header = () => {
  return (
    <header className="p-6 bg-light-beige">
      <div className="container mx-auto flex items-center justify-between">
        <nav className="flex items-center space-x-6 font-roboto text-22px">
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? 'text-black' : 'text-gray-500'}
          >
            Contato
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? 'text-black' : 'text-gray-500'}
          >
            Sobre
          </NavLink>
          <NavLink 
            to="/plan" 
            className={({ isActive }) => isActive ? 'text-black' : 'text-gray-500'}
          >
            Planos
          </NavLink>
        </nav>
        <div className="flex justify-center w-full">
          <NavLink to="/">
            <Icon_p/>
          </NavLink>
        </div>
        <div className="flex items-center">
          <button className="ml-auto bg-black text-white px-4 py-2 rounded-full w-32">Entrar</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
