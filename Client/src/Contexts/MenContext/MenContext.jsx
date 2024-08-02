import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const MenContext = createContext();

export const MenContextProvider = ({ children }) => {
  const [topWearProducts,settopWearProducts]=useState([])
  const [bottomwearProducts,setbottomwearProducts]=useState([])
  const[footwearProducts,setFootwearProducts]=useState([])
  const [singleProduct, setSingleProduct] = useState(null);
  const[menFilters,setMenFilters]=useState({})
  const [errort, setErrort] = useState(null);
  const[errorbott,seterrorbott]=useState(null);
  const[errorfootw,seterrorfootw]=useState(null);
  const[menLoading,setMenLoading]=useState(true)
  const url="https://weefashion-shopping-backend-01lg.onrender.com"
  useEffect(() => {
    setMenLoading(true);
    const timer = setTimeout(() => {
      getFootwear();
      getTopwear();
      getBottomwear();
      setMenLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  const getTopwear = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/`,{params:menFilters});
      settopWearProducts(response.data.products)
      setErrort(null)
    } catch (error) {
      console.log("Error fetching data:", error);
      setErrort("No products for this combination is available")
    }
  };
  const getBottomwear=async()=>{
    try{
       const response=await axios.get(`${url}/api/Clothing/bottom`,{params:menFilters});
        setbottomwearProducts(response.data.products)
       seterrorbott(null)
    }
    catch(err){
      console.log(err);
      seterrorbott("No products for this combination is available")

    }
  }
  const getFootwear=async()=>{
    try{
       const response=await axios.get(`${url}/api/Clothing/MenFootwear`,{params:menFilters});
        setFootwearProducts(response.data.products) 
        seterrorfootw(null)

    }
    catch(err){
      console.log(err);
      seterrorfootw("No products for this combination is available")

    }
  }
  const clearFilter =async (radioId) => {
    setMenFilters({});
    setErrort(null); // Clear error for topwear
        seterrorbott(null); // Clear error for bottomwear
        seterrorfootw(null);
    // Uncheck all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });
    const radio = document.getElementById(radioId);
    if (radio) {
      radio.checked = false;
    }
  };
  const empty=async(radioId)=>{
    const radio = document.getElementById(radioId);
    if (radio) {
      radio.checked = !radio.checked;
    }
  }
  useEffect(() => {
    setMenLoading(true);
    const fetchTopwear = async () => {
      try {
        await getTopwear();
      } catch (error) {
        console.error("Error fetching topwear products:", error);
        setErrort("No products for this combination is available")

      }
    };
    const fetchBottomwear = async () => {
        try {
          await getBottomwear();
        } catch (error) {
          console.error("Error fetching topwear products:", error);
          seterrorbott("No products for this combination is available")

        }
      };
      const fetchFootwear = async () => {
        try {
          await getFootwear();
        } catch (error) {
          console.error("Error fetching topwear products:", error);
          seterrorfootw("No products for this combination is available")

        }
      };
      const timer = setTimeout(() => {
        fetchTopwear();
        fetchBottomwear();
        fetchFootwear();
        setMenLoading(false);
      }, 2000); // 2 seconds delay
  
      return () => clearTimeout(timer);
  }, [menFilters]);
const handleColor = (color) => {
  setMenFilters(prevFilters => ({ ...prevFilters, color }));
};

const handleSize = (size) => {
  setMenFilters(prevFilters => ({ ...prevFilters, size }));
};

const handleCategory = (Category) => {
  setMenFilters(prevFilters => ({ ...prevFilters, Category }));
};

const handleCompany= (company) => {
  setMenFilters(prevFilters => ({ ...prevFilters, company }));
};

const handlePriceSort = (sortBy) => {
  setMenFilters(prevFilters => ({ ...prevFilters, sortBy }));
};

const getSingleProduct = async (productId) => {
    try {
      const response = await axios.get(
        `${url}/api/Clothing/menProducts/${productId}`
      );
      setSingleProduct(response.data);
     console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
return (
    <MenContext.Provider
      value={{ bottomwearProducts,topWearProducts,footwearProducts,clearFilter ,menLoading,errorfootw,errorbott,errort,empty, getSingleProduct, singleProduct,handleColor,handleCategory,handleCompany,handleSize,handlePriceSort }}
    >
      {children}
    </MenContext.Provider>
  );
};

export default MenContext;
