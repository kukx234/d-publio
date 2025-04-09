import React, { useState } from 'react';

const Checkbox = ({ label=false, checked, onChange }) => {
    const [is_checked, setIsChecked] = useState(checked);

    const handleCheckboxChange = () => {
        let checked = is_checked ? false : true;
        setIsChecked(checked);
        onChange(checked);
    };

    return (
        <div className="custom-checkbox-container">
            <input
            type="checkbox"
            id="custom-checkbox"
            checked={is_checked}
            onChange={handleCheckboxChange}
            className="custom-checkbox-input"
            />
            {
                label &&  
                <label htmlFor="custom-checkbox" className="custom-checkbox-label">{label}</label>
            }
           
        </div>
    );
};

export default Checkbox;


