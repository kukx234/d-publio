import React, { useState } from "react";
import FormInput from "./form_components/FormInput.jsx";
import FormCheckbox from "./form_components/FormCheckbox.jsx";
import FormTextEditor from "./form_components/FormTextEditor.jsx";
import FormImportImage from "./form_components/FormImportImage.jsx";

const FormFields = ({fields, default_values = {}, onSubmit}) => {
    const [form_data, setFormData] = useState(default_values);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
          setFormData({ ...form_data, [name]: checked });
          return;
        }
        
        setFormData({ ...form_data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form_data); // Pass form data to the parent
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          {Object.keys(fields).map((field_key) => {
            const field = fields[field_key];
            return (
              field.type === 'image' ? (
                <FormImportImage 
                  key={field.code} 
                  field_name={field.name} 
                  input_value={form_data[field.code] || ''} 
                  onChange={() => {}} //TODO kako ćemo slike ubacivati u formu
                  label_name={field.name || 'Unknown'}
                />
              ) : field.type === 'texteditor' ? (
                <FormTextEditor 
                  key={field.code} 
                  field_name={field.name} 
                  input_value={form_data[field.code] || ''} 
                  onChange={handleChange} 
                  label_name={field.name || 'Unknown'}  />
              ) : field.type === 'checkbox' ? (
                <FormCheckbox 
                  key={field.code}
                  label_name={field.name || 'Unknown'}
                  field_name={field.code || ''}
                  type={field.type}
                  input_value={form_data[field.code] || 0}
                  on_change={handleChange}
                />
              ) : (
                <FormInput
                  key={field.code}
                  label_name={field.name || 'Unknown'}
                  field_name={field.code || ''}
                  type={field.type || 'text'}
                  input_value={form_data[field.code] || ''}
                  on_change={handleChange}
                />
              )
            );
          })}
        </div>
      </form>
    );
}

export default FormFields;