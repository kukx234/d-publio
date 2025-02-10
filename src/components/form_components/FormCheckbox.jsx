import React from "react";

const FormCheckbox = ({ label_name, field_name, type, input_value, on_change, class_name='form-default-checkbox' }) => {
    return (
        <div className={class_name}>
            <label>{label_name}</label>
            <label className="checkbox-toggle">
                <input type={type} name={field_name} checked={!!input_value} onChange={on_change}/>
                <span className="checkbox-dot"></span>
            </label>
            
        </div>
    )
}

export default FormCheckbox;