import React, { useContext, useState } from 'react';
import './Course.css';
import Notification from './Notification';
import CartContext from '../store/CartContext';

export const Course = (props) => {
    const CartCtx = useContext(CartContext);
    const [notification, setNotification] = useState(null);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 1000);
    };
    console.log()

    const buyNowHandler = () => {
        const { name, price } = props;
        const existingCourse = CartCtx.cartItems.find((item) => item.course_name === name);

        if (existingCourse) {
            existingCourse.qty = existingCourse.qty + 1;
            showNotification(`Added "${name}" to the cart. Quantity: ${existingCourse.qty}`);
        } else {
            const cartObject = {
                course_name: name,
                qty: 1,
                course_price: price,
            };
            CartCtx.setCartItems([...CartCtx.cartItems, cartObject]);
            showNotification(`"${name}" has been added to the cart.`);
        }
    };

    return (
        <div className='course_container'>
            <div className='course_name'>{props.name}</div>
            <div className='course_image'>
                <img src={props.image} alt={props.name} />
            </div>
            <div className='course_details'>
                <div className='course_price'>Rs - {props.price}</div>
                <div className='course_provider'>Provider - {props.provider}</div>
            </div>
            <div className='button'>
                <button onClick={buyNowHandler}>BUY NOW</button>
            </div>
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
        </div>
    );
};
