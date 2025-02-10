import React from 'react';
import { NavLink } from "react-router-dom";
import logo from '../assets/images/d_publio_logo.png';
import UserIcon from './icons/UserIcon.jsx';
import HomeIcon from './icons/HomeIcon.jsx';
import MenuIcon from './icons/MenuIcon.jsx';
import OrderIcon from './icons/OrderIcon.jsx';

const Menu = () => {
    return (
        <div className='menu-container'>
            <img src={logo} alt="D-Publio" className='menu-logo' />
            <NavLink 
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} 
                to="/"> 
                <HomeIcon />
                Dashboard 
            </NavLink>
            <NavLink 
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} 
                to="/user_list">
                <UserIcon/>
                Korisnici 
            </NavLink>
            <NavLink 
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} 
                to="/menu_list">
                <MenuIcon />
                Menu 
            </NavLink>
            <NavLink 
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} 
                to="/order_list">
                <OrderIcon />
                Narudžbe 
            </NavLink>
            <NavLink 
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} 
                to="/user_role_list">
                <UserIcon/>
                Korisnik role 
            </NavLink>
        </div>
    )
}

export default Menu;