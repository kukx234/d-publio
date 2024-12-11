import React, { useState, useEffect } from 'react';
const axios = require('axios');
import CategoryForm from './CategoryForm.jsx';

const CategoryList = () => {
  	const [category_list, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open_form, setOpenForm] = useState(true);

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
				{ open_form && <CategoryForm /> }
			</div>
		);
	}


	return (
		<div>
			Nema kategorija
			{ open_form && <CategoryForm /> }
		</div>
	);
}

export default CategoryList;
