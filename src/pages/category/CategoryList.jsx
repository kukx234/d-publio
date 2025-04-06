import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryForm from './CategoryForm.jsx';
import MenuIcon from '../../components/icons/MenuIcon.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import RightClickMenu from '../../components/RightClickMenu.jsx';
import Popup from '../../components/Popup.jsx';
import Loader from '../../components/Loader.jsx';

const CategoryList = ({ position=0, level=1, updateCategoriesPosition, setCategory, newNotification=()=>{} }) => {
  	const [category_list, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open_form, setOpenForm] = useState(false);
	const [context_menu_data, setContextMenuData] = useState({});
	const [popup_content, setPopupContent] = useState({});
	const [hide_list, setHideList] = useState(false);
	
	useEffect(() => {
		if (!open_form) {
			fetchCategories();  
		}
	}, [open_form, position]);

	const fetchCategories = async (p=position, l=level) => {
		let categories = [];
		try {
			let query_string = `categories/all/?level=${l}`;
			if (l > 1) {
				query_string += `&position=${p}`;
			}
			categories = await window.api.fetchData(query_string);
			setCategories(categories);
		} catch (err) {
			console.error('Error fetching categories:', err);
		} finally {
			setLoading(false);
		}

		return categories;
	};

	const closeForm = () => {
		setOpenForm(false);
	}

	const openCategoryForm = (edit=false) => {
		if (edit) {
			closeContextMenu();
		} else {
			setContextMenuData({});
		}
		
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
			setCategory({});
			updateCategoriesPosition(level, category.position);
			return;
		}

		updateCategoriesPosition(category.level, category.position, true);
		setCategory(category);
	}

	const handleRightClick = (event) => {
		const category_id = event.target.getAttribute('data-category_id');
		if (!category_id) {
			return;
		}

		const current_category = category_list.find(category => category._id == category_id);
		const menu_width = document.querySelector(".menu-container").offsetWidth;
		setContextMenuData({
			open_menu: true,
			category: current_category,
			x: event.pageX - menu_width,
			y: event.pageY
		});
	}

	const closeContextMenu = () => {
		setContextMenuData({
			...context_menu_data,
			open_menu: false
		});
	}

	const updateCategory = async (form_data, category_id) => {
		try {
			const put_response = await window.api.putData(`categories/${category_id}`, form_data);
			newNotification({
                id: put_response._id,
                title: 'Kategorija uspiješno ažurirana',
                subtitle: put_response.title
            });
			closeForm();
		  } catch (err) {
			console.error('Error creating / update category:', err);
		  }
	}

	const deleteCategory = async (confirm_delete=false) => {
		if (!confirm_delete) {
			closeContextMenu();
			setPopupContent({
				open_popup: true,
				content: {
					title: "Jeste li sigurni da želite obrisati kategoriju?",
					subtitle: context_menu_data.category.title + " (" + context_menu_data.category.code +")",
					text: "Naslov kategorije ( šifra )",
					primary_btn: {
						text: "Obriši",
						btnFn: () => { deleteCategory(true) },
						class_name: "delete-btn",
					},
					secondary_btn: {
						text: "Odustani",
						btnFn: () => { setPopupContent({}) },
						class_name: "cancel-btn"
					}
				}
			});
			return;
		}

		try {
			const deleted = await window.api.deleteData('categories/' + context_menu_data.category._id);
			let position = context_menu_data.category.position.replace(/\.[^.]+$/, ""); 
			const categories = await fetchCategories(position, context_menu_data.category.level);

			newNotification({
                id: context_menu_data.category._id,
                title: 'Kategorija uspiješno obrisana',
                subtitle: context_menu_data.category.title
            });
			setPopupContent({});
			if (categories.length < 1) {
				setHideList(true);
			}
		} catch (error) {
			console.log('Error deleting category: ' + error);
		}
	}

	const createCategory = async (form_data) => {
		try {
		  const post_response = await window.api.postData('categories/', form_data);

		  newNotification({
			id: post_response._id,
			title: 'Kategorija uspiješno kreirana',
			subtitle: post_response.title
		  });
		  closeForm();
		} catch (err) {
		  console.error('Error creating / update category:', err);
		}
	};

	const context_menu_options = [
		{label: 'Uredi kategoriju', contextFn: () => { openCategoryForm(true) }},
		{label: 'Obriši kategoriju', contextFn: () => { deleteCategory(false) }, class_name:"red-text"}
	]

	if (hide_list) return '';

	if (loading) return <div className='loader-cont'><Loader/></div>

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
					{ 
						level === 1 && 
						<PrimaryButton 
							class_name="primary-btn btn_list" 
							text="Kreiraj Kategoriju" 
							on_click={openCategoryForm}
						/> 
					}
				</ul>
				{ 
					open_form && 
					<CategoryForm 
						category={context_menu_data.category || {}} 
						updateCategory={updateCategory} 
						createCategory={createCategory} 
						closeForm={closeForm}
					/> 
				}
				{ 
				(context_menu_data.open_menu || false) && 
				<RightClickMenu 
					options={context_menu_options} 
					x={context_menu_data.x} 
					y={context_menu_data.y} 
					handleCloseMenu={closeContextMenu} />
				}
				{
					(popup_content.open_popup || false) &&
					<Popup content={popup_content.content} />
				}
			</div>
		);
	}

	return (
		<div className='no-category-cont'>
			<div className='no-category-inner'>
				<MenuIcon height="51" width="51"/>
				<span>Nema kategorija</span>
				<PrimaryButton text="Kreiraj Kategoriju" on_click={openCategoryForm}/>
				<span>ILI</span>
				<PrimaryButton text="Import Excel" />
			</div>
			{ 
				open_form && 
				<CategoryForm  
					updateCategory={updateCategory} 
					createCategory={createCategory} 
					closeForm={closeForm}
				/> 
			}
		</div>
	);
}

export default CategoryList;
