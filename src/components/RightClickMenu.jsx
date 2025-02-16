import React, { useEffect, useRef } from 'react';

const RightClickMenu = ({ options=[], handleCloseMenu, x, y}) => {
    const menuRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);
  
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            handleCloseMenu();
        }
    }

    return (
        <div ref={menuRef} className='context-menu' style={{left: x, top: y}}>
            {
            options.map((option) => (
                <span 
                    key={option.label} 
                    onClick={option.contextFn}
                    className={option.class_name || ''}
                >
                    {option.label}
                </span>
            ))
            }
        </div>
    )
}

export default RightClickMenu;