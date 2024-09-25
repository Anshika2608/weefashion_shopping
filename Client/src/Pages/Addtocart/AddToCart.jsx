import React, { useContext, useState, useEffect } from 'react';
import LoginContext from '../../Contexts/LoginContext/LoginContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import Cart from '../../Components/Cart/Cart';
import axios from "axios"
import { CartContext } from '../../Contexts/CartContext/CartContext';
const AddToCart = () => {
  const {
    cart,
    quantityMap,
    totalAmount,
    fetchCart,
    previousAmount,
    handleQuantityChange,
    deleteCartItem,
    handleProceed,
  } = useContext(CartContext);
  
  const { loginData } = useContext(LoginContext);
  useEffect(() => {
    fetchCart();
  }, [loginData]);

  return (
    <div className='pt-24'>
      {
        <div>
          <h1 className='text-4xl font-bold  mt-8 w-screen text-center'>Items in Cart</h1>
          {loginData && loginData.ValidUserOne ? (


            <div className="mt-4 mb-8 w-screen ">
              <div className='bg-gray-100 flex-wrap flex mx-12 rounded-lg justify-center  pb-12 '>
                {cart && cart.length > 0 ? (
                  cart.map((product) => (

                    <div key={product.id} className="flex  h-40 w-[35rem] mx-8 border-2 bg-white border-slate-200 rounded-md gap-2 mt-12 shadow-lg justify-around pt-2 ">
                      <div>
                        <img src={product.src} className='h-36 w-32 rounded-md ' />
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
                        <IoCloseOutline className='text-xl mt-2' onClick={() => deleteCartItem(product.id)} />
                      </div>
                    </div>


                  )

                  )) : (
                  <p>No items in Cart</p>
                )}
              </div>
              <div className='flex w-screen justify-around'>

                <div>
                  <Cart
                    previousAmount={previousAmount}
                    totalAmount={totalAmount}
                  />
                  <button
                    className='bg-green-500 mt-4 ml-10 text-white text-lg rounded-md w-48 h-10 outline-none cursor-pointer'
                    onClick={handleProceed}
                  >
                    Proceed to checkout
                  </button>
                </div>

                <div className='mt-12'>
                  <h3 className='font-bold'>Promo Code</h3>
                  <div>
                    <input type="text" className='w-96 rounded-l-md h-10 border-2 mt-1 border-black ' />
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
