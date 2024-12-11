import React, { useState, useEffect } from 'react';
const axios = require('axios');

const UserRoleList = () => {
  	const [user_roles_list, setUserRoles] = useState([]);
	const [loading, setLoading] = useState(true);

  	useEffect(() => {
		const fetchUserRoles = async () => {
			try {
				const user_roles = await window.api.fetchData('roles/all/');
				setUserRoles(user_roles);
			} catch (err) {
				console.error('Error fetching user roles:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchUserRoles();  
	}, []);

	if (loading) return <h1>LOADING ...</h1>
	return (
			<div>
				<h1>Lista korisnik rola</h1>
				<ul>
			{
					user_roles_list.map((user_role) => (
				<li key={user_role._id}>{user_role.code ?? 'undefined'}  - {user_role.title ?? 'undefined'}</li>
				))
					}
			</ul>
			</div>
	);
}

export default UserRoleList;
