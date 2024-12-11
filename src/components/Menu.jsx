import React from 'react';
import { NavLink } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/menu_list"> Menu </NavLink>
            <NavLink to="/user_list"> Korisnici </NavLink>
            <NavLink to="/order_list"> Narudžbe </NavLink>
            <NavLink to="/user_role_list"> Korisnik role </NavLink>
        </div>
    )
}

export default Menu;