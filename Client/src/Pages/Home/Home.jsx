import React, { useEffect, useState } from "react";

import Slider from "../../Components/Slider/Slider";
import axios from "axios";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import { TbMathGreater } from "react-icons/tb";
import Features from "../../Components/Features/Features";

import f1 from "../../assets/f1.png";
import f2 from "../../assets/f2.png";
import f3 from "../../assets/f3.png";
import f4 from "../../assets/f4.png";
import f5 from "../../assets/f5.png";
import f6 from "../../assets/f6.png";
import b2 from "../../assets/b2.jpg";
import b10 from "../../assets/b10.jpg";
import b17 from "../../assets/b17.jpg";
import b4 from "../../assets/b4.jpg";
import b7 from "../../assets/b7.jpg";
import b18 from "../../assets/b18.jpg";
function Home() {
  const [collection, setCollection] = useState([]);
  const [women, setWomen] = useState([]);
const url="http://localhost:5000"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/home`);
        setCollection(response.data.products);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    const womenData = async () => {
      try {
        const res = await axios.get(`${url}/api/home/women`);
        setWomen(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    womenData();
  }, []);

  return (
    <>
     <div className="pt-24 w-full overflow-x-hidden">
        <Slider/>
        <div className="flex justify-center items-center flex-wrap ">
          <Features source={f1} text="Free Shipping" bgcolor="bg-red-100" />
          <Features source={f2} text="Online Order" bgcolor="bg-lime-300" />
          <Features source={f3} text="Save Money" bgcolor="bg-cyan-300" />
          <Features source={f4} text="Promotions" bgcolor="bg-purple-200" />
          <Features source={f5} text="Happy Sell" bgcolor="bg-pink-200" />
          <Features source={f6} text="24/7 Support" bgcolor="bg-orange-100" />
        </div>
        <h1 className="text-3xl font-bold  mt-8 text-center">
          TRENDING IN WOMEN
        </h1>
        <hr className="mt-4 border-b-2 border-black w-48 mx-auto" />
        <div className="flex flex-wrap justify-center items-center mt-8 mb-8">
          {women.map((women, index) => (
            <div key={women.id} className="m-4">
              <Card
                id={women.id}
                title={women.Title}
                src={women.image}
                Previous={women.previous_price}
                Current={women.Current_price}
                discount={women.discount}
              />
            </div>
          ))}
          <Link to="/Women" className="rounded-full bg-slate-200 p-4 text-xl">
            <TbMathGreater />
          </Link>
        </div>
        <div
          className="w-full h-80 flex flex-col justify-center items-center overflow-x-hidden"
          style={{ backgroundImage: `url(${b2})`, backgroundSize: "cover" }}
        >
          <p className="font-bold text-white mb-2 text-4xl">
            Up to <span className="text-red-500">70% Off</span> - All t-shirts &
            Jeans
          </p>
          <button className="h-10 w-28 bg-white rounded-sm font-bold text-sm hover:bg-lime-600 transition delay-200 hover:text-white">
            Explore More
          </button>
        </div>

        <h2 className="text-3xl font-bold  mt-8 text-center">
          LATEST COLLECTIONS
        </h2>
        <hr className="mt-4 border-b-2 border-black w-40 mx-auto" />
        <div className="flex flex-wrap justify-center mt-8 mb-8">
          {collection.map((product, index) => (
            <div key={product.id} className="m-4">
              <Card
                id={product.id}
                title={product.Title}
                src={product.image}
                Previous={product.previous_price}
                Current={product.Current_price}
                discount={product.discount}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center flex-wrap mb-4">
          <div
            className="h-80 w-2/5 mr-8 rounded-md text-white text-xl pt-20 pl-8"
            style={{ backgroundImage: `url(${b17})`, backgroundSize: "cover" }}
          >
            <p>Crazy Deals</p>
            <p className="font-bold text-2xl">Buy 1 Get 1 Free</p>
            <p className="text-sm mt-1">
              The best classic dress is on sale on weefashion
            </p>
           
          </div>
          <div
            className="h-80 w-2/5 rounded-md text-white text-xl pt-20 pl-8"
            style={{ backgroundImage: `url(${b10})`, backgroundSize: "cover" }}
          >
            <p>summer/spring</p>
            <p className="font-bold text-2xl">upcomming season</p>
            <p className="text-sm mt-1">
              The best classic dress is on sale on weefashion
            </p>
           
          </div>
        </div>
        <div className="flex justify-center items-center flex-wrap my-8">
          <div
            className="h-56 w-96 mr-5 pt-20 pl-6 rounded-md"
            style={{ backgroundImage: `url(${b7})`, backgroundSize: "cover" }}
          >
            <p className="text-white text-2xl font-bold">SEASONAL SALE</p>
            <p className="font-bold text-red-500 text-lg">
              Winter Collection-50% off
            </p>
          </div>
          <div
            className="h-56 w-96 mr-5 pt-20 pl-6 rounded-md"
            style={{ backgroundImage: `url(${b4})`, backgroundSize: "cover" }}
          >
            <p className="text-white text-xl font-bold">
              NEW BOTTOMWEAR COLLECTION
            </p>
            <p className="font-bold text-red-500 text-lg">Spring/Summer 2024</p>
          </div>
          <div
            className="h-56 w-96 pt-20 pl-6 rounded-md"
            style={{ backgroundImage: `url(${b18})`, backgroundSize: "cover" }}
          >
            <p className="text-white text-2xl font-bold">T-SHIRTS</p>
            <p className="font-bold text-red-500 text-lg">
              New Trendy T-shirts
            </p>
          </div>
        </div>
        <div className="bg-sky-950 h-48 my-16 flex flex-wrap justify-around items-center w-full">
          <div>
            <p className="font-bold text-2xl text-cyan-50">
              Sign Up For Newsletters
            </p>
            <p className="font-bold text-cyan-700 text-lg mt-1">
              Get Email Updates about our latest shop and{" "}
              <span className="text-amber-600">special offers</span>
            </p>
          </div>
          <div>
            <input
              type="email"
              placeholder="Your email address"
              className="h-8 w-96 rounded-l-md pl-2"
            />
            <button className="bg-green-600 text-white h-8 w-20 rounded-r-md">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
