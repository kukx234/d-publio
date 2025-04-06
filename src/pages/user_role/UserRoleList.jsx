import React, { useState, useEffect } from 'react';
const axios = require('axios');
import PrimaryButton from '../../components/PrimaryButton.jsx';
import UserRoleForm from './UserRoleForm.jsx';
import Popup from '../../components/Popup.jsx';
import Notification from '../../components/Notification.jsx';
import Table from '../../components/TableComponent.jsx';

const UserRoleList = () => {
  	const [user_roles_list, setUserRoles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
    const [open_form, setOpenForm] = useState(false);
    const [user_role, setUserRole] = useState({});
    const [popup_content, setPopupContent] = useState({});
    const [notifications, setNotifications] = useState([]);

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

    useEffect(() => {
		fetchUserRoles();  
	}, [open_form]);

    const openUserRoleForm = (user_role_id=false) => {
		if (user_role_id) {
			const current_user_role = user_roles_list.find(user_role => user_role._id == user_role_id);
			setUserRole(current_user_role);
		}

		setOpenForm(true);
	}

    const closeForm = () => {
		setUserRole({})
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

	const createUserRole = async (form_data) => {
		try {
            const post_response = await window.api.postData('roles/', form_data);
            newNotification({
                id: post_response._id,
                title: 'Rola uspiješno kreirana',
                subtitle: post_response.title
            });
		    closeForm();
		} catch (err) {
		  console.error('Error creating / update user role:', err);
		}
	};

	const updateUserRole = async (form_data, user_role_id) => {
		try {
			const put_response = await window.api.putData(`roles/${user_role_id}`, form_data);
            newNotification({
                id: user_role_id,
                title: 'Rola uspiješno ažurirana',
                subtitle: put_response.title
            });
			closeForm();
		} catch (err) {
			console.error('Error creating / update user role:', err);
		}
	}

	const deleteUserRole = async (confirm_delete=false) => {
		if (!confirm_delete) {
			closeForm();
			setPopupContent({
				open_popup: true,
				content: {
					title: "Jeste li sigurni da želite obrisati rolu korisnika?",
					subtitle: user_role.title + " (" + user_role.code +")",
					text: "Naslov role ( šifra )",
					primary_btn: {
						text: "Obriši",
						btnFn: () => { deleteUserRole(true) },
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
			const deleted = await window.api.deleteData('roles/' + user_role._id);
            newNotification({
                id: user_role._id,
                title: 'Rola uspiješno obrisana',
                subtitle: user_role.title
            });
			setPopupContent({});
            fetchUserRoles();
		} catch (error) {
			console.log('Error deleting user role: ' + error);
		}
	}

    const filteredUserRoles = user_roles_list.filter(role =>
        role.title.toLowerCase().includes(search.toLowerCase()) 
    );

    const columns = [
        { key: "code", label: "Šifra" },
        { key: "title", label: "Naziv" },
        { key: "createdAt", label: "Kreirano", render: (data) => { return new Date(data.createdAt).toLocaleDateString("en-GB") }}
    ];

  if (loading) return <h1>LOADING ...</h1>
  return (
    <div className='page-wrapper'>
        <div className='page-container'>
			<h1>Lista korisnik rola</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pretraži..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <PrimaryButton 
                    class_name="primary-btn" 
                    text="Dodaj rolu" 
                    on_click={() => {openUserRoleForm()}}
                /> 
            </div>

            <Table
                columns={columns} 
                data={filteredUserRoles} 
                maxHeightOffset={80}
                onRowClick={openUserRoleForm}
            />
           
            { 
                open_form &&
                <UserRoleForm 
                    user_role={user_role} 
                    closeForm={closeForm}
                    createUserRole={createUserRole}
                    updateUserRole={updateUserRole}
                    deleteUserRole={deleteUserRole}
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

export default UserRoleList;
