import React, { useContext } from 'react';
import { CartItem } from '../cart-item/CartItem';
import './cart.css';
import CartContext from '../../store/CartContext';

const Cart = () => {
  const CartCtx = useContext(CartContext);

  const handleQuantityChange = (course_name, newQuantity) => {
    const updatedCartItems = CartCtx.cartItems.map(item => {
      if (item.course_name === course_name) {
        return { ...item, qty: newQuantity };
      }
      return item;

    });
    CartCtx.setCartItems(updatedCartItems);
  };

  const getTotalCost = () => {
    return CartCtx.cartItems.reduce(
      (totalCost, { course_price: itemCost, qty: itemQty }) =>
        totalCost + parseFloat(itemCost * itemQty),0
    ).toFixed(2);
  };

  const handleRemoveItem = (course_name) => {
    const updatedCartItems = CartCtx.cartItems.filter(
      (item) => item.course_name !== course_name
    );
    CartCtx.setCartItems(updatedCartItems);
  };

  return (
    <div className='cart-container'>
      <div className='cart-boxx'>
        <h2>Your Shopping Cart</h2>
        <div>
          {CartCtx.cartItems.map((item, index) =>
            <CartItem
              course_name={item.course_name}
              course_price={item.course_price}
              qty={item.qty} key={index}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem} />
          )}
          <div className='cart-total'>
            <strong>Total:</strong> Rs {getTotalCost()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
