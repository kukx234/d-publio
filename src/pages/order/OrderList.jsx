import React, { useState, useEffect } from 'react';
const axios = require('axios');
import Table from '../../components/TableComponent.jsx';

const OrderList = () => {
  	const [orders_list, setOrders] = useState([]);
  	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");

  	const fetchOrders = async () => {
		try {
			const orders = await window.api.fetchData('orders/all/');
			setOrders(orders);
		} catch (err) {
			console.error('Error fetching orders:', err);
		} finally {
			setLoading(false);
		}
	};

  	useEffect(() => {
		fetchOrders();  
	}, []);

	const filteredOrders = orders_list.filter(order => {

		const product_match = order.products.some(product_data => {
			if (!product_data) {
				return false;
			}

			return product_data.product.code.toLowerCase().includes(search.toLowerCase()) ||
				   product_data.product.title.toLowerCase().includes(search.toLowerCase())
		});
	
		let user_match = false;
		if (order.user) {
			user_match =
				order.user.first_name.toLowerCase().includes(search.toLowerCase()) ||
				order.user.last_name.toLowerCase().includes(search.toLowerCase());
		}
		
	

		return product_match || user_match;
	});

	const columns = [
		{ key: "order_number", label: "Broj Narudžbe" },
		{ key: "products", label: "Proizvodi", render: (data) => { return data.products.map(product_data => product_data.product.title + ',') }},
        { key: "user", label: "Korisnik" , render: (data) => { return data?.user?.first_name + ' ' + data?.user?.last_name }},
        { key: "total_amount", label: "Ukupno", render: (data) => { return data.total_amount + '€' }},
        { key: "createdAt", label: "Aktivan od", render: (data) => { return new Date(data.createdAt).toLocaleDateString("en-GB") }},
    ];

  if (loading) return <h1>LOADING ...</h1>
  return (
	<div className='page-wrapper'>
		<div className='page-container'>
			<h1>Lista Narudžbi</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pretraži..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Table
                columns={columns} 
                data={filteredOrders} 
                maxHeightOffset={80}
                //onRowClick={openUserForm}
            />
		</div>
    </div> 
  );
}

export default OrderList;
