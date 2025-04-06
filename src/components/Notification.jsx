import React from 'react';
import SuccessIcon from './icons/SuccessIcon.jsx';

const Notification = ({ content }) => {
    return (
        <div className='notification-cont'>
            {
                content.map((notification) => {
                    return (
                        <div key={notification.id} className={'notification' + ( notification.classes || '' ) }>
                            <span className="success-icon"><SuccessIcon /></span>
                            <div className='notification-titles'>
                                <h1 className='title'>{notification.title || ''}</h1>
                                { notification.subtitle && <p className='subtitle'>{notification.subtitle || ''}</p> }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Notification;