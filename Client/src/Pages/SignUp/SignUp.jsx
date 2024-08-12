import React, { useEffect, useState } from "react";
import bgImage from "../../assets/image.png";
import { MdDashboard, MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEyeSlash, FaRegEye, FaUser } from "react-icons/fa"
import { BiSolidUserCircle } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom";



import "./SignUp.css"
function SignUp() {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
const url="https://weefashion-backend.onrender.com"

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const history = useNavigate();
  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  };

  const addUserdata = async (e) => {
    e.preventDefault();
  
    const { fname, email, password, cpassword } = inpval;
  
    if (fname === "") {
      toast.warning("First name is required!", { position: "top-right" });
    } else if (email === "") {
      toast.error("Email is required!", { position: "top-right" });
    } else if (!email.includes("@")) {
      toast.warning("Include @ in your email!", { position: "top-right" });
    } else if (password === "") {
      toast.error("Password is required!", { position: "top-right" });
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters!", { position: "top-right" });
    } else if (cpassword === "") {
      toast.error("Confirm password is required!", { position: "top-right" });
    } else if (cpassword.length < 6) {
      toast.error("Confirm password must be at least 6 characters!", { position: "top-right" });
    } else if (password !== cpassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
    } else {
      try {
        const response = await axios.post(`${url}/api/signup/`, {
          fname, email, password, cpassword
        });
        console.log("API response:", response);
  
        if (response.status === 201) {
         
          toast.success("Registration successfully done 😃!", { position: "top-right" });
          setInpval({ fname: "", email: "", password: "", cpassword: "" });
          history("/LogIn");
        } else {
          toast.error("Unexpected response from server.", { position: "top-right" });
        }
      } catch (error) {
        console.error("API error:", error); 
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
          toast.error(errorMessage, { position: "top-right" });
        } else {
          toast.error("An unexpected error occurred. Please try again later.", { position: "top-right" });
        }
      }
    }
  };

  return (
    <div className="pt-24 relative overflow-x-hidden">

      <div className="bg-cover bg-center w-full  h-screen mr-4 z-0 flex justify-end  " style={{ backgroundImage: `url(${bgImage})` }}>


        <div className="absolute pt-4 flex flex-col items-end sm:gap-4  w-full ">
          <div>
            <p className=" text-2xl lg:text-5xl md:text-3xl sm:text-2xl capitalize font-bold text-center ml-2">style yourself with weefashion...</p>

          </div>
          <div className="flex flex-col items-center gap-4 mt-8 lg:mr-40">
            <BiSolidUserCircle className="text-7xl" />
            <div >
              <h1 className="text-3xl font-semibold mt-4 ">SIGN UP</h1>

            </div>
            <div className="flex mb-8 mr-4 sm:mr-3">
              <FaUser className="absolute mt-2 text-slate-400 text-lg " />
              <input
                type="text"
                id="fname"
                onChange={setVal}
                value={inpval.fname}
                name="fname"
                className="w-72 lg:w-96 h-8  border-b-2 pl-6 outline-none  focus:border-black bg-transparent "
                placeholder="Enter Your Name"
              />


            </div>
            <div className="flex mb-8 mr-4 sm:mr-3">
              <MdOutlineMail className="absolute mt-2 text-slate-400 text-xl " />
              <input
                type="email"
                id="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                className="w-72 lg:w-96 h-8  border-b-2 pl-6 outline-none  focus:border-black "
                placeholder="Enter Your Email"
              />


            </div>


            <div className="flex relative mr-4 mb-8">
              <RiLockPasswordFill className="absolute mt-2 text-slate-400 text-xl" />
              <input
                type={passShow ? "text" : "password"}
                id="password"
                value={inpval.password}
                onChange={setVal}
                name="password"
                className="w-72 lg:w-96 h-8 border-b-2 pl-6 outline-none focus:border-black" placeholder="Enter  Password"
              />
              {passShow ? (
                <FaRegEye className="mt-2 cursor-pointer -ml-4" onClick={() => setPassShow(false)} />
              ) : (
                <FaRegEyeSlash className="mt-2 cursor-pointer -ml-4" onClick={() => setPassShow(true)} />
              )}
            </div>
            <div className="flex relative mr-4 ">
              <RiLockPasswordFill className="absolute mt-2 text-slate-400 text-xl" />
              <input type={cpassShow ? "text" : "password"}
                value={inpval.cpassword}
                onChange={setVal}
                name="cpassword"
                id="cpassword"
                className="w-72 lg:w-96 h-8 border-b-2 pl-6 outline-none focus:border-black" placeholder="ReEnter Password"
              />
              {cpassShow ? (
                <FaRegEye className="mt-2 cursor-pointer -ml-4" onClick={() => setCPassShow(false)} />
              ) : (
                <FaRegEyeSlash className="mt-2 cursor-pointer -ml-4" onClick={() => setCPassShow(true)} />
              )}
            </div>
            <button className="rounded-md w-40 h-8 border-2  bg-black text-white" onClick={addUserdata}>SIGN UP</button>

            <Link to="/LogIn" className="ml-1 font-semibold text-blue-500  ">Back To Login </Link>

          </div>
          <ToastContainer className="pt-24" />
        </div>
      </div>
    </div>


  );
}

export default SignUp
