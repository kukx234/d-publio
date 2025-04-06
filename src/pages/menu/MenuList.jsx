import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryList from '../category/CategoryList.jsx';
import ProductList from '../product/ProductList.jsx';
import '../../styles/menu.scss';
import Notification from '../../components/Notification.jsx';

const Menu = () => {
    const [category, setCategory] = useState(0);
    const [product_id, setProductid] = useState(0);
    const [categories_position, setCategoriesPosition] = useState({position_1: { level: 1, position: 0}});
    const [notifications, setNotifications] = useState([]);

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

    const newNotification = (data) => {
        const new_notification = {
            id: data.id,
            title: data.title, 
            subtitle: data.subtitle ?? '', 
            classes: data.clases ?? '' 
        };

        setNotifications((prev) => [...prev, new_notification]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter(notification => notification.id !== new_notification.id));
        }, 3000);
    }

    const categories = Object.values(categories_position);

    return (
        <div className='menupage-container'>
            <h1>Meni</h1>
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
                            newNotification={newNotification}
                        />
                    )
                })
                }   
                { Object.keys(category).length != 0 && <ProductList category={category} newNotification={newNotification} /> } 
            </div>
            {
                notifications.length > 0 && <Notification content={notifications} />
            }
        </div>
    )
}

export default Menu;