import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryList from '../category/CategoryList.jsx';
import ProductList from '../product/ProductList.jsx';
import ProductForm from '../product/ProductForm.jsx';
import '../../styles/menu.scss';

//TODO dodati product form i category form

const Menu = () => {
    const [category_id, setCategoryId] = useState(0);
    const [product_id, setProductid] = useState(0);

    return (
        <div className='menupage-container'>
            <h1>Menu</h1>
            <CategoryList />
            { category_id != 0 && <ProductList /> } 
        </div>
    )
}

export default Menu;