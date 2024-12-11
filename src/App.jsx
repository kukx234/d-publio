import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {MemoryRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Menu from './components/Menu.jsx';
import UserList from './pages/user/UserList.jsx';
import OrderList from './pages/order/OrderList.jsx';
import UserRoleList from './pages/user_role/UserRoleList.jsx';
import MenuList from './pages/menu/MenuList.jsx';

const root = createRoot(document.body);
root.render(
    <div className="main-template">
        <Router>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu_list" element={<MenuList />} />
                <Route path="/user_list" element={<UserList />} />
                <Route path="/order_list" element={<OrderList />} />
                <Route path="/user_role_list" element={<UserRoleList />} />
            </Routes>
        </Router>
    </div>
);