import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryForm from './CategoryForm.jsx';
import MenuIcon from '../../components/icons/MenuIcon.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';

const CategoryList = () => {
  	const [category_list, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open_form, setOpenForm] = useState(false);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categories = await window.api.fetchData('categories/all/');
				setCategories(categories);
			} catch (err) {
				console.error('Error fetching categories:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();  
	}, []);

	const closeForm = () => {
		setOpenForm(false);
	}

	if (loading) return <h1>LOADING ...</h1>

	if (category_list.length > 0) {
		return (
			<div>
				<ul>
				{
					category_list.map((category) => (
				<li key={category._id}>{category.code ?? 'undefined'}  - {category.title ?? 'undefined'}</li>
				))
					}
				</ul>
				{ open_form && <CategoryForm closeForm={closeForm}/> }
			</div>
		);
	}

	const openCreateCategoryForm = () => {
		setOpenForm(true);
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
