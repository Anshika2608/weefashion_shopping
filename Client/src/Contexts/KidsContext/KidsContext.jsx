import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const KidsContext = createContext();

export const KidsContextProvider = ({ children }) => {
  // ✅ Products
  const [kidsFootwearPro, setKidsFootwearPro] = useState([]);
  const [kidsTopwearPro, setKidsTopwearPro] = useState([]);
  const [kidsBottomwearPro, setKidsBottomwearPro] = useState([]);

  // ✅ Filters (separate for each category)
  const [kidsFootwearFilters, setKidsFootwearFilters] = useState({});
  const [kidsTopwearFilters, setKidsTopwearFilters] = useState({});
  const [kidsBottomwearFilters, setKidsBottomwearFilters] = useState({});

  // ✅ Errors
  const [footError, setFootError] = useState(null);
  const [topError, setTopError] = useState(null);
  const [botError, setBotError] = useState(null);

  // ✅ Loading states (separate or combined if you want)
  const [loading, setLoading] = useState(false);

  const url = "https://weefashion-backend.onrender.com";

  // 🎯 Fetch Kids Footwear
  useEffect(() => {
    const fetchKidsFootwear = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/api/Clothing/api/kidsFootwear`, {
          params: kidsFootwearFilters,
        });
        setKidsFootwearPro(response.data.products || []);
        setFootError(null);
      } catch (err) {
        setFootError("No products for this combination are available");
      } finally {
        setLoading(false);
      }
    };

    fetchKidsFootwear();
  }, [kidsFootwearFilters]);

  // 🎯 Fetch Kids Topwear
  useEffect(() => {
    const fetchKidsTopwear = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/api/Clothing/KidsTopwear`, {
          params: kidsTopwearFilters,
        });
        setKidsTopwearPro(response.data.products || []);
        setTopError(null);
      } catch (err) {
        setTopError("No products for this combination are available");
      } finally {
        setLoading(false);
      }
    };

    fetchKidsTopwear();
  }, [kidsTopwearFilters]);

  // 🎯 Fetch Kids Bottomwear
  useEffect(() => {
    const fetchKidsBottomwear = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/api/Clothing/KidsBottomwear`, {
          params: kidsBottomwearFilters,
        });
        setKidsBottomwearPro(response.data.products || []);
        setBotError(null);
      } catch (err) {
        setBotError("No products for this combination are available");
      } finally {
        setLoading(false);
      }
    };

    fetchKidsBottomwear();
  }, [kidsBottomwearFilters]);

  // ✅ Filter Handlers
  const handleKidsFootwearFilter = (key, value) =>
    setKidsFootwearFilters((prev) => ({ ...prev, [key]: value }));

  const handleKidsTopwearFilter = (key, value) =>
    setKidsTopwearFilters((prev) => ({ ...prev, [key]: value }));

  const handleKidsBottomwearFilter = (key, value) =>
    setKidsBottomwearFilters((prev) => ({ ...prev, [key]: value }));

  // ✅ Clear Filters
  const emptyFilter = () => {
    setKidsFootwearFilters({});
    setKidsTopwearFilters({});
    setKidsBottomwearFilters({});
    setFootError(null);
    setTopError(null);
    setBotError(null);

    document
      .querySelectorAll('input[type="radio"]')
      .forEach((radio) => (radio.checked = false));
  };

  return (
    <KidsContext.Provider
      value={{
        // Products
        kidsFootwearPro,
        kidsTopwearPro,
        kidsBottomwearPro,

        // Errors + loading
        loading,
        footError,
        topError,
        botError,

        // Handlers
        handleKidsFootwearFilter,
        handleKidsTopwearFilter,
        handleKidsBottomwearFilter,
        emptyFilter,
      }}
    >
      {children}
    </KidsContext.Provider>
  );
};

export default KidsContext;
