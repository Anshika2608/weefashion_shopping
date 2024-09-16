import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenContext from "../../Contexts/MenContext/MenContext";
import { FaStar } from "react-icons/fa6";
import Stars from "../../Components/Star/Stars";
import menimage from "/src/assets/Women_Images/Topwear/product_2.png";
import { GrAdd, GrFormSubtract } from "react-icons/gr";


import axios from "axios"
function SingleProduct() {
  const [isMaxQuantityReached, setIsMaxQuantityReached] = useState(false);
  const { getSingleProduct, singleProduct } = useContext(MenContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false)
  const url = "https://weefashion-backend.onrender.com"
  useEffect(() => {
    getSingleProduct(id);
    const storedCart = localStorage.getItem('cart');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];

    console.log('Cart Items:', cartItems);
    console.log('Current Product ID:', id);
    const itemInCart = cartItems.some(item => item.id === parseInt(id, 10));

    setAdded(itemInCart);
    }, [id]);

  if (!singleProduct) {
    return <div>Loading...</div>;
  }


  const handleQuantity = () => {
    if (singleProduct.product.Quantity >= quantity)
      setQuantity(quantity + 1)
    else {
      setIsMaxQuantityReached(!isMaxQuantityReached);
    }
  }
  const handleQuantitysub = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
      setIsMaxQuantityReached(false);
    }

  }
  const addToCart = async () => {
    try {
        const storedCart = localStorage.getItem('cart');
        const cartItems = storedCart ? JSON.parse(storedCart) : [];


        if (singleProduct && singleProduct.product) {
            const {
                id: productId,
                Title: title,
                image: src,
                previous_price: Previous,
                Current_price: Current,
                discount,
                quantity: productQuantity
            } = singleProduct.product;

            if (added) {
                await axios.delete(`${url}/api/cart/deleteCart/${id}`);
                setAdded(false);
                const updatedCartItems = cartItems.filter(item => item.id !== parseInt(id, 10));
                localStorage.setItem('cart', JSON.stringify(updatedCartItems));

                console.log("Removed from cart");
            } else {
                await axios.post(`${url}/api/cart/addCart`, {
                    id: productId,
                    title,
                    src,
                    Previous,
                    Current,
                    discount,
                    quantity: productQuantity
                });
                
                const updatedCartItems = [...cartItems, { id: productId, title, src, Previous, Current, discount, quantity: productQuantity }];
                localStorage.setItem('cart', JSON.stringify(updatedCartItems));        
                setAdded(true);
              }
        } else {
            console.error("singleProduct.product is undefined or null");
        }
    } catch (err) {
        console.error("Error handling cart:", err);
    }
};

  return (
    <>
      <div>
        {singleProduct && (
          <>
            <div className="pt-32 pl-12 pb-5">
              <div className="flex flex-wrap gap-3">
                <div className="hidden md:visible md:flex flex-col gap-2 ">

                  {Array(4).fill(menimage).map((img, index) => (
                    <img key={index} src={singleProduct.product.image} className="h-40 w-24" />
                  ))}

                </div>
                <div>
                  <img
                    src={singleProduct.product.image}
                    className="md:h-[42rem] md:w-[32rem] h-72 w-64 sm:h-96 sm:w-96"
                    alt={singleProduct.product.Title}
                  />
                </div>
                <div className="flex flex-col pl-4 pt-4">
                  <h1 className="font-bold text-3xl capitalize">
                    {singleProduct.product.Title}
                  </h1>
                  <p className="text-slate-400 font-semibold text-lg capitalize ">
                    {singleProduct.product.Category}
                  </p>
                  <p className=" text-xl text-slate-400 font-semibold mt-7 capitalize">
                    {singleProduct.product.company}
                  </p>
                  <div className="flex gap-3 pt-8">
                    <p className="font-bold text-xl">
                      {" "}
                      Rs.{singleProduct.product.Current_price}
                    </p>
                    <p className="text-slate-400 pt-px text-lg text-center decoration-slate-400 line-through">
                      Rs.{singleProduct.product.previous_price}
                    </p>
                    <p className="font-bold text-lg text-green-500">
                      ({singleProduct.product.discount})
                    </p>
                  </div>
                  <p className="font-bold pt-1 text-slate-400">
                    Inclusive of All Taxes + Free Shipping
                  </p>
                  <div className="flex flex-col pt-4">
                    <Stars
                      stars={singleProduct.product.star_rating}
                      reviews={singleProduct.product.Reviews}
                    />
                  </div>
                  <div className="flex mt-8">
                    <p className="text-lg font-semibold">COLOR : </p>
                    <p className="capiltalize font-semibold text-slate-400 text-lg  pl-2">
                      {singleProduct.product.color}
                    </p>
                  </div>
                  <div
                    className={`rounded-full h-10 w-10 border-2 mt-2  border-black `}
                    style={{ backgroundColor: singleProduct.product.color }}
                  ></div>
                  <div className="mt-8">
                    <p className="font-semibold text-lg">SIZE</p>
                    <div className="flex gap-3">
                      {singleProduct.product.size.map((size, index) => {
                        return (
                          <p
                            key={index}
                            className="border-2 border-black h-10 w-10 rounded-md text-center mt-2 pt-1"
                          >
                            {size}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-10 flex  gap-2">
                    <p className="font-semibold text-lg">QTY : </p>
                    <div className="border-2 border-slate-400 w-24 h-8 rounded-md flex justify-around ">
                      <button onClick={handleQuantitysub}><GrFormSubtract /></button>
                      <p className="text-lg">{quantity}</p>
                      <button onClick={handleQuantity}> <GrAdd /></button>

                    </div>
                    {isMaxQuantityReached && <div className="text-red-500 text-lg pt-1 font-semibold">Maximum quantity reached!</div>}
                  </div>
                  <div>
                    <button className="bg-[#51cccc] text-white font-semibold mt-10 w-48 text-lg h-12 rounded-md "  onClick={addToCart}>
                    {added ? "Remove" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default SingleProduct;
