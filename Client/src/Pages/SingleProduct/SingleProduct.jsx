import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenContext from "../../Contexts/MenContext/MenContext";
import { FaStar } from "react-icons/fa6";
import Stars from "../../Components/Star/Stars";
import menimage from "../../assets/Kids_Images/Kids_Bottomwear/kidspants1.avif";
import { GrAdd,GrFormSubtract} from "react-icons/gr";
import axios from "axios"
function SingleProduct() {
  const [isMaxQuantityReached, setIsMaxQuantityReached] = useState(false);
  const { getSingleProduct, singleProduct } = useContext(MenContext);
  const { id } = useParams();
  const[quantity,setQuantity]=useState(0);
  const[added,setAdded]=useState(false)
  const url="http://localhost:5000"
  useEffect(() => {
    getSingleProduct(id);
  }, []);

  if (!singleProduct) {
    return <div>Loading...</div>;
  }


  const handleQuantity=()=>{
    if(singleProduct.product.Quantity>=quantity)
    setQuantity(quantity+1)
    else{
      setIsMaxQuantityReached(!isMaxQuantityReached);
    }
  }
 const handleQuantitysub=()=>{
  if(quantity>0){
    setQuantity(quantity-1)
    setIsMaxQuantityReached(false);
  }
  
 }
 const addToCart = async () => {
  try {
    await axios.post(`${url}/api/addCart/addCart`, {
      id: singleProduct.product.id,
      title: singleProduct.product.Title,
      src: singleProduct.product.image,
      Previous: singleProduct.product.previous_price,
      Current: singleProduct.product.Current_price,
      discount: singleProduct.product.discount,
      quantity:singleProduct.product.quantity
    });
    console.log("Product added to cart successfully");
    setAdded(true)
  } catch (error) {
    console.error("Error adding product to cart:", error);
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
                  
                  <img src={singleProduct.product.image} className="h-40 w-24" />
                  <img src={singleProduct.product.image} className="h-40 w-24" />
                  <img src={singleProduct.product.image} className="h-40 w-24"  />
                  <img src={singleProduct.product.image} className="h-40 w-24"  />
                </div>
                <div>
                  <img
                    src={singleProduct.product.image}
                    className="md:h-[42rem] md:w-[32rem] h-72 w-64 sm:h-96 sm:w-96 "
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
                    <button onClick={handleQuantitysub}><GrFormSubtract/></button>
                     <p className="text-lg">{quantity}</p>
                     <button onClick={handleQuantity}> <GrAdd /></button>

                    </div>
                    {isMaxQuantityReached && <div className="text-red-500 text-lg pt-1 font-semibold">Maximum quantity reached!</div>}
                  </div>
                  <div>
                    <button className="bg-[#51cccc] text-white font-semibold mt-10 w-48 text-lg h-12 rounded-md cursor-not-allowed " disabled onClick={()=>addToCart()}>
                      {added?<p>Added</p>:<p>Add to cart</p>}
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
