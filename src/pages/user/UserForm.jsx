import React, { useState, useEffect } from 'react';
const axios = require('axios');
import FormFields from '../../components/FormFields.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import CloseIcon from '../../components/icons/CloseIcon.jsx'

const UserForm = ({closeForm, user={}, createUser, updateUser, deleteUser}) => {
  const [user_fields, setUserFields] = useState({});
  const [form_submited, setSubmitForm] = useState(false);

  useEffect(() => {
      const fetchFields = async () => {
        try {
          const fields = await window.api.fetchData('utils/get_model_fields/User'); 
          setUserFields(fields);
        } catch (err) {
          console.error('Error fetching user fields:', err);
        }
      }
  
      fetchFields();
    }, []);

    const handleFormSubmit = (form_data) => {
      setSubmitForm(false);
     
      if (user._id) {
        updateUser(form_data, user._id);
      } else {
        createUser(form_data);
      }
    }

    return (
      <div className='form-cont'>
        <div className='form-inner'>
          <div className='form-inner-fields'>
            <div className='form-title'>
              <h3>{user._id ? "Ažuriraj korisnika" : "Novi korisnik"}</h3>
              <CloseIcon onClick={closeForm} className="close-icon"/>
            </div>
            
            <div className='input-cont'>
              { 
                Object.keys(user_fields).length > 0 && 
                <FormFields 
                  default_values={user}
                  form_submited={form_submited}
                  fields={user_fields} 
                  onSubmit={handleFormSubmit} 
                />
              }
            </div>
          </div>
            {
            user._id 
            ? 
            <div className='form-btns'>
              <PrimaryButton text="Obriši korisnika" on_click={() => deleteUser()} class_name='delete-product-btn'/>
              <PrimaryButton text="Ažuriraj korisnika" on_click={() => setSubmitForm(true)} class_name='primary-form-btn'/>
            </div>    
            :
            <div className='form-btns'>
              <PrimaryButton text="Dodaj korisnika" on_click={() => setSubmitForm(true)} class_name='primary-form-btn'/>
              <PrimaryButton text="Import Excel" on_click={()=>{}} class_name='secondary-form-btn' />
            </div>    
            }
        </div>
      </div>
    )
}

export default UserForm;