import React, { useState } from 'react'
import CartContext from './CartContext'
export const CartState = (props) => {
    const [cartItems,setCartItems] = useState([])
  return (
    <CartContext.Provider value = {{cartItems,setCartItems}}>
        {props.children}
    </CartContext.Provider>
  )
}
