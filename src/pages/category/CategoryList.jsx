import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryForm from './CategoryForm.jsx';
import MenuIcon from '../../components/icons/MenuIcon.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import RightClickMenu from '../../components/RightClickMenu.jsx';

const CategoryList = ({ position=0, level=1, updateCategoriesPosition, setCategoryId }) => {
  	const [category_list, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open_form, setOpenForm] = useState(false);
	const [context_menu_data, setContextMenuData] = useState({});

	useEffect(() => {
		if (!open_form) {
			const fetchCategories = async () => {
				try {
					let query_string = `categories/all/?level=${level}`;
					if (level > 1) {
						query_string += `&position=${position}`;
					}
					const categories = await window.api.fetchData(query_string);
					setCategories(categories);
				} catch (err) {
					console.error('Error fetching categories:', err);
				} finally {
					setLoading(false);
				}
			};
	
			fetchCategories();  
		}
	}, [open_form, position]);

	const closeForm = () => {
		setOpenForm(false);
	}

	const openCreateCategoryForm = () => {
		setOpenForm(true);
	}

	const checkForSubcategories = async (event) => {
		let category_id = event.target.getAttribute('data-category_id');
		if (!category_id) {
			return;
		}

		let category = category_list.find(category => category._id === category_id);
		if (!category) {
			return;
		}

		let level = category.level + 1;
		let query_string = `categories/all/?level=${level}&limit=1`;
		if (level > 1) {
			query_string += `&position=${category.position}`;
		}
		const subcategories = await window.api.fetchData(query_string);
		if(subcategories.length > 0) {
			setCategoryId(0);
			updateCategoriesPosition(level, category.position);
			return;
		}

		updateCategoriesPosition(category.level, category.position, true);
		setCategoryId(category_id);
	}

	const handleRightClick = (event) => {
		const category_id = event.target.getAttribute('data-category_id');
		if (!category_id) {
			return;
		}

		setContextMenuData({
			category_id: category_id,
			x: event.pageX,
			y: event.pageY
		});
	}

	const closeContextMenu = () => {
		setContextMenuData({});
	}

	const editCategory = () => {
		console.log('uredi kategoriju');
		//treba otvoriti formu i trebe formu popuniti već s podatcima
	}

	const deleteCategory = () => {
		console.log('obriši kategoriju');
		//TODO treba prvo prikazati jedan popup dal je siguran da želi obrisati i onda pokrenuti brisanje
	}

	const context_menu_options = [
		{label: 'Uredi kategoriju', contextFn: editCategory},
		{label: 'Obriši kategoriju', contextFn: deleteCategory, class_name:"red-text"}
	]

	if (loading) return <h1>LOADING ...</h1>

	if (category_list.length > 0) {
		return (
			<div className={`category-list ${level != 1 ? "extra_list" : ""}`}>
				<ul>
					{
					category_list.map((category) => (
						<li 
							onClick={checkForSubcategories} 
							key={category._id} 
							data-category_id={category._id}
							onContextMenu={handleRightClick}
						>
							{category.title ?? 'undefined'}
						</li>
					))
					}
					{ level === 1 && <PrimaryButton class_name="primary-btn btn_list" text="Kreiraj Kategoriju" on_click={openCreateCategoryForm}/> }
				</ul>
				{ open_form && <CategoryForm closeForm={closeForm}/> }
				{ 
				Object.keys(context_menu_data).length > 0 && 
				<RightClickMenu 
					options={context_menu_options} 
					x={context_menu_data.x} 
					y={context_menu_data.y} 
					handleCloseMenu={closeContextMenu} />
				}
			</div>
		);
	}

	return (
		<div className='no-category-cont'>
			<div className='no-category-inner'>
				<MenuIcon height="51" width="51"/>
				<span>Nema kategorija</span>
				<PrimaryButton text="Kreiraj Kategoriju" on_click={openCreateCategoryForm}/>
				<span>ILI</span>
				<PrimaryButton text="Import Excel" />
			</div>
			{ open_form && <CategoryForm closeForm={closeForm} /> }
		</div>
	);
}

export default CategoryList;
