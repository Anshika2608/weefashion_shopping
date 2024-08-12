import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FaUserCircle } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import LoginContext from "../../Contexts/LoginContext/LoginContext";
function Navbar() {
  const [dropdownState, setDropdownState] = useState({
    isMenuOpen: false,
    isSubMenuOpen: false,
    isWomenMenuOpen: false,
    isKidsMenuOpen: false,
  });
  const history = useNavigate()
  const { loginData, setLoginData, DashboardValid } = useContext(LoginContext);
const url="https://weefashion-backend.onrender.com"
  useEffect(() => {

    DashboardValid();


    // fetchData();

  }, []);

  const toggleDropdown = (dropdown) => {
    setDropdownState({
      ...dropdownState,
      [dropdown]: !dropdownState[dropdown],
    });
  };
  const logoutuser = async () => {
    console.log("hi")
    let token = localStorage.getItem("usersdatatoken");
    console.log(token)
    const res = await fetch(`${url}/api/logoutUser/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      console.log("use logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false)
      history("/");
    } else {
      console.log("error");
    }
  }
  const handleHomeClick = () => {
    setDropdownState({
      isMenuOpen: false,
      isSubMenuOpen: false,
      isWomenMenuOpen: false,
      isKidsMenuOpen: false,
    });

  };
  return (
    <>
      <nav className="flex w-full gap-4 justify-between sm:gap-0 fixed  items-center bg-white h-24  shadow-2xl  z-50 top-0 ">
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="lg:h-16 lg:w-48 w-40 h-12  left-4 lg:ml-4 "
          />
        </div>

        <div className="hidden md:flex md:justify-center md:gap-10 md:items-center md:w-full">
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-4 text-lg ${isActive ? "underline decoration-2" : ""}`
              }
            >
              Home
            </NavLink>
          </div>

          <div className="relative inline-block group">
            <div className="p-4 text-lg flex items-center">Men </div>
            <div className="absolute  bg-white pt-2 w-36 border border-gray-200 border-t-0 shadow-lg hidden group-hover:block">
              <NavLink
                to="/MenTopwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Topwear
              </NavLink>
              <NavLink
                to="/MenBottomwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Bottomwear
              </NavLink>
              <NavLink
                to="/MenFootwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Footwear
              </NavLink>
            </div>
          </div>
          <div className="relative inline-block group">
            <div className="p-4 text-lg flex items-center">Women </div>
            <div className="absolute  bg-white pt-2 w-36 border border-gray-200 border-t-0 shadow-lg hidden group-hover:block">
              <NavLink
                to="/WomenTopwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Topwear
              </NavLink>
              <NavLink
                to="/WomenBottomwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Bottomwear
              </NavLink>
              <NavLink
                to="/Womenfootwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Footwear
              </NavLink>
            </div>
          </div>
          <div className="relative inline-block group">
            <div className="p-4 text-lg flex items-center">Kids</div>
            <div className="absolute  bg-white pt-2 w-36 border border-gray-200 border-t-0 shadow-lg hidden group-hover:block">
              <NavLink
                to="/KidsTopwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Topwear
              </NavLink>
              <NavLink
                to="/KidsBottomwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Bottomwear
              </NavLink>
              <NavLink
                to="/KidsFootwear"
                className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white"
              >
                Footwear
              </NavLink>
            </div>
          </div>
        </div>
        <div className="items-center  sm:mr-20 md:mr-16 md:gap-4 gap-2 flex  ">

          <div >
            <NavLink
              to="/Wishlist"
              className={({ isActive }) =>
                `p-2 text-red-500  md:h-8  h-10 hidden sm:block md:text-3xl md:mb-3 text-2xl  order-1   ${isActive ? "underline decoration-2" : ""
                }`
              }
            >
              <CiHeart />
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                ` h-8 p-3 hidden sm:block md:text-2xl text-xl mb-3 ${isActive ? "underline decoration-2" : ""
                }`
              }
            >
              <BsCart3 />
            </NavLink>
          </div>

          <div className="relative inline-block group ">
            {
              loginData && loginData.ValidUserOne ?
                <div className=" mt-2 text-lg flex items-center  rounded-full h-7 text-center pl-2 w-7 bg-black text-white  ">{loginData.ValidUserOne.fname[0].toUpperCase()}
                </div> :
                <div className="p-4 text-lg flex items-center  "><FaUserCircle className="text-3xl mt-2" /> </div>
            }
            <div className="absolute   bg-white pt-2 w-32 border border-gray-200 border-t-0 shadow-lg hidden group-hover:block ">
              {loginData && loginData.ValidUserOne ?
                <NavLink
                  to="/Login"
                  onClick={() => logoutuser()}
                  className="block px-4 py-2  text-gray-800 hover:bg-black hover:text-white"
                >
                  Logout
                </NavLink> : <NavLink
                  to="/Login"
                  className="block px-4 py-2  text-gray-800 hover:bg-black hover:text-white"
                >
                  Login
                </NavLink>
              }
              
              <NavLink
                to="/newProduct"
                className="block px-4 py-2 text-gray-800 hover:bg-black  hover:text-white"
              >
                Add Product
              </NavLink>
            
          <div >
            <NavLink
              to="/Wishlist"
              className=  "h-8 p-3 block sm:hidden md:text-2xl text-xl mb-3   hover:bg-black  hover:text-white"               

            >
              <CiHeart />
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/cart"
              className="hover:bg-black  hover:text-white  h-8 p-3 block sm:hidden md:text-2xl text-xl mb-3 
"
  
            >
              <BsCart3 />
            </NavLink>
          </div>


            </div>
            
          </div>
          <div className="md:hidden order-last">
            <button
              onClick={() => toggleDropdown("isMenuOpen")}
              className="p-4 focus:outline-none "
            >
              {dropdownState.isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-24 left-0  transform transition-transform duration-300 ${dropdownState.isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden w-2/4 h-full bg-white border-b border-gray-200 shadow-lg z-50`}
      >
        <div className=" flex flex-col ">
          <div>
            <NavLink
              to="/"
              className="block text-lg p-4 pb-0 text-gray-800 hover:bg-gray-200 "
              onClick={handleHomeClick}
            >
              Home
            </NavLink>
          </div>

          <div className="relative inline-block group">
            <div className="p-4 pb-0 text-lg flex  items-center">
              Men
              <button
                onClick={() => toggleDropdown("isSubMenuOpen")}
                className="text-sm mt-1 ml-1"
              >
                {dropdownState.isSubMenuOpen ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>{" "}
            </div>
            <div
              className={`relative bg-white ${dropdownState.isSubMenuOpen ? "block" : "hidden"
                }`}
            >
              <NavLink
                to="/MenTopwear"
                className="block px-8 py-2 text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Topwear
              </NavLink>
              <NavLink
                to="/MenBottomwear"
                className="block px-8 py-2 text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Bottomwear
              </NavLink>
              <NavLink
                to="/MenFootwear"
                className="block px-8 py-2  text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Footwear
              </NavLink>
            </div>
          </div>
          <div className="relative inline-block group">
            <div className="p-4 pb-0 text-lg flex items-center">
              Women
              <button
                onClick={() => toggleDropdown("isWomenMenuOpen")}
                className="text-sm mt-1 ml-1"
              >
                {dropdownState.isWomenMenuOpen ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>{" "}
            </div>
            <div
              className={`relative bg-white ${dropdownState.isWomenMenuOpen ? "block" : "hidden"
                }`}
            >
              <NavLink
                to="/WomenTopwear"
                className="block px-8 py-2 text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Topwear
              </NavLink>
              <NavLink
                to="/WomenBottomwear"
                className="block px-8 py-2 text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Bottomwear
              </NavLink>
              <NavLink
                to="/WomenFootwear"
                className="block px-8 py-2 text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Footwear
              </NavLink>
            </div>
          </div>
          <div className="relative inline-block group">
            <div className="p-4 pb-0 text-lg flex items-center">
              Kids
              <button
                onClick={() => toggleDropdown("isKidsMenuOpen")}
                className="text-sm mt-1 ml-1"
              >
                {dropdownState.isKidsMenuOpen ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>{" "}
            </div>
            <div
              className={`relative bg-white ${dropdownState.isKidsMenuOpen ? "block" : "hidden"
                }`}
            >
              <NavLink
                to="/KidsTopwear"
                className="block px-8 py-2 text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Topwear
              </NavLink>
              <NavLink
                to="/KidsBottomwear"
                className="block px-8 py-2 text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Bottomwear
              </NavLink>
              <NavLink
                to="/KidsFootwear"
                className="block px-8 py-2 text-gray-800 hover:bg-black hover:text-white"
                onClick={handleHomeClick}
              >
                Footwear
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
