import React,{useState,useEffect,createContext} from "react";
import axios from 'axios'
const KidsContext=createContext();
export const KidsContextProvider=({children})=>{
    const[kidsfootwearpro,setKidsFootwearpro]=useState([])
    const[kidstopwearpro,setKidsTopwearpro]=useState([])
    const[kidsBottomwearpro,setKidsBottomwearpro]=useState([])
    const[kidsFilters,setKidsFilter]=useState({})
    const [toperror, setToperror] = useState(null);
    const[boterror,setboterror]=useState(null);
    const[footerror,setfooterror]=useState(null);
    useEffect(()=>{
        fetchKidsFootwear();
        fetchKidsTopwear();
        fetchKidsBottomwear();
    },[])
    const fetchKidsFootwear=async()=>{
        try{
         const response= await axios.get("http://localhost:5000/api/Clothing/api/kidsFootwear",{params:kidsFilters})
         setKidsFootwearpro( response.data.products)
         setfooterror(null)
         
        }catch(err){
         console.log(err)
         setfooterror("No products for this combination is available")
        }
    }
    const fetchKidsTopwear=async()=>{
        try{
         const response= await axios.get("http://localhost:5000/api/Clothing/KidsTopwear",{params:kidsFilters})
         setKidsTopwearpro( response.data.products)
         setToperror(null)
        }catch(err){
         console.log(err)
         setToperror("No products for this combination is available")

        }
    }
    const fetchKidsBottomwear=async()=>{
        try{
         const response= await axios.get("http://localhost:5000/api/Clothing/KidsBottomwear",{params:kidsFilters})
         setKidsBottomwearpro( response.data.products)
         setboterror(null)
         
        }catch(err){
         console.log(err)
         setboterror("No products for this combination is available")
        }
    }
    const emptyFilter =async () => {
        setKidsFilter({});
        setToperror(null); // Clear error for topwear
        setboterror(null); // Clear error for bottomwear
        setfooterror(null);
        // Uncheck all radio buttons
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio) => {
          radio.checked = false;
        });
      };
      const empty=async(radioId)=>{
        const radio = document.getElementById(radioId);
        if (radio) {
          radio.checked = false;
        }
      }
      useEffect(() => {
        const Topwear = async () => {
          try {
            await fetchKidsTopwear();
          } catch (error) {
            console.error("Error fetching topwear products:", error);
            setToperror("No products for this combination is available")
          }
        };
        const Bottomwear = async () => {
            try {
              await fetchKidsBottomwear();
            } catch (error) {
              console.error("Error fetching topwear products:", error);
              setboterror("No products for this combination is available")

            }
          };
          const Footwear = async () => {
            try {
              await fetchKidsFootwear();
            } catch (error) {
              console.error("Error fetching topwear products:", error);
              setfooterror("No products for this combination is available")

            }
          };
       Topwear(); 
        Bottomwear();
        Footwear();
      }, [kidsFilters]);
    const sizeFilter=(size)=>{
            setKidsFilter(prevFilters => ({ ...prevFilters, size }));
    }
    const ColorFilter=(color)=>{
        setKidsFilter(prevFilters => ({ ...prevFilters, color }));
    }
   const CategoryFilter=(Category)=>{
       setKidsFilter(prevFilters => ({ ...prevFilters, Category }));
   }
    const CompanyFilter=(company)=>{
      setKidsFilter(prevFilters => ({ ...prevFilters, company }));
    }
    const priceFilter=(sortBy)=>{
      setKidsFilter(prevFilters => ({ ...prevFilters, sortBy }));

    }
    return(   
        
       <KidsContext.Provider
        value={{kidsfootwearpro,sizeFilter,ColorFilter,CategoryFilter,priceFilter,toperror,boterror,footerror,kidsBottomwearpro,kidstopwearpro,CompanyFilter,emptyFilter}}
        >
        {children}
        </KidsContext.Provider>)
}
export default KidsContext;