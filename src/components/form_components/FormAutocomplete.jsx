import React, { useState } from "react";
import Select from "react-select";

const FormAutocomplete = ({ label_name, field_name, type, options, on_change, class_name='form-default-input', selected }) => {
    const [selected_option, setSelectedOption] = useState(selected);
    
    const handleChange = (data) => {
        setSelectedOption(data);
        on_change(false, {
            name: field_name,
            value: data.value
        });
    }

    return (
        <div className={class_name + " " + type}>
            <label>{label_name}</label>
            <Select
                options={options}
                value={selected_option}
                onChange={handleChange}
                placeholder=""
                isSearchable // Enables autocomplete search
            />
        </div>
    )
} 

export default FormAutocomplete;