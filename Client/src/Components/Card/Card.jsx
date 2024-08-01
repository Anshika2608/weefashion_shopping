import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoBag } from "react-icons/io5";
import { FaHeart, FaTrash } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Card({
  id,
  title,
  src,
  Previous,
  Current,
  discount,
  cardKey,
  
  isWishlist,
  onDeleteFromWishlist,
  list
}) {
  const [wishlist, setWishlist] = useState(false);
useEffect(() => {
  const storedWishlist = localStorage.getItem(`wishlist_${id}`);
  if (storedWishlist !== null) {
    setWishlist(JSON.parse(storedWishlist));
  }
}, [id]);

  const handleWishlist = async () => { 
    try {
        
      setWishlist(!wishlist); 
      localStorage.setItem(`wishlist_${id}`, !wishlist);
     
      if (list) {
        onDeleteFromWishlist(cardKey);
 
      } else {
       
          if (!wishlist) {
            await axios.post("http://localhost:5000/api/wishlist/liked", {
              id,
              title,
              src,
              Previous,
              Current,
              discount,
            });
            console.log("add");
          }else{
            await axios.delete(`http://localhost:5000/api/wishlist/delete/${id}`);
            console.log("delete");
          }
        
     
      }
    } catch (error) {
      console.error("Error handling wishlist:", error);
    }
  };
  const [addedToCart, setAddedToCart] = useState(false);
 const addToCart=async()=>{
try{
  await axios.post("http://localhost:5000/api/cart/addCart", {
              id,
              title,
              src,
              Previous,
              Current,
              discount
            });
            console.log("add");
            setAddedToCart(true);

}catch(err){
  console.log(err)
}
 }
  const renderWishlistButton = () => {
    if (isWishlist) {
      return (
        <button
          className="rounded-md h-8 px-2.5  bg-slate-200 text-2xl  text-red-500"
          onClick={handleWishlist}
        >
          <FaTrash />
        </button>
      );
    } else {
      return (
        <button
          className="rounded-md h-8 px-2.5  bg-slate-200 text-2xl  text-red-500"
          onClick={handleWishlist}
        >
          {wishlist ? <FaHeart /> : <CiHeart />}
        </button>
      );
    }
  };

  return (
    <>
    
      <div className="h-[26rem] rounded-lg shadow-xl w-64 flex items-center flex-col ">
        <NavLink to={`/Singleproduct/${id}`}>
        <img src={src}  className="h-64 w-60 rounded-md" />
      </NavLink>
        <p className="text-sm mt-1 px-2 h-12">{title}</p>
        <div className="flex font-bold mt-1">
          <p className="text-sm mr-2">Rs. {Current}</p>
          <p className="text-sm line-through">Rs. {Previous}</p>
          <p className="text-red-500 ml-1 text-sm">({discount})</p>
        </div>
        <div className="border-t-2 border-grey my-4 w-64"></div>
        <div className="flex justify-around  w-64 items-center ">
          {renderWishlistButton()}
          <button
            className="bg-black text-white border-2 rounded-md p-1 w-32 text-center flex items-center justify-evenly "
            onClick={addToCart}
            disabled={addedToCart} // Disable button if product is already added to cart
          >
            <IoBag /> {addedToCart ? "Added" : "Add To Cart"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
