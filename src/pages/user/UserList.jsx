import React, { useState, useEffect } from 'react';
const axios = require('axios');
import PrimaryButton from '../../components/PrimaryButton.jsx';
import UserForm from './UserForm.jsx';
import Popup from '../../components/Popup.jsx';
import Table from '../../components/TableComponent.jsx';
import Notification from '../../components/Notification.jsx';
import Loader from '../../components/Loader.jsx';

const UserList = () => {
  	const [users_list, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
    const [open_form, setOpenForm] = useState(false);
    const [user, setUser] = useState({});
    const [popup_content, setPopupContent] = useState({});
	const [notifications, setNotifications] = useState([]);

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

	const newNotification = (data) => {
        const new_notification = {
            id: data.id,
            title: data.title, 
            subtitle: data.subtitle ?? '', 
            classes: data.clases ?? '' 
        };

        setNotifications((prev) => [...prev, new_notification]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter(notification => notification.id !== new_notification.id));
        }, 3000);
    }

	const createUser = async (form_data) => {
		try {
			const post_response = await window.api.postData('users/', form_data);
			newNotification({
				id: post_response._id,
				title: 'Korisnik uspiješno kreiran',
				subtitle: post_response.first_name + ' ' + post_response.last_name
			});
		  closeForm();
		} catch (err) {
		  console.error('Error creating / update user:', err);
		}
	};

	const updateUser = async (form_data, user_id) => {
		try {
			const put_response = await window.api.putData(`users/${user_id}`, form_data);
			newNotification({
				id: put_response._id,
				title: 'Korisnik uspiješno ažuriran',
				subtitle: put_response.first_name + ' ' + put_response.last_name
			});
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
			newNotification({
				id: user._id,
				title: 'Korisnik uspiješno obrisan',
				subtitle: user.first_name + ' ' + user.last_name
			});
			setPopupContent({});
            fetchUsers();
		} catch (error) {
			console.log('Error deleting user: ' + error);
		}
	}

    const filteredUsers = users_list.filter(user =>
        (user.first_name + ' ' + user.last_name).toLowerCase().includes(search.toLowerCase()) 
    );

    const columns = [
        { key: "name", label: "Ime Prezime" , render: (data) => { return data.first_name + ' ' + data.last_name }},
        { key: "email", label: "Email" },
        { key: "mobile", label: "Telefon", render: (data) => { return '+385' + data.mobile }},
        { key: "createdAt", label: "Aktivan od", render: (data) => { return new Date(data.createdAt).toLocaleDateString("en-GB") }},
        { key: "status", label: "Status", render: (data) => { return data.visible ? "🟩 Active" : "🟥 Deactivated" } }
    ];

  if (loading) return <div className='loader-cont'><Loader/></div>
  return (
    <div className='page-wrapper'>
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

            <Table
                columns={columns} 
                data={filteredUsers} 
                maxHeightOffset={80}
                onRowClick={openUserForm}
            />
			
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
			{
                notifications.length > 0 && <Notification content={notifications} />
            }
		</div>
    </div>    
  );
}

export default UserList;
