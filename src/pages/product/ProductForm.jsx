import React, { useState, useEffect } from 'react';
const axios = require('axios');
import FormFields from '../../components/FormFields.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import CloseIcon from '../../components/icons/CloseIcon.jsx'

const ProductForm = ({closeForm, product={}, createProduct, updateProduct, deleteProduct}) => {
  const [product_fields, setProductFields] = useState({});
  const [form_submited, setSubmitForm] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fields = await window.api.fetchData('utils/get_model_fields/Product'); 
        setProductFields(fields);
      } catch (err) {
        console.error('Error fetching product fields:', err);
      }
    }

    fetchFields();
  }, []);

  const handleFormSubmit = (form_data) => {
    setSubmitForm(false);
   
    if (product._id) {
      updateProduct(form_data, product._id);
    } else {
      createProduct(form_data);
    }
  }

  return (
    <div className='form-cont'>
      <div className='form-inner'>
        <div className='form-inner-fields'>
          <div className='form-title'>
            <h3>{product._id ? "Ažuriraj proizvod" : "Novi Proizvod"}</h3>
            <CloseIcon onClick={closeForm} className="close-icon"/>
          </div>
          
          <div className='input-cont'>
            { 
              Object.keys(product_fields).length > 0 && 
              <FormFields 
                default_values={product}
                form_submited={form_submited}
                fields={product_fields} 
                onSubmit={handleFormSubmit} 
              />
            }
          </div>
        </div>
          {
          product._id 
          ? 
          <div className='form-btns'>
            <PrimaryButton text="Obriši proizvod" on_click={() => deleteProduct()} class_name='delete-product-btn'/>
            <PrimaryButton text="Ažuriraj proizvod" on_click={() => setSubmitForm(true)} class_name='primary-form-btn'/>
          </div>    
          :
          <div className='form-btns'>
            <PrimaryButton text="Dodaj Proizvod" on_click={() => setSubmitForm(true)} class_name='primary-form-btn'/>
            <PrimaryButton text="Import Excel" on_click={()=>{}} class_name='secondary-form-btn' />
          </div>    
          }
      </div>
    </div>
  )
}

export default ProductForm;