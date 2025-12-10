import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryForm from './CategoryForm.jsx';
import MenuIcon from '../../components/icons/MenuIcon.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import RightClickMenu from '../../components/RightClickMenu.jsx';
import Popup from '../../components/Popup.jsx';

const CategoryList = ({level_key, fetchCategories, selected_category, category_list, newNotification=()=>{} }) => {
	const [level_name, level_raw] = level_key.split('_');
	const level = Number(level_raw);
	const [open_form, setOpenForm] = useState(false);
	const [context_menu_data, setContextMenuData] = useState({});
	const [popup_content, setPopupContent] = useState({});
	const [new_category_data, setNewCategoryData] = useState();

	useEffect(() => {
		setNewCategoryData({
			parent_category_id: selected_category["level_" + (level-1)]?._id || null
		})
	}, []);
	
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

	//TODO umjesto desnog klika trebam staviti 3 točkice i omogućiti klik na to
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
			fetchCategories(form_data.parent_category_id || null, level);
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
			newNotification({
                id: context_menu_data.category._id,
                title: 'Kategorija uspiješno obrisana',
                subtitle: context_menu_data.category.title
            });
			setPopupContent({});
			fetchCategories(context_menu_data.category.parent_category_id || null, level);
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
		  fetchCategories(form_data.parent_category_id || null, level);
		} catch (err) {
		  console.error('Error creating / update category:', err);
		}
	};

	const context_menu_options = [
		{label: 'Uredi kategoriju', contextFn: () => {openCategoryForm(true)}},
		{label: 'Obriši kategoriju', contextFn: () => { deleteCategory(false) }, class_name:"red-text"}
	]

	if (category_list.length > 0) {
		return (
			<>
			<div className={`category-list ${level != 1 ? "extra_list" : ""}`}>
				<ul>
					{
					category_list.map((category) => (
						<li 
							className={selected_category[level_key]?._id === category._id ? "current_category" : ''}
							onClick={() => { fetchCategories(category._id, level+1) }} 
							key={category._id} 
							data-category_id={category._id}
							onContextMenu={handleRightClick}
						>
							{category.title ?? 'undefined'}
						</li>
					))
					}
				</ul>
				{ 
					<PrimaryButton 
						class_name="primary-btn btn_list" 
						text="Kreiraj Kategoriju" 
						on_click={() => { openCategoryForm(false) }}
					/> 
				}
			</div>
			{ 
				open_form && 
				<CategoryForm 
					category={context_menu_data.category || new_category_data || {}} 
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
			</>
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
					category={new_category_data || {}}
					updateCategory={updateCategory} 
					createCategory={createCategory} 
					closeForm={closeForm}
				/> 
			}
		</div>
	);
}

export default CategoryList;
