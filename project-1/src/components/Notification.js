import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return visible ? <div className="notification">{message}</div> : null;
};

export default Notification;