import React, { useState, useEffect } from 'react';
const axios = require('axios');
import FormFields from '../../components/FormFields.jsx';

const CategoryForm = () => {
  const [category_fields, setCategoryFields] = useState([]);

  useEffect(() => {
    try {
      const fields = window.api.fetchData('utils/get_model_fields/Category');
      setCategoryFields(fields);
      console.log(category_fields);
      
    } catch (error) {
      console.error('Error fetching category fields:', err);
    }
  }, []);

  const handleFormSubmit = (form_data) => {
    console.log('Form submitted:', form_data);
  };

    return (
        <div>
          <h1>Forma kategorije</h1>
          { category_fields.length > 0 && <FormFields fields={category_fields} onSubmit={handleFormSubmit} />}
        </div>
    )
}

export default CategoryForm;