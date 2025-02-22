import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const KidsContext = createContext();

export const KidsContextProvider = ({ children }) => {
  const [kidsfootwearpro, setKidsFootwearpro] = useState([]);
  const [kidstopwearpro, setKidsTopwearpro] = useState([]);
  const [kidsBottomwearpro, setKidsBottomwearpro] = useState([]);
  const [kidsFilters, setKidsFilter] = useState({});
  const [toperror, setToperror] = useState(null);
  const [boterror, setboterror] = useState(null);
  const [footerror, setfooterror] = useState(null);
  const [loading, setLoading] = useState(true);
  const url="https://weefashion-backend.onrender.com"
    useEffect(() => {
      setLoading(true);
  
      const fetchData = async () => {
        try {
          await Promise.all([fetchKidsFootwear(), fetchKidsTopwear(), fetchKidsBottomwear()]);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); 
        }
      };
  
      fetchData();
    }, [kidsFilters]); 
  const fetchKidsFootwear = async () => {
  
    try {
      const response = await axios.get(`${url}/api/Clothing/api/kidsFootwear`, { params: kidsFilters });
      setKidsFootwearpro(response.data.products);
      setfooterror(null);
    } catch (err) {
      setfooterror("No products for this combination is available");
    }
  };

  const fetchKidsTopwear = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/KidsTopwear`, { params: kidsFilters });
      setKidsTopwearpro(response.data.products);
      setToperror(null);
    } catch (err) {
      setToperror("No products for this combination is available");
    }
  };

  const fetchKidsBottomwear = async () => {
    
    try {
      const response = await axios.get(`${url}/api/Clothing/KidsBottomwear`, { params: kidsFilters });
      setKidsBottomwearpro(response.data.products);
      setboterror(null);
    } catch (err) {
      setboterror("No products for this combination is available");
    }
  };

  const emptyFilter = async () => {
    setKidsFilter({});
    setToperror(null);
    setboterror(null);
    setfooterror(null);
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });
  };

  const sizeFilter = (size) => {
    setKidsFilter((prevFilters) => ({ ...prevFilters, size }));
  };

  const ColorFilter = (color) => {
    setKidsFilter((prevFilters) => ({ ...prevFilters, color }));
  };

  const CategoryFilter = (Category) => {
    setKidsFilter((prevFilters) => ({ ...prevFilters, Category }));
  };

  const CompanyFilter = (company) => {
    
    setKidsFilter((prevFilters) => ({ ...prevFilters, company }));
  };

  const priceFilter = (sortBy) => {
 
    setKidsFilter((prevFilters) => ({ ...prevFilters, sortBy }));
  };
  return (
    <KidsContext.Provider
      value={{
        kidsfootwearpro,
        sizeFilter,
        ColorFilter,
        CategoryFilter,
        priceFilter,
        toperror,
        boterror,
        footerror,
        kidsBottomwearpro,
        kidstopwearpro,
        CompanyFilter,
        emptyFilter,
        loading
      }}
    >
      {children}
    </KidsContext.Provider>
  );
};

export default KidsContext;

