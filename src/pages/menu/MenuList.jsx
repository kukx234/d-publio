import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryList from '../category/CategoryList.jsx';
import ProductList from '../product/ProductList.jsx';
import '../../styles/menu.scss';

const Menu = () => {
    const [category, setCategory] = useState(0);
    const [product_id, setProductid] = useState(0);
    const [categories_position, setCategoriesPosition] = useState({position_1: { level: 1, position: 0}});

    const updateCategoriesPosition = (level, position, only_remove=false) => {
        
        //delete from state
        const level_up = level + 1;
        const position_level_up = 'position_' + level_up;
        if (categories_position[position_level_up]) {
            setCategoriesPosition((prev_state) => {
                const {[position_level_up]: deleted, ...positions} = prev_state;
                return positions;
            });
        }

        if(only_remove) {
            return;
        }
        
        //set new state
        const position_level = 'position_' + level;
        setCategoriesPosition((prev_state) => {
            let existing_position = prev_state[position_level];

            if (!existing_position) {
                return {
                    ...prev_state,
                    [position_level]: {
                        level,
                        position
                    }
                }
            }

            return {
                ...prev_state,
                [position_level]: {
                    ...existing_position,
                    position
                }
            }
        })
    }

    const categories = Object.values(categories_position);

    return (
        <div className='menupage-container'>
            <h1>Menu</h1>
            <div className="main-menu-cont">
                {
				categories.map((category_position, index) => {
                    return (
                        <CategoryList 
                        key={index}
                        level={category_position.level} 
                        position={category_position.position}
                        updateCategoriesPosition={updateCategoriesPosition}
                        setCategory={setCategory}
                    />
                    )
                })
                }   
                { Object.keys(category).length != 0 && <ProductList category={category} /> } 
            </div>
        </div>
    )
}

export default Menu;