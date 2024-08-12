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
  const url = "https://weefashion-backend.onrender.com"
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${url}/api/cart/`);
        const responseData = await res.data.items
        setCart(responseData);
        localStorage.setItem('cart', JSON.stringify(responseData));


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
    setTotalAmount(total + 50);
    setPreviousAmount(sum);
  };

  const handleQuantityChange = (productId, change) => {
    setQuantityMap(prevQuantityMap => {
      const updatedQuantity = prevQuantityMap[productId] + change;
      const newQuantity = Math.max(updatedQuantity, 1);
      const newQuantityMap = {
        ...prevQuantityMap,
        [productId]: newQuantity
      };
      calculateTotalAmount(cart, newQuantityMap);
      return newQuantityMap;
    });
  };

  const deleteCart = async (productId) => {
    try {
      await axios.delete(`${url}/api/cart/deleteCart/${productId}`)
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      calculateTotalAmount(updatedCart, quantityMap);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='pt-24'>
      {
        <div>
          <h1 className='text-4xl font-bold  mt-8 w-screen text-center'>Items in Cart</h1>
          {loginData && loginData.ValidUserOne ? (


            <div className="mt-4 mb-8 w-screen ">
              <div className='bg-gray-100 flex-wrap flex mx-12 rounded-lg justify-center  pb-12 '>
                {cart && cart.length > 0 ? (
                  cart.map((product, index) => (

                    <div key={product.id} className="flex  h-40 w-[35rem] mx-8 border-2 bg-white border-slate-200 rounded-md gap-2 mt-12 shadow-lg justify-around pt-2 ">
                      <div>
                        <img src={product.src} alt="" className='h-36 w-32 rounded-md ' />
                      </div>

                      <div className='flex flex-col h-40    '>
                        <p className=' text-lg font-semibold capitalize'>{product.title}</p>
                        <div className='flex gap-4  mt-2'>
                          <p className='line-through text-sm text-center font-semibold'>Rs.{product.Previous}</p>
                          <p className='text-sm text-center font-semibold'>Rs.{product.Current}</p>
                          <p className='text-red-500 ml-1 text-sm'>{product.discount}</p>
                        </div>
                        <div className='border-2 rounded-md border-black h-8 w-28 mt-4 flex justify-around items-center'>
                          <RiSubtractFill className='text-xl cursor-pointer' onClick={() => handleQuantityChange(product.id, -1)} />
                          {quantityMap[product.id]}
                          <IoIosAdd className='text-xl cursor-pointer' onClick={() => handleQuantityChange(product.id, 1)} />
                        </div>
                      </div>
                      <div>
                        <IoCloseOutline className='text-xl mt-2' onClick={() => deleteCart(product.id)} />
                      </div>
                    </div>


                  )

                  )) : (
                  <p>No items in Cart</p>
                )}
              </div>
              <div className='flex w-screen justify-around'>
              <div className='flex flex-col gap-4 mt-12 '>
                <h2 className='text-2xl font-semibold mx-12 text-amber-700'>Cart Totals</h2>
                <div className='flex flex-col  gap-2 mx-12'>

                  <p className='text-lg font-semibold flex '>
                    <p className='w-40'>Total Amount:</p>

                    <p className='w-20'>Rs.{PreviousAmount}</p>
                  </p>
                  <p className='text-lg font-semibold flex '>
                    <p className='w-40'>After Discount:</p>

                    <p className='w-20'>Rs.{totalAmount}</p>
                  </p>
                  <p className='text-lg font-semibold flex '>
                    <p className='w-40'>Delivery Fees</p>

                    <p className='w-20'>Rs.50</p>
                  </p>
                  <button className='bg-green-500 mt-4 text-white text-lg rounded-md w-48 h-10 outline-none cursor-pointer  '>Proceed to checkout </button>

                </div>
               
                
              </div>
              <div className='mt-12'>
                <h3 className='font-bold'>Promo Code</h3>
                <div>
                <input type="text" className='w-96 rounded-l-md h-10 border-2 mt-1 border-black '/>
                <button className='bg-black text-white w-24 outline-none h-10 -mt-6 rounded-r-md'>Apply</button>
                </div>
                
                </div>
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
