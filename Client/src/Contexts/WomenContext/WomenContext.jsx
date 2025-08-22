import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const WomenContext = createContext();

export const WomenContextProvider = ({ children }) => {
  const [topwearpro, setTopwearpro] = useState([]);
  const [bottomwearpro, setBottomwearpro] = useState([]);
  const [footwearpro, setFootwearpro] = useState([]);

  // ✅ Separate filters for each category
  const [womenTopwearFilters, setWomenTopwearFilters] = useState({});
  const [womenBottomwearFilters, setWomenBottomwearFilters] = useState({});
  const [womenFootwearFilters, setWomenFootwearFilters] = useState({});

  // Errors
  const [errorTop, setErrorTop] = useState(null);
  const [errorBot, setErrorBot] = useState(null);
  const [errorFoot, setErrorFoot] = useState(null);

  const [womenLoading, setWomenLoading] = useState(false);
  const url = "https://weefashion-backend.onrender.com";

  // 🎯 useEffect for Topwear
  useEffect(() => {
    const fetchTopwear = async () => {
      setWomenLoading(true);
      try {
        const response = await axios.get(`${url}/api/Clothing/womenTopwear`, {
          params: womenTopwearFilters,
        });
        setTopwearpro(response.data.products);
        setErrorTop(null);
      } catch (err) {
        console.log(err);
        setErrorTop("No products for this combination is available");
      } finally {
        setWomenLoading(false);
      }
    };

    fetchTopwear();
  }, [womenTopwearFilters]);

  // 🎯 useEffect for Bottomwear
  useEffect(() => {
    const fetchBottomwear = async () => {
      setWomenLoading(true);
      try {
        const response = await axios.get(`${url}/api/Clothing/Bottomwear`, {
          params: womenBottomwearFilters,
        });
        setBottomwearpro(response.data.products);
        setErrorBot(null);
      } catch (err) {
        console.log(err);
        setErrorBot("No products for this combination is available");
      } finally {
        setWomenLoading(false);
      }
    };

    fetchBottomwear();
  }, [womenBottomwearFilters]);

  // 🎯 useEffect for Footwear
  useEffect(() => {
    const fetchFootwear = async () => {
      setWomenLoading(true);
      try {
        const response = await axios.get(`${url}/api/Clothing/Footwear`, {
          params: womenFootwearFilters,
        });
        setFootwearpro(response.data.products);
        setErrorFoot(null);
      } catch (err) {
        console.log(err);
        setErrorFoot("No products for this combination is available");
      } finally {
        setWomenLoading(false);
      }
    };

    fetchFootwear();
  }, [womenFootwearFilters]);

  // ✅ separate filter handlers
  const handleTopwearFilter = (key, value) =>
    setWomenTopwearFilters((prev) => ({ ...prev, [key]: value }));

  const handleBottomwearFilter = (key, value) =>
    setWomenBottomwearFilters((prev) => ({ ...prev, [key]: value }));

  const handleFootwearFilter = (key, value) =>
    setWomenFootwearFilters((prev) => ({ ...prev, [key]: value }));

  // ✅ clear filters for all categories
  const clearFilters = () => {
    setWomenTopwearFilters({});
    setWomenBottomwearFilters({});
    setWomenFootwearFilters({});
    setErrorTop(null);
    setErrorBot(null);
    setErrorFoot(null);

    document
      .querySelectorAll('input[type="radio"]')
      .forEach((radio) => (radio.checked = false));
  };

  return (
    <WomenContext.Provider
      value={{
        // products
        topwearpro,
        bottomwearpro,
        footwearpro,

        // loading + errors
        womenLoading,
        errorTop,
        errorBot,
        errorFoot,

        // handlers
        handleTopwearFilter,
        handleBottomwearFilter,
        handleFootwearFilter,
        clearFilters,
      }}
    >
      {children}
    </WomenContext.Provider>
  );
};

export default WomenContext;
