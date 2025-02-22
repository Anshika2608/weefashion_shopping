import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const MenContext = createContext();

export const MenContextProvider = ({ children }) => {
  const [topWearProducts, setTopWearProducts] = useState([]);
  const [bottomwearProducts, setBottomwearProducts] = useState([]);
  const [footwearProducts, setFootwearProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [menFilters, setMenFilters] = useState({});
  const [errort, setErrort] = useState(null);
  const [errorbott, setErrorbott] = useState(null);
  const [errorfootw, setErrorfootw] = useState(null);
  const [menLoading, setMenLoading] = useState(true);
  const url = "https://weefashion-backend.onrender.com";

  useEffect(() => {
    setMenLoading(true);

    const fetchData = async () => {
      try {
        await Promise.all([getTopwear(), getBottomwear(), getFootwear()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setMenLoading(false); 
      }
    };

    fetchData();
  }, [menFilters]); 

  
  const getTopwear = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/`, { params: menFilters });
      setTopWearProducts(response.data.products);
      setErrort(null);
    } catch (error) {
      console.log("Error fetching data:", error);
      setErrort("No products for this combination is available");
    }
  };

  const getBottomwear = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/bottom`, { params: menFilters });
      setBottomwearProducts(response.data.products);
      setErrorbott(null);
    } catch (err) {
      console.log(err);
      setErrorbott("No products for this combination is available");
    }
  };

  const getFootwear = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/MenFootwear`, { params: menFilters });
      setFootwearProducts(response.data.products);
      setErrorfootw(null);
    } catch (err) {
      console.log(err);
      setErrorfootw("No products for this combination is available");
    }
  };

  
  const handleColor = (color) => setMenFilters((prev) => ({ ...prev, color }));
  const handleSize = (size) => setMenFilters((prev) => ({ ...prev, size }));
  const handleCategory = (Category) => setMenFilters((prev) => ({ ...prev, Category }));
  const handleCompany = (company) => setMenFilters((prev) => ({ ...prev, company }));
  const handlePriceSort = (sortBy) => setMenFilters((prev) => ({ ...prev, sortBy }));

  
  const clearFilter = () => {
    setMenFilters({});
    setErrort(null);
    setErrorbott(null);
    setErrorfootw(null);
    document.querySelectorAll('input[type="radio"]').forEach((radio) => (radio.checked = false));
  };


  const getSingleProduct = async (productId) => {
    try {
      const response = await axios.get(`${url}/api/Clothing/menProducts/${productId}`);
      setSingleProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MenContext.Provider
      value={{
        bottomwearProducts,
        topWearProducts,
        footwearProducts,
        clearFilter,
        menLoading,
        errorfootw,
        errorbott,
        errort,
        getSingleProduct,
        singleProduct,
        handleColor,
        handleCategory,
        handleCompany,
        handleSize,
        handlePriceSort,
      }}
    >
      {children}
    </MenContext.Provider>
  );
};

export default MenContext;

