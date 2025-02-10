import React, { useState, useEffect } from 'react';
const axios = require('axios');
import FormFields from '../../components/FormFields.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import CloseIcon from '../../components/icons/CloseIcon.jsx'

const CategoryForm = ({closeForm}) => {
  const [category_fields, setCategoryFields] = useState({});

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

  const handleFormSubmit = async (form_data) => {
    try {
      const post_response = await window.api.postData('categories/', form_data);
      console.log(post_response);
    } catch (err) {
      console.error('Error creating category:', err);
    }

    //TODO nakon uspiješnog kreiranja treba zatvoriti ovu formu 
    //a to mogu jedino ako iz CategoryList pagea poslijedim funckiju za zatvaranje category forme
  };

    return (
        <div className='form-cont'>
          <div className='form-inner'>
            <div>
              <div className='form-title'>
                <h3>Nova Kategorija</h3>
                <CloseIcon onClick={closeForm} className="close-icon"/>
              </div>
              
              <div className='input-cont'>
                { Object.keys(category_fields).length > 0 && <FormFields fields={category_fields} onSubmit={handleFormSubmit} />}
              </div>
            </div>
            <div className='form-btns'>
              <PrimaryButton text="Dodaj Kategorije" on_click={()=>{}} class_name='primary-form-btn'/>
              <PrimaryButton text="Import Excel" on_click={()=>{}} class_name='secondary-form-btn' />
            </div>
          </div>
        </div>
    )
}

export default CategoryForm;