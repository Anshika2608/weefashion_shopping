import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const WomenContext = createContext();

export const WomenContextProvider = ({ children }) => {
  const [topwearpro, setTopwearpro] = useState([]);
  const [BottomWearpro, setBottomwearpro] = useState([]);
  const [Footwearpro, setFootwearpro] = useState([]);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);
  const [errorbot, setErrorBot] = useState(null);
  const [errorfoot, setErrorFoot] = useState(null);
  const [womenLoading, setWomenLoading] = useState(true);
  const url = "https://weefashion-backend.onrender.com";

  useEffect(() => {
    setWomenLoading(true);

    const fetchData = async () => {
      try {
        await Promise.all([getTopwearProduct(), getBottomwearProduct(), getFootwearProduct()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setWomenLoading(false); 
      }
    };

    fetchData();
  }, [filters]); 

  
  const getTopwearProduct = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/womenTopwear`, { params: filters });
      setTopwearpro(response.data.products);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("No products for this combination is available");
    }
  };

  const getBottomwearProduct = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/Bottomwear`, { params: filters });
      setBottomwearpro(response.data.products);
      setErrorBot(null);
    } catch (err) {
      console.log(err);
      setErrorBot("No products for this combination is available");
    }
  };

  const getFootwearProduct = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/Footwear`, { params: filters });
      setFootwearpro(response.data.products);
      setErrorFoot(null);
    } catch (err) {
      console.log(err);
      setErrorFoot("No products for this combination is available");
    }
  };

  
  const clearFilters = () => {
    setFilters({});
    setError(null);
    setErrorBot(null);
    setErrorFoot(null);
    document.querySelectorAll('input[type="radio"]').forEach((radio) => (radio.checked = false));
  };

 
  const handleColorChange = (color) => setFilters((prev) => ({ ...prev, color }));
  const handleSizeChange = (size) => setFilters((prev) => ({ ...prev, size }));
  const handleCategoryChange = (Category) => setFilters((prev) => ({ ...prev, Category }));
  const handleCompanyChange = (company) => setFilters((prev) => ({ ...prev, company }));
  const handlePriceSortChange = (sortBy) => setFilters((prev) => ({ ...prev, sortBy }));

  return (
    <WomenContext.Provider
      value={{
        topwearpro,
        BottomWearpro,
        Footwearpro,
        womenLoading,
        handleColorChange,
        handleSizeChange,
        error,
        errorbot,
        errorfoot,
        handleCategoryChange,
        handleCompanyChange,
        handlePriceSortChange,
        clearFilters,
      }}
    >
      {children}
    </WomenContext.Provider>
  );
};

export default WomenContext;

