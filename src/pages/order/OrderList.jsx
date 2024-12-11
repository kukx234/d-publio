import React, { useState, useEffect } from 'react';
const axios = require('axios');

const OrderList = () => {
  const [orders_list, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

  useEffect(() => {
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

		fetchOrders();  
	}, []);

  if (loading) return <h1>LOADING ...</h1>
  return (
	<div>
		<h1>Lista narudžbi</h1>
		<ul>
			{
			orders_list.map((order) => (
				<li key={order._id}>{order.order_number ?? 'undefined'}  - {order.total_amount ?? 'undefined'}</li>
			))
			}
		</ul>
	</div>
  );
}

export default OrderList;
