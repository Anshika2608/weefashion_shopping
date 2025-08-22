import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const MenContext = createContext();

export const MenContextProvider = ({ children }) => {
  const [topWearProducts, setTopWearProducts] = useState([]);
  const [bottomwearProducts, setBottomwearProducts] = useState([]);
  const [footwearProducts, setFootwearProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);

  // separate filters for each category
  const [menTopwearFilters, setMenTopwearFilters] = useState({});
  const [menBottomwearFilters, setMenBottomwearFilters] = useState({});
  const [menFootwearFilters, setMenFootwearFilters] = useState({});

  // error states
  const [errort, setErrort] = useState(null);
  const [errorbott, setErrorbott] = useState(null);
  const [errorfootw, setErrorfootw] = useState(null);

  const [menLoading, setMenLoading] = useState(true);
  const url = "https://weefashion-backend.onrender.com";

 useEffect(() => {
  const fetchTopwear = async () => {
    setMenLoading(true);
    try {
      await getTopwear();
    } finally {
      setMenLoading(false);
    }
  };
  fetchTopwear();
}, [menTopwearFilters]);

useEffect(() => {
  const fetchBottomwear = async () => {
    setMenLoading(true);
    try {
      await getBottomwear();
    } finally {
      setMenLoading(false);
    }
  };
  fetchBottomwear();
}, [menBottomwearFilters]);

useEffect(() => {
  const fetchFootwear = async () => {
    setMenLoading(true);
    try {
      await getFootwear();
    } finally {
      setMenLoading(false);
    }
  };
  fetchFootwear();
}, [menFootwearFilters]);

  // API calls
  const getTopwear = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/`, {
        params: menTopwearFilters,
      });
      setTopWearProducts(response.data.products);
      setErrort(null);
    } catch (error) {
      console.log("Error fetching topwear:", error);
      setErrort("No products for this combination is available");
    }
  };

  const getBottomwear = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/bottom`, {
        params: menBottomwearFilters,
      });
      setBottomwearProducts(response.data.products);
      setErrorbott(null);
    } catch (err) {
      console.log("Error fetching bottomwear:", err);
      setErrorbott("No products for this combination is available");
    }
  };

  const getFootwear = async () => {
    try {
      const response = await axios.get(`${url}/api/Clothing/MenFootwear`, {
        params: menFootwearFilters,
      });
      setFootwearProducts(response.data.products);
      setErrorfootw(null);
    } catch (err) {
      console.log("Error fetching footwear:", err);
      setErrorfootw("No products for this combination is available");
    }
  };

  // filter handlers (separate per category)
  const handleTopwearFilter = (key, value) =>
    setMenTopwearFilters((prev) => ({ ...prev, [key]: value }));

  const handleBottomwearFilter = (key, value) =>
    setMenBottomwearFilters((prev) => ({ ...prev, [key]: value }));

  const handleFootwearFilter = (key, value) =>
    setMenFootwearFilters((prev) => ({ ...prev, [key]: value }));

  // clear all filters
  const clearFilter = () => {
    setMenTopwearFilters({});
    setMenBottomwearFilters({});
    setMenFootwearFilters({});
    setErrort(null);
    setErrorbott(null);
    setErrorfootw(null);

    // reset any radio buttons on UI
    document
      .querySelectorAll('input[type="radio"]')
      .forEach((radio) => (radio.checked = false));
  };

  // get single product details
  const getSingleProduct = async (productId) => {
    try {
      const response = await axios.get(
        `${url}/api/Clothing/menProducts/${productId}`
      );
      setSingleProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching single product:", error);
    }
  };

  return (
    <MenContext.Provider
      value={{
        // products
        topWearProducts,
        bottomwearProducts,
        footwearProducts,

        // loading and errors
        menLoading,
        errort,
        errorbott,
        errorfootw,

        // single product
        singleProduct,
        getSingleProduct,

        // filters
        handleTopwearFilter,
        handleBottomwearFilter,
        handleFootwearFilter,
        clearFilter,
      }}
    >
      {children}
    </MenContext.Provider>
  );
};

export default MenContext;
