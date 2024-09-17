import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";
import LoginContext from "../../Contexts/LoginContext/LoginContext";
function Wishlist() {
  const [wish, setWish] = useState([]);
  const url="https://weefashion-backend.onrender.com"
  const { loginData } = useContext(LoginContext); 
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!loginData || !loginData.ValidUserOne) {
        console.log("User not logged in");
        return;
      }
      try {
        const res = await axios.get(`${url}/api/wishlist/`, {
          params: { email: loginData.ValidUserOne.email }
        });
        const wishlistWithKeys = res.data.items.map((item, index) => ({
          ...item,
          cardKey: item.id,
        }));
        setWish(wishlistWithKeys);
        console.log(wish);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishlist();
  }, [loginData]);

  const handleDeleteFromWishlist = async (cardKey) => {
    try {
      await axios.delete(`${url}/api/wishlist/delete/${cardKey}`,{
        params:{email:loginData.ValidUserOne.email}
      });
      setWish((prevWish) =>
        prevWish.filter((item) => item.cardKey !== cardKey)
      );
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center mt-8 mb-8 pt-24">
        {wish && wish.length > 0 ? (
          wish.map((liked, index) => (
            <div key={liked.id} className="m-4">
              <Card
                id={liked.id}
                title={liked.title}
                src={liked.src}
                Previous={liked.Previous}
                Current={liked.Current}
                discount={liked.discount}
                isWishlist={true}
                cardKey={liked.id}
                onDeleteFromWishlist={handleDeleteFromWishlist}
                list={wish}
              />
            </div>
          ))
        ) : (
          <p>No items in wishlist</p>
        )}
      </div>
    </>
  );
}

export default Wishlist;
