import React, { useState, useEffect } from 'react';
const axios = require('axios');
import PrimaryButton from '../../components/PrimaryButton.jsx';
import UserForm from './UserForm.jsx';
import Popup from '../../components/Popup.jsx';

const UserList = () => {
  	const [users_list, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
    const [open_form, setOpenForm] = useState(false);
    const [user, setUser] = useState({});
    const [popup_content, setPopupContent] = useState({});

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

    useEffect(() => {
		fetchUsers();  
	}, [open_form]);

    const openUserForm = (user_id=false) => {
		if (user_id) {
			const current_user = users_list.find(user => user._id == user_id);
			setUser(current_user);
		}

		setOpenForm(true);
	}

    const closeForm = () => {
		setUser({})
		setOpenForm(false);
	}

	const createUser = async (form_data) => {
		try {
		  const post_response = await window.api.postData('users/', form_data);
		  closeForm();
		} catch (err) {
		  console.error('Error creating / update user:', err);
		}
	};

	const updateUser = async (form_data, user_id) => {
		try {
			const put_response = await window.api.putData(`users/${user_id}`, form_data);
			closeForm();
		} catch (err) {
			console.error('Error creating / update user:', err);
		}
	}

	const deleteUser = async (confirm_delete=false) => {
		if (!confirm_delete) {
			closeForm();
			setPopupContent({
				open_popup: true,
				content: {
					title: "Jeste li sigurni da želite obrisati korisnika?",
					subtitle: user.first_name + ' ' + user.last_name + " (" + user.email +")",
					text: "Naslov korisnika ( email )",
					primary_btn: {
						text: "Obriši",
						btnFn: () => { deleteUser(true) },
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
			const deleted = await window.api.deleteData('users/' + user._id);
			setPopupContent({});
            fetchUsers();
		} catch (error) {
			console.log('Error deleting user: ' + error);
		}
	}

    const filteredUsers = users_list.filter(user =>
        (user.first_name + ' ' + user.last_name).toLowerCase().includes(search.toLowerCase()) 
    );

  if (loading) return <h1>LOADING ...</h1>
  return (
		<div className='page-container'>
			<h1>Lista korisnika</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pretraži..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <PrimaryButton 
                    class_name="primary-btn" 
                    text="Dodaj korisnika" 
                    on_click={() => {openUserForm()}}
                /> 
            </div>

			 <table>
                <thead>
                    <tr>
                        <th>Ime Prezime</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Aktivan od</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr 
                            key={user._id}
                            onClick={() => { openUserForm(user._id) }}
                            >
                            <td><strong>{user.first_name  + ' ' + user.last_name}</strong></td>
                            <td>{user.email}</td>
                            <td>+385 {user.mobile}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString("en-GB")}</td>
                            <td>
                                <span className="status">
                                    {user.visible ? "🟩 Active" : "🟥 Deactivated"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            { 
                open_form &&
                <UserForm 
                    user={user} 
                    closeForm={closeForm}
                    createUser={createUser}
                    updateUser={updateUser}
                    deleteUser={deleteUser}
                /> 
            }
            {
					(popup_content.open_popup || false) &&
					<Popup content={popup_content.content} />
				}
		</div>
  );
}

export default UserList;
