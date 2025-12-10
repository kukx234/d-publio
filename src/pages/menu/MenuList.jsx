import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryList from '../category/CategoryList.jsx';
import ProductList from '../product/ProductList.jsx';
import '../../styles/menu.scss';
import Notification from '../../components/Notification.jsx';
import Loader from '../../components/Loader.jsx';

const Menu = () => {
    const [products_list, setProducts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [categories, setCategories] = useState({level_1: []});
    const [loading, setLoading] = useState(true);
    const [product_category_id, setProductCategory] = useState(false);
    const [selected_category, setSelectedCategory] = useState({level_1:[]});
    const [last_level, setLastLevel] = useState();

    useEffect(() => {
        if (categories.level_1) {
            fetchCategories();  
        }
    }, []);

    const fetchCategories = async (parent_category_id=null, level=1) => {
		let categories_arr = [];

		let query_string = `categories/all/?parent_category_id=${parent_category_id}`;
		try {
            setProductCategory(false);
             const level_key = 'level_' + level;

            if (parent_category_id) {
                const category_level = "level_" + (level - 1);
                const category = categories[category_level]?.find(category => category._id === parent_category_id);
               
                if (category) {
                    setSelectedCategory(prev => {
                        const newState = {};
                        
                        for (let i = 1; i < (level-1); i++) {
                            const key = `level_${i}`;
                            if (prev[key]) {
                                newState[key] = prev[key];
                            }
                        }

                        newState[category_level] = category;
                        
                        return newState;
                    });
                }
            }
            
			categories_arr = await window.api.fetchData(query_string);
			setCategories(prev => {
                const newState = {};
                
                for (let i = 1; i < level; i++) {
                    const key = `level_${i}`;
                    if (prev[key]) {
                        newState[key] = prev[key];
                    }
                }

                if (categories_arr.length > 0) {
                    newState[level_key] = categories_arr;
                    setLastLevel(level);
                }
                
                return newState;
            });

            if (categories_arr.length < 1) {
                fetchProducts(parent_category_id);
                setProductCategory(parent_category_id);
            }

		} catch (err) {
			console.error('Error fetching categories:', err);
		} finally {
			setLoading(false);
		}
	};

   const fetchProducts = async (category_id) => {
        try {
            const products = await window.api.fetchData("products/all/" + "?category_id=" + category_id);
            setProducts(products);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) return <div className='loader-cont'><Loader/></div>

    return (
        <div className='menupage-container'>
            <h1>Meni</h1>
            <div className="main-menu-cont">
                {
				Object.keys(categories).map((level_key, index) => {
                    return (
                        <CategoryList 
                            key={index}
                            level_key={level_key} 
                            category_list={categories[level_key]}
                            selected_category={selected_category}
                            fetchCategories={fetchCategories}
                            newNotification={newNotification}
                        />
                    )
                })
                }
                {
                    (products_list.length < 1) && 
                    <CategoryList 
                        level_key={"level_" + (last_level + 1)}
                        category_list={[]}
                        selected_category={selected_category}
                        fetchCategories={fetchCategories}
                        newNotification={newNotification}
                    />
                }
                {product_category_id && <ProductList
                    products_list={products_list} 
                    product_category_id={product_category_id}
                    fetchProducts={fetchProducts} 
                    newNotification={newNotification} />}
            </div>
            {
                notifications.length > 0 && <Notification content={notifications} />
            }
        </div>
    )
}

export default Menu;