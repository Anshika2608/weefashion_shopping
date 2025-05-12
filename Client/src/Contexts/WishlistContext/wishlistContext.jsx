import { createContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const url = "https://weefashion-backend.onrender.com";
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);
  const fetchWishlist = async (email) => {
    if (!email) return;
    try {
      const res = await axios.get(`${url}/api/wishlist/`, {
        params: { email }
      });
      const wishlistWithKeys = res.data.items.map((item) => ({
        ...item,
        cardKey: item.id,
        isWishlist: true
      }));
      setWishlist(wishlistWithKeys);
      localStorage.setItem("wishlist", JSON.stringify(wishlistWithKeys));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const deleteFromWishlist = async (cardKey, email) => {
    try {
      await axios.delete(`${url}/api/wishlist/delete/${cardKey}`, {
        params: { email }
      });
      const updatedWishlist = wishlist.filter((item) => item.cardKey !== cardKey);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, fetchWishlist, deleteFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
