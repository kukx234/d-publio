import React, { useState, useEffect } from 'react';
const axios = require('axios');
import Table from '../../components/TableComponent.jsx';
import Loader from '../../components/Loader.jsx';
import Checkbox from '../../components/Checkbox.jsx';

const OrderList = () => {
  	const [orders_list, setOrders] = useState([]);
  	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [open_order_form, setOpenOrderForm] = useState("");

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

	const handleCompleteOrder = async (is_checked, order_id) => {
		try {
			let update_data = is_checked ? {completedAt: new Date()} : {completedAt: null};
			const put_response = await window.api.putData(`orders/${order_id}`, update_data);
		} catch (err) {
			console.error('Error completing order:', err);
		}
	}

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
		{ key: "completedAt", label: "Odrađeno", render: (data) => { return <Checkbox checked={data.completedAt || false} onChange={(e) => handleCompleteOrder(e, data._id)} /> }},
    ];

  if (loading) return <div className='loader-cont'><Loader/></div>
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
                onRowClick={() => { setOpenOrderForm(true) }}
            />
		</div>
    </div> 
  );
}

export default OrderList;
