import React, { useState, useEffect } from 'react';
const axios = require('axios');

const UserList = () => {
  const [users_list, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

  useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users = await window.api.fetchData('users/all/');
				setUsers(users);
			} catch (err) {
				console.error('Error fetching users:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();  
	}, []);

  if (loading) return <h1>LOADING ...</h1>
  return (
		<div>
			<h1>Lista korisnika</h1>
			<ul>
          {
			      users_list.map((user) => (
              <li key={user._id}>{user.email ?? 'undefined'}  - {user.first_name ?? 'undefined'}</li>
            ))
			    }
        </ul>
		</div>
  );
}

export default UserList;
