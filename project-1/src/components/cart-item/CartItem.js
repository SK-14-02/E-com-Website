import React, { useState } from 'react';
import './cart-item.css';

export const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.qty);
  
  const increaseHandler = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    props.onQuantityChange(props.course_name,newQuantity);
  };

  const decreaseHandler = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      props.onQuantityChange(props.course_name,newQuantity);
    } else {
      props.onRemoveItem(props.course_name);
    }
  };

  return (
    <div className='itemDiv'>
      <div className='cname'>{props.course_name}</div>
      
        <div className='inc_dec_qty'>
          <div className='decrease'>
            <button className='btnDec' onClick={decreaseHandler}>
              -
            </button>
          </div>
          <div className='quantity'>
              <input type='text' value={quantity} className='itemqty' readOnly />
          </div>
          <div className='increase'>
            <button className="btnInc" onClick={increaseHandler}>+</button>
          </div>
        </div>
      <div className='total'>Rs {props.course_price * quantity}</div>
    </div>
  );
};
