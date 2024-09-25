import react, { useState, useEffect, createContext } from "react"
import axios from "axios"
const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
    return (
        <CartContext.Provider>
            {children}
        </CartContext.Provider>
    )
}
export default CartContext