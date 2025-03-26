import React from 'react';

const PrimaryButton = ({ text, on_click, class_name="" }) => {
    return (
        <div className={"primary-btn " + class_name} onClick={on_click}>
            {text}
        </div>
    );
}

export default PrimaryButton;