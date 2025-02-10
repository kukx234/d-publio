import React from 'react';

const PrimaryButton = ({ text, on_click, class_name="primary-btn" }) => {
    return (
        <div className={class_name} onClick={on_click}>
            {text}
        </div>
    );
}

export default PrimaryButton;