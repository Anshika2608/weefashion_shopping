import React,{useState,useEffect,createContext} from 'react'
import axios from 'axios'
const WomenContext=createContext();
export const WomenContextProvider=({children})=>{
    const[topwearpro,setTopwearpro]=useState([])
    const[BottomWearpro,setBottomwearpro]=useState([])
    const[Footwearpro,setFootwearpro]=useState([])
    const [filters, setFilters] = useState({});
    const [error, setError] = useState(null);
    const[errorbot,seterrorbot]=useState(null);
    const[errorfoot,seterrorfoot]=useState(null);
  const[womenLoading,setWomenLoading]=useState(true)
  const url="https://weefashion-backend.onrender.com"
      useEffect(()=>{
      setWomenLoading(true)
      const timer=setTimeout(()=>{
        getTopwearProduct();
        getBottomwearProduct();
        getFootwearProduct();
      },2000)
    return () => clearTimeout(timer);  
    },[])
    const getTopwearProduct=async()=>{
        try{
            const response=await axios.get(`${url}/api/Clothing/womenTopwear`,{params:filters})
            setTopwearpro(response.data.products)
            setError(null);
        }catch(err){
            console.log(err);
            setError("No products for this combination is available")
        }
    };
    const getBottomwearProduct = async () => {
        // API call to fetch bottomwear products based on filters
        try {
            const response = await axios.get(`${url}/api/Clothing/Bottomwear`,{params:filters});
            setBottomwearpro(response.data.products);
            seterrorbot(null);
        } catch (err) {
            console.log(err);
             seterrorbot("No products for this combination is available")
        }
    };
    const getFootwearProduct=async()=>{
        try{
            const response=await axios.get(`${url}/api/Clothing/Footwear`,{params:filters})
            setFootwearpro(response.data.products)
            seterrorfoot(null)
        }catch(err){
            console.log(err);
            seterrorfoot("No products for this combination is available")
        }
    }
    const clearFilters =async (radioId) => {
        setFilters({});
        setError(null); // Clear error for topwear
        seterrorbot(null); // Clear error for bottomwear
        seterrorfoot(null);
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
      useEffect(() => {
        setWomenLoading(true)
        const fetchTopwearProduct = async () => {
          try {
            await getTopwearProduct();
          } catch (error) {
            console.error("Error fetching topwear products:", error);
            setError("No products for this combination is available")
          }
        };
        const fetchBottomwearProduct = async () => {
            try {
              await getBottomwearProduct();
            } catch (error) {
              console.error("Error fetching topwear products:", error);
              seterrorbot("No products for this combination is available")
            }
          };
          const fetchFootwearProduct = async () => {
            try {
              await getFootwearProduct();
            } catch (error) {
              console.error("Error fetching topwear products:", error);
              seterrorfoot("No products for this combination is available")
            }
          };
          const timer=setTimeout(()=>{
            fetchTopwearProduct(); 
            fetchBottomwearProduct();
            fetchFootwearProduct();
            setWomenLoading(false)
          },2000)
        return ()=>clearTimeout(timer)
       
      }, [filters]);
    const handleColorChange = (color) => {
        setFilters(prevFilters => ({ ...prevFilters, color }));
    };

    const handleSizeChange = (size) => {
        setFilters(prevFilters => ({ ...prevFilters, size }));
    };

    const handleCategoryChange = (Category) => {
        setFilters(prevFilters => ({ ...prevFilters, Category }));
    };

    const handleCompanyChange = (company) => {
        setFilters(prevFilters => ({ ...prevFilters, company }));
    };

    const handlePriceSortChange = (sortBy) => {
        setFilters(prevFilters => ({ ...prevFilters, sortBy }));
    };
    return(
        <WomenContext.Provider
        value={{topwearpro,BottomWearpro,Footwearpro,womenLoading,handleColorChange,handleSizeChange,error,errorbot,errorfoot,handleCategoryChange,handleCompanyChange,handlePriceSortChange,clearFilters}}
        >
        {children}
        </WomenContext.Provider>
    )
}
export default WomenContext;
