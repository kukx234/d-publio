import React, { useState, useEffect } from 'react';
const axios = require('axios');
import FormFields from '../../components/FormFields.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import CloseIcon from '../../components/icons/CloseIcon.jsx'

const UserRoleForm = ({closeForm, user_role={}, createUserRole, updateUserRole, deleteUserRole}) => {
  const [role_fields, setRoleFields] = useState({});
  const [form_submited, setSubmitForm] = useState(false);

  useEffect(() => {
      const fetchFields = async () => {
        try {
          const fields = await window.api.fetchData('utils/get_model_fields/Role'); 
          setRoleFields(fields);
        } catch (err) {
          console.error('Error fetching user role fields:', err);
        }
      }
  
      fetchFields();
    }, []);

    const handleFormSubmit = (form_data) => {
      setSubmitForm(false);
     
      if (user_role._id) {
        updateUserRole(form_data, user_role._id);
      } else {
        createUserRole(form_data);
      }
    }

    return (
      <div className='form-cont'>
        <div className='form-inner'>
          <div className='form-inner-fields'>
            <div className='form-title'>
              <h3>{user_role._id ? "Ažuriraj rolu" : "Nova rola"}</h3>
              <CloseIcon onClick={closeForm} className="close-icon"/>
            </div>
            
            <div className='input-cont'>
              { 
                Object.keys(role_fields).length > 0 && 
                <FormFields 
                  default_values={user_role}
                  form_submited={form_submited}
                  fields={role_fields} 
                  onSubmit={handleFormSubmit} 
                />
              }
            </div>
          </div>
            {
            user_role._id 
            ? 
            <div className='form-btns'>
              <PrimaryButton text="Obriši rolu" on_click={() => deleteUserRole()} class_name='delete-product-btn'/>
              <PrimaryButton text="Ažuriraj rolu" on_click={() => setSubmitForm(true)} class_name='primary-form-btn'/>
            </div>    
            :
            <div className='form-btns'>
              <PrimaryButton text="Dodaj rolu" on_click={() => setSubmitForm(true)} class_name='primary-form-btn'/>
              <PrimaryButton text="Import Excel" on_click={()=>{}} class_name='secondary-form-btn' />
            </div>    
            }
        </div>
      </div>
    )
}

export default UserRoleForm;