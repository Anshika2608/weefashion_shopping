import React, { useState, useEffect, useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { IoBag } from "react-icons/io5";
import { FaHeart, FaTrash } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";
import LoginContext from "../../Contexts/LoginContext/LoginContext";
import WishlistContext from "../../Contexts/WishlistContext/wishlistContext";
import { CartContext } from "../../Contexts/CartContext/CartContext";
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
  const { wishlist: wishlistData } = useContext(WishlistContext);

  const [wishlist, setWishlist] = useState(isWishlist || false);
  const [addedToCart, setAddedToCart] = useState(false);
  const url = "https://weefashion-backend.onrender.com";
  const { loginData } = useContext(LoginContext);
  const { isInCart, fetchCart } = useContext(CartContext);


  useEffect(() => {
    const fetchData = async () => {
      if (!loginData || !loginData.ValidUserOne) return;

      if (wishlistData && wishlistData.length > 0) {
        const isWishlisted = wishlistData.some(item => item.id === id);
        setWishlist(isWishlisted);
      }

      setAddedToCart(isInCart(id));
    };

    fetchData();
  }, [loginData, id, wishlistData, isInCart]);




  const handleWishlist = async () => {
    try {
      if (!loginData || !loginData.ValidUserOne) {
        alert("Please log in to add items to your wishlist.");
        return;
      }

      if (!wishlist) {
        await axios.post(`${url}/api/wishlist/liked`, {
          id,
          title,
          src,
          Previous,
          Current,
          discount,
          email: loginData.ValidUserOne.email
        });
        setWishlist(true);
      } else {
        await axios.delete(`${url}/api/wishlist/delete/${id}`, {
          params: { email: loginData.ValidUserOne.email }
        });
        setWishlist(false);
      }



    } catch (error) {
      console.error("Error handling wishlist:", error);
    }
  };

  const addToCart = async () => {
    try {
      if (!loginData || !loginData.ValidUserOne) {
        alert("Please log in to add items to your cart.");
        return;
      }
      const storedCart = localStorage.getItem('cart');
      const cartItems = storedCart ? JSON.parse(storedCart) : [];

      if (addedToCart) {
        await axios.delete(`${url}/api/cart/deleteCart/${id}`, {
          params: { email: loginData.ValidUserOne.email }
        });
        setAddedToCart(false);
         await fetchCart();
        localStorage.setItem('cart', JSON.stringify(cartItems.filter(item => item.id !== id)));
      } else {
        await axios.post(`${url}/api/cart/addCart`, {
          id,
          title,
          src,
          Previous,
          Current,
          discount,
          email: loginData.ValidUserOne.email
        });
        setAddedToCart(true);
         await fetchCart();
        localStorage.setItem('cart', JSON.stringify([...cartItems, { id, title, src, Previous, Current, discount, email }]));
      }
    } catch (err) {
      console.error("Error handling cart:", err);
    }
  };
  const renderWishlistButton = () => {
    if (isWishlist) {
      return (
        <button
          className="rounded-md h-8 px-2.5 bg-slate-200 text-2xl text-red-500"
          onClick={() => {
            onDeleteFromWishlist(cardKey);
          }}
        >
          <FaTrash />
        </button>
      );
    } else {
      return (
        <button
          className="rounded-md h-8 px-2.5 bg-slate-200 text-2xl text-red-500"
          onClick={handleWishlist}
        >
          {wishlist ? <FaHeart /> : <CiHeart />}
        </button>
      );
    }
  };

  return (
    <div className="h-[26rem] rounded-lg shadow-xl w-64 flex items-center flex-col">
      <NavLink to={`/Singleproduct/${id}`}>
        <img src={src} className="h-64 w-60 rounded-md" alt={title} />
      </NavLink>
      <p className="text-sm mt-1 px-2 h-12">{title}</p>
      <div className="flex font-bold mt-1">
        <p className="text-sm mr-2">Rs. {Current}</p>
        <p className="text-sm line-through">Rs. {Previous}</p>
        <p className="text-red-500 ml-1 text-sm">({discount})</p>
      </div>
      <div className="border-t-2 border-grey my-4 w-64"></div>
      <div className="flex justify-around w-64 items-center">
        {renderWishlistButton()}
        <button
          className="bg-black text-white border-2 rounded-md p-1 w-32 text-center flex items-center justify-evenly"
          onClick={addToCart}
        >
          <IoBag /> {addedToCart ? "Remove" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default Card;
