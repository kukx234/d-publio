import React, { useState, useEffect } from 'react';
const axios = require('axios');
import MenuIcon from '../../components/icons/MenuIcon.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import ProductForm from './ProductForm.jsx';
import Popup from '../../components/Popup.jsx';

const ProductList = ({category, newNotification=()=>{}}) => {
	const [products_list, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open_form, setOpenForm] = useState(false);
	const [product, setProduct] = useState({
		category: category
	});
	const [popup_content, setPopupContent] = useState({});

	const fetchProducts = async () => {
		try {
			const products = await window.api.fetchData("products/all/" + "?category_id=" + category._id);
			setProducts(products);
		} catch (err) {
			console.error('Error fetching products:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();  
	}, [open_form, category]);

	const openProductForm = (product_id=false) => {
		if (product_id) {
			const current_product = products_list.find(product => product._id == product_id);
			setProduct(current_product);
		}

		setOpenForm(true);
	}

	const closeForm = () => {
		setProduct({ category: product.category })
		setOpenForm(false);
	}

	const createProduct = async (form_data) => {
		try {
		  const post_response = await window.api.postData('products/', form_data);
		  newNotification({
			id: post_response._id,
			title: 'Proizvod uspiješno kreiran',
			subtitle: post_response.title
		  });
		  closeForm();
		} catch (err) {
		  console.error('Error creating / update product:', err);
		}
	};

	const updateProduct = async (form_data, product_id) => {
		try {
			const put_response = await window.api.putData(`products/${product_id}`, form_data);
			newNotification({
				id: put_response._id,
				title: 'Proizvod uspiješno ažuriran',
				subtitle: put_response.title
			  });
			closeForm();
		} catch (err) {
			console.error('Error creating / update product:', err);
		}
	}

	const deleteProduct = async (confirm_delete=false) => {
		if (!confirm_delete) {
			closeForm();
			setPopupContent({
				open_popup: true,
				content: {
					title: "Jeste li sigurni da želite obrisati Proizvod?",
					subtitle: product.title + " (" + product.code +")",
					text: "Naslov Proizvoda ( šifra )",
					primary_btn: {
						text: "Obriši",
						btnFn: () => { deleteProduct(true) },
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
			const deleted = await window.api.deleteData('products/' + product._id);
			newNotification({
				id: product._id,
				title: 'Proizvod uspiješno obrisan',
				subtitle: product.title
			  });
			setPopupContent({});
			fetchProducts();
		} catch (error) {
			console.log('Error deleting product: ' + error);
		}
	}

	if (loading) return <h1>LOADING ...</h1>

	if (products_list.length > 0) {
		return (
			<div className="product-list">
				<ul>
					{
					products_list.map((product) => (
						<li 
							key={product._id}
							onClick={() => { openProductForm(product._id)}}
						>
							<h4>{product.title ?? 'undefined'}</h4>
							<span>{product.price ?? 0} €</span>
						</li>
					))
					}
					{
						<PrimaryButton 
							class_name="primary-btn btn_list" 
							text="Dodaj Proizvod" 
							on_click={() => {openProductForm()}}
						/> 
					}
				</ul>
				{ 
					open_form &&
					<ProductForm 
						product={product} 
						closeForm={closeForm}
						createProduct={createProduct}
						updateProduct={updateProduct}
						deleteProduct={deleteProduct}
					/> 
				}
				{
					(popup_content.open_popup || false) &&
					<Popup content={popup_content.content} />
				}
			</div>
		);
	}

    return (
		<div className='no-category-cont no-product'>
			<div className='no-category-inner'>
				<MenuIcon height="51" width="51"/>
				<span>Nema Proizvoda</span>
				<PrimaryButton 
					text="Dodaj Proizvod"
					on_click={() => {openProductForm()}}
				/>
			</div>

			{ 
				open_form && 
				<ProductForm 
					product={product} 
					closeForm={closeForm}
					createProduct={createProduct}
					updateProduct={updateProduct}
				/> 
			}
		</div>
    );
}

export default ProductList;