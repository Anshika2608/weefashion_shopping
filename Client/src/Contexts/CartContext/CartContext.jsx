import { createContext, useState, useEffect, useContext } from 'react';
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
  const History = useNavigate()
  let token = localStorage.getItem("usersdatatoken");
  useEffect(() => {
    if (loginData?.ValidUserOne?.email) {
      fetchCart();
    }
  }, [loginData?.ValidUserOne?.email]);
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
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
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

const handleQuantityChange = async (productId, delta) => {
  const updatedQuantity = quantityMap[productId] + delta;

  if (updatedQuantity <= 0) return;

  setQuantityMap((prevQuantityMap) => ({
    ...prevQuantityMap,
    [productId]: updatedQuantity,
  }));

  try {
    await axios.put(
      `${url}/api/cart/editQuantity`,
      {
        productId,
        quantity: updatedQuantity,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchCart();
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    // toast.error("Failed to update cart quantity.");
  }
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
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
