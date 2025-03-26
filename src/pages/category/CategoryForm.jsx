import React, { useState, useEffect } from 'react';
const axios = require('axios');
import FormFields from '../../components/FormFields.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import CloseIcon from '../../components/icons/CloseIcon.jsx'

const CategoryForm = ({closeForm, category={}, updateCategory, createCategory}) => {
  const [category_fields, setCategoryFields] = useState({});
  const [form_submited, setSubmitForm] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fields = await window.api.fetchData('utils/get_model_fields/Category'); 
        setCategoryFields(fields);
      } catch (err) {
        console.error('Error fetching category fields:', err);
      }
    }

    fetchFields();
  }, []);

  const handleFormSubmit = (form_data) => {
    setSubmitForm(false);
    if (category._id) {
      updateCategory(form_data, category._id);
    } else {
      createCategory(form_data);
    }
  }

  return (
      <div className='form-cont'>
        <div className='form-inner'>
          <div>
            <div className='form-title'>
              { category._id ? <h3>Ažuriraj Kategoriju</h3> : <h3>Nova Kategorija</h3> }
              <CloseIcon onClick={closeForm} className="close-icon"/>
            </div>
            
            <div className='input-cont'>
              { 
                Object.keys(category_fields).length > 0 && 
                <FormFields 
                  default_values={category}
                  form_submited={form_submited}
                  fields={category_fields} 
                  onSubmit={handleFormSubmit} 
                />
              }
            </div>
          </div>
          { category._id
          ? 
          <div className='form-btns'>
            <PrimaryButton text="Ažuriraj Kategoriju" on_click={() => setSubmitForm(true)} class_name='primary-form-btn'/>
          </div>
          : 
          <div className='form-btns'>
            <PrimaryButton text="Dodaj Kategoriju" on_click={() => setSubmitForm(true)} class_name='primary-form-btn'/>
            <PrimaryButton text="Import Excel" on_click={()=>{}} class_name='secondary-form-btn' />
          </div>
          }
        </div>
      </div>
  )
}

export default CategoryForm;