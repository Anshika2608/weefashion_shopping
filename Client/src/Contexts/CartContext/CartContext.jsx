import { createContext, useState, useEffect,useContext } from 'react';
import axios from 'axios';
import LoginContext from '../LoginContext/LoginContext';
export const CartContext = createContext();
import { useNavigate } from 'react-router-dom';
export const CartContextProvider = ({ children }) => {
  const url = "https://weefashion-backend.onrender.com";
  const [cart, setCart] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [previousAmount, setPreviousAmount] = useState(0);

  const { loginData } = useContext(LoginContext);
 const History=useNavigate()


  const fetchCart = async () => {
    try {
      const res = await axios.get(`${url}/api/cart/`, {
        params: { email: loginData?.ValidUserOne?.email }
      });
      const responseData = res.data.items;
      setCart(responseData);
      localStorage.setItem('cart', JSON.stringify(responseData));

      // Initialize quantity map
      const initialQuantityMap = {};
      responseData.forEach(product => {
        initialQuantityMap[product.id] = 1;
      });
      setQuantityMap(initialQuantityMap);

      // Calculate initial total
      calculateTotalAmount(responseData, initialQuantityMap);

    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotalAmount = (cartData, quantityMap) => {
    let total = 0;
    let sum = 0;

    cartData.forEach(product => {
      sum += product.Previous * quantityMap[product.id];
      total += product.Current * quantityMap[product.id];
    });
    setTotalAmount(total);
    setPreviousAmount(sum);
  };

  const handleQuantityChange = (productId, change) => {
    setQuantityMap(prevQuantityMap => {
      const updatedQuantity = prevQuantityMap[productId] + change;
      const newQuantity = Math.max(updatedQuantity, 1); // Ensure quantity is at least 1
      const newQuantityMap = {
        ...prevQuantityMap,
        [productId]: newQuantity
      };
      calculateTotalAmount(cart, newQuantityMap);
      return newQuantityMap;
    });
  };

  const deleteCartItem = async (productId) => {
    try {
      await axios.delete(`${url}/api/cart/deleteCart/${productId}`, {
        params: { email: loginData.ValidUserOne.email }
      });
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      calculateTotalAmount(updatedCart, quantityMap);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProceed = () => {
    History("/place-order", { state: { totalAmount, previousAmount } });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        quantityMap,
        totalAmount,
        previousAmount,
        handleQuantityChange,
        deleteCartItem,
        handleProceed,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
