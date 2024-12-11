import React, { useState, useEffect } from 'react';
const axios = require('axios');

const ProductList = () => {
	const [products_list, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const products = await window.api.fetchData('products/all/');
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

    return (
		<div>
			<h1>Lista proizvoda</h1>
			<ul>
            {
			products_list.map((product) => (
                <li key={product._id}>{product.title ?? 'undefined'}  - €{product.price ?? 'undefined'}</li>
            ))
			}
        	</ul>
		</div>
    );
}

export default ProductList;