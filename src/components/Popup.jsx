import React from 'react';
import PrimaryButton from './PrimaryButton.jsx';

const Popup = ({ content }) => {

    return (
        <div className='popup-cont'>
            <div className='popup'>
                <h1 className='title'>{content.title || ''}</h1>
                <p className='subtitle'>{content.subtitle || ''}</p>
                <div className='buttons'>
                    <PrimaryButton text={content.primary_btn.text || ''} on_click={content.primary_btn.btnFn} class_name={content.primary_btn.class_name}/>
                    <PrimaryButton text={content.secondary_btn.text || ''} on_click={content.secondary_btn.btnFn} class_name={content.secondary_btn.class_name}/>
                </div>
            </div>
        </div>
    )
}

export default Popup;