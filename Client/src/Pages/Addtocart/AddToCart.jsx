import React, { useContext, useState, useEffect } from 'react';
import LoginContext from '../../Contexts/LoginContext/LoginContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

import axios from "axios"
import SingleProduct from '../SingleProduct/SingleProduct';
const AddToCart = () => {
  const { loginData, setLoginData, DashboardValid } = useContext(LoginContext);
  const History = useNavigate()
  const [cart, setCart] = useState([])
  const [quantityMap, setQuantityMap] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [PreviousAmount, setPreviousAmount] = useState(0);
  const url="https://weefashion-shopping-backend-01lg.onrender.com"
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${url}/api/cart/`);
        const responseData = await res.data.items
        setCart(responseData);
        const initialQuantityMap = {};
        responseData.forEach(product => {
          initialQuantityMap[product.id] = 1; // Initialize quantity as 0 for each product
        });
        setQuantityMap(initialQuantityMap);
        calculateTotalAmount(responseData, initialQuantityMap);

      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, []);
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
      // Ensure quantity is not negative
      const newQuantity = Math.max(updatedQuantity, 1);
      const newQuantityMap = {
        ...prevQuantityMap,
        [productId]: newQuantity
      };
      calculateTotalAmount(cart, newQuantityMap); // Recalculate total amount
      return newQuantityMap;
    });
  };
  let serialNo = 1
  const deleteCart = async (productId) => {
    try {
      await axios.delete(`${url}/api/cart/deleteCart/${productId}`)
      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== productId)
      );
      calculateTotalAmount(cart.filter(item => item.id !== productId), quantityMap);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='pt-24'>
      {
        <div>
          <h1 className='text-4xl font-bold   w-screen text-center'>Items in Cart</h1>
          {loginData && loginData.ValidUserOne ? (


            <div className="mt-4 mb-8 flex w-screen justify-around">
              <div className='bg-gray-50 rounded-md justify-center  pb-12 '> 
                {cart && cart.length > 0 ? (
                cart.map((product, index) => (

                  <div key={product.id} className="flex h-56 w-[35rem] mx-8 border-2 bg-white border-slate-200 rounded-md gap-2 mt-12 shadow-lg justify-around pt-2 ">
                   <div>
                   <img src={product.src} alt="" className='h-40 w-32 rounded-md ' />
                    <div className='border-2 rounded-md border-black h-8 w-28 mt-4 flex justify-around items-center'>
                      <RiSubtractFill className='text-xl cursor-pointer' onClick={() => handleQuantityChange(product.id, -1)} />
                      {quantityMap[product.id]}
                      <IoIosAdd className='text-xl cursor-pointer' onClick={() => handleQuantityChange(product.id, 1)} />
                    </div>
                   </div>
                    
                    <div className='flex flex-col h-40    '>
                      <p className=' text-lg font-semibold capitalize'>{product.title}</p>
                      <div className='flex gap-4  mt-2'>
                        <p className='line-through text-sm text-center font-semibold'>Rs.{product.Previous}</p>
                        <p className='text-sm text-center font-semibold'>Rs.{product.Current}</p>
                        <p className='text-red-500 ml-1 text-sm'>{product.discount}</p>
                      </div>

                    </div>
                  <div>
                  <IoCloseOutline className='text-xl ' onClick={() => deleteCart(product.id)} />

                  </div>
                  </div>


                )

                )) : (
                <p>No items in Cart</p>
              )}
              </div>

              <div className='flex flex-col items-center gap-2'>

                <p className='text-lg font-semibold'>Total Amount: {PreviousAmount}</p>
                <p className='text-lg font-semibold'>After discount: {totalAmount}</p>
                <button className='bg-green-500 text-white text-lg rounded-md outline-none cursor-pointer px-2 '>place order- Total: Rs. {totalAmount} </button>

              </div>
            </div>

          ) : (
            <div className='flex justify-center w-screen my-10'>

              <NavLink to="/LogIn" className=" text-white  h-8 text-xl text-center rounded-md w-56 bg-black justify-center items-center gap-2 flex ">Login <FaArrowRight /></NavLink>
            </div>
          )}
        </div>
      }
    </div >
  );
};

export default AddToCart;
