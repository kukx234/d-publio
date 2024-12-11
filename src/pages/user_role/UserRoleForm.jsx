import React, { useState, useEffect } from 'react';
const axios = require('axios');
import FormFields from '../../components/FormFields';

const UserRoleForm = () => {
  const [user_role_fields, setUserRoleFields] = useState([]);

  useEffect(() => {
    try {
      const fields = window.api.fetchData();
      setUserRoleFields(fields);
    } catch (error) {
      console.error('Error fetching user role fields:', err);
    }
  }, []);

  const handleFormSubmit = (form_data) => {
    console.log('Form submitted:', form_data);
  };

  return (
    <div>
       <h1>Reusable Form Example</h1>
       <FormFields fields={user_role_fields} onSubmit={handleFormSubmit} />
    </div>
  )
}

export default UserRoleForm;