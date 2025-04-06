import React, { useState, useEffect} from "react";
import FormInput from "./form_components/FormInput.jsx";
import FormCheckbox from "./form_components/FormCheckbox.jsx";
import FormTextEditor from "./form_components/FormTextEditor.jsx";
import FormImportImage from "./form_components/FormImportImage.jsx";
import FormAutocomplete from "./form_components/FormAutocomplete.jsx";

const FormFields = ({fields, default_values = {}, onSubmit, form_submited}) => {
    const [form_data, setFormData] = useState(default_values);
    
    useEffect(() => {
      if (form_submited) {
        onSubmit(form_data); // Pass form data to the parent
      }
    }, [form_submited]);

    const handleChange = (e, data={}) => {
      if (Object.keys(data).length > 0) {
        const {name, value} = data;
        setFormData({ ...form_data, [name]: value });
        return;
      }
      
      const { name, value, type, checked } = e.target;
      
      if (type === 'checkbox') {
        setFormData({ ...form_data, [name]: checked });
        return;
      }
      
      setFormData({ ...form_data, [name]: value });
    };

    const getInputValue = (field) => {
      let input_value = form_data[field.code] || '';
      
      if (field.options.ref) {
        input_value = form_data[field.code]['_id'] || '';
      }

      return input_value;
    }

    const getSelectOptions = (field) => {
      let field_data = fields[field.code];
      const select_options = field_data?.options?.values.map(option => ({
        value: option._id, label: option.title
      }));

      return select_options;
    }

    return (
      <form>
        <div>
          {Object.keys(fields).map((field_key) => {
            const field = fields[field_key];
            return (
              field.type === 'image' ? (
                <FormImportImage 
                  key={field.code} 
                  field_name={field.name} 
                  input_value={getInputValue(field)} 
                  onChange={() => {}} //TODO kako ćemo slike ubacivati u formu
                  label_name={field.name || 'Unknown'}
                />
              ) : field.type === 'texteditor' ? (
                <FormTextEditor 
                  key={field.code} 
                  field_name={field.code} 
                  input_value={getInputValue(field)} 
                  on_change={handleChange} 
                  label_name={field.name || 'Unknown'}  />
              ) : field.type === 'checkbox' ? (
                <FormCheckbox 
                  key={field.code}
                  label_name={field.name || 'Unknown'}
                  field_name={field.code || ''}
                  type={field.type}
                  input_value={getInputValue(field)}
                  on_change={handleChange}
                />
              ) : field.type == 'hidden' ? (
                 
                <FormInput
                  key={field.code}
                  label_name={field.name || 'Unknown'}
                  field_name={field.code || ''}
                  type={field.type || 'text'}
                  input_value={getInputValue(field)}
                  on_change={handleChange}
                />
              ) : field.type == "autocomplete" ? (
                <FormAutocomplete
                    key={field.code}
                    label_name={field.name || 'Unknown'}
                    field_name={field.code || ''}
                    type={field.type || 'text'}
                    options={getSelectOptions(field)}
                    on_change={handleChange}
                    selected={{value:form_data?.role?._id || '', label:form_data?.role?.title || ''}} //TODO treba sreditii za ostala autocomplete polja
                />
              ) : (
                <FormInput
                  key={field.code}
                  label_name={field.name || 'Unknown'}
                  field_name={field.code || ''}
                  type={field.type || 'text'}
                  input_value={getInputValue(field)}
                  on_change={handleChange}
                />
              )
            );
          })}
        </div>
      </form>
    );
};

export default FormFields;