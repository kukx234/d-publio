import React from "react";

const FormInput = ({ label_name, field_name, type, input_value, on_change, class_name='form-default-input' }) => {
    return (
        <div className={class_name}>
            <label>{label_name}</label>
            <input 
                type={type}
                name={field_name}
                value={ input_value || ''}
                onChange={on_change}
            />
        </div>
    )
} 

export default FormInput;