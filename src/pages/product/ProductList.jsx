import React, { useState, useEffect } from 'react';
const axios = require('axios');
import MenuIcon from '../../components/icons/MenuIcon.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';

const ProductList = () => {
	const [products_list, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const products = await window.api.fetchData('products/all/'); //TODo treba dohvatiti za tu kategoriju
				setProducts(products);
			} catch (err) {
				console.error('Error fetching products:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();  
	}, []);

	if (loading) return <h1>LOADING ...</h1>

	if (products_list.length > 0) {
		return (
			<div className="product-list">
				{
				products_list.map((product) => (
					<div>
					<p>{product.title ?? undefined}</p>
					<span>{ product.price }</span>
					</div>
				))
				}
				<PrimaryButton text="Dodaj Proizvod"/>
			</div>
		);
	}

    return (
		<div className='no-category-cont no-product'>
			<div className='no-category-inner'>
				<MenuIcon height="51" width="51"/>
				<span>Nema Proizvoda</span>
				<PrimaryButton text="Dodaj Proizvod" />
			</div>
		</div>
    );
}

export default ProductList;