import React, { useEffect, useState } from "react";
import bgImage from "../../assets/image.png";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"
import { BiSolidUserCircle } from "react-icons/bi";
import {Link,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react";
import axios from "axios"
import  LoginContext  from "../../Contexts/LoginContext/LoginContext";
import "./LogIn.css"
function LogIn() {
  const { loginData, setLoginData,DashboardValid} = useContext(LoginContext);

  const [passShow, setPassShow] = useState(false);
const [inpval, setInpval] = useState({
  email: "",
  password: "",
});

const history = useNavigate();

const setVal = (e) => {
  // console.log(e.target.value);
  const { name, value } = e.target;

  setInpval(() => {
      return {
          ...inpval,
          [name]: value
      }
  })
};
const loginuser = async(e) => {
  e.preventDefault();

  const { email, password } = inpval;

  if (email === "") {
      toast.error("email is required!", {
          position: "top-right"
      });
  } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
          position: "top-right"
      });
  } else if (password === "") {
      toast.error("password is required!", {
          position: "top-right"
      });
  } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
          position: "top-right"
      });}
      try {
        const response = await axios.post("http://localhost:5000/api/login/login",{
                email,password
              })
              const responsedata = await response.data;
              console.log(responsedata)
              if(responsedata.status === 201){
                        localStorage.setItem("usersdatatoken",responsedata.result.token);
                        DashboardValid();
       
                        history("/")
                        setInpval({...inpval,email:"",password:""});
                    }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error; // Assuming your API returns error messages in a 'message' field
          toast.error(errorMessage, {
            position: "top-right"
          });
        } else {
          toast.error("An unexpected error occurred. Please try again later.", {
            position: "top-right"
          });
        }
      }

}
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
          <h1 className="text-3xl font-semibold mt-4 ">LOG IN</h1>
         
          </div>
          
          <div className="flex mb-8 mr-4 sm:mr-3">
            <MdOutlineMail className="absolute mt-2 text-slate-400 text-xl " />
            <input type="email" id="email" value={inpval.email} onChange={setVal} name="email" className="w-72 lg:w-96 h-8  border-b-2 pl-6 outline-none  focus:border-black bg-transparent " placeholder="Enter Your Email" />


          </div>


          <div className="flex relative mr-4">
              <RiLockPasswordFill className="absolute mt-2 text-slate-400 text-xl" />
              <input type={passShow ? "text" : "password"} id="password" onChange={setVal} value={inpval.password} name="password"  className="w-72 lg:w-96 h-8 border-b-2 pl-6 outline-none focus:border-black" placeholder="Enter Your Password" />
              {passShow ? (
                <FaRegEye className="mt-2 cursor-pointer -ml-4" onClick={() =>setPassShow(false)} />
              ) : (
                <FaRegEyeSlash className="mt-2 cursor-pointer -ml-4" onClick={() => setPassShow(true)} />
              )}
            </div>
          <div>
          <Link to="/Forgot" className="text-blue-500 md:ml-60 ml-40">Forgot Password?</Link>
          </div>
          <button className="rounded-md w-40 h-8 border-2  bg-black text-white" onClick={loginuser}>LOG IN</button>
          <p className="sm:text-slate-500 font-semibold">Don't have an account?
            <Link to="/SignUp" className="ml-1 sm:text-blue-500 text-black">Sign Up</Link>
          </p>
          </div>
          <ToastContainer />
        </div>
      </div>
      </div>
   

  );
}

export default LogIn;
