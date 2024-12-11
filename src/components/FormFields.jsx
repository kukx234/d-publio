//utils/get_model_fields/Order
import React, { useState } from "react";
const axios = require('axios');

const FormFields = (fields, default_values = {}, onSubmit) => {
    const [form_data, setFormData] = useState(
        fields.reduce((acc, field) => {
          acc[field.name] = default_values[field.name] || '';
          return acc;
        }, {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...form_data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass form data to the parent
    };


    return (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: '10px' }}>
              <label>
                {field.label}:
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  //placeholder={field.placeholder}
                  value={form_data[field.name]}
                  onChange={handleChange}
                />
              </label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
    );
}

export default FormFields;