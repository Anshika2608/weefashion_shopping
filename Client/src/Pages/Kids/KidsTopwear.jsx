import React, { useContext, useState } from "react";
import Card from "../../Components/Card/Card";
import KidsContext from "../../Contexts/KidsContext/KidsContext";
import FilterKids from "../../Components/Filter/FilterKids";
import kidstopwear from "../../assets/Kids_Images/Kids_Topwear/kids_banner1.jpg";


import { Link } from "react-router-dom";
function KidsTopwear() {
  const {
    kidstopwearpro, sizeFilter, ColorFilter, CategoryFilter, toperror, CompanyFilter, emptyFilter, priceFilter } = useContext(KidsContext);

  const kidcolors = ["Blue", "Black", "Yellow", "White", "Green", "Purple", "Red", "Pink", "Gray"]
  const kidcompanys = ["Puma", "Park Avenue", "U.S Polo"]
  const kidcategorys = ["Hoodie", "Sweatshirt", "T-shirt"]
  const kidsizes = ["11Y", "12Y", "13Y", "14Y"]
  const [kidtopfiltervalue, setKidTopFilterValue] = useState(false)
  return (
    <>
      <div className="pt-24">
        <nav
          aria-label="breadcrumb"
          className="my-4 ml-6 text-slate-500 text-sm"
        >
          <ol className="flex">
            <li>
              <Link to="/">HOME {'>'}  </Link>
            </li>
            <li>
              <Link to="/men"> KIDS CLOTHING {'>'} </Link>
            </li>
            <li> FOOTWEAR</li>
          </ol>
        </nav>
        <img src={kidstopwear} alt="banner" className="w-full h-[22rem] " />
        <div className="flex sm:hidden justify-end">
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={e => setKidTopFilterValue(!kidtopfiltervalue)}>Filters</button>
        </div>
        <div className="flex relative flex-col justify-end ">
          {(kidtopfiltervalue) ?
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 p-4">
              <FilterKids

                kidcolors={kidcolors}
                kidcompanys={kidcompanys}
                kidsizes={kidsizes}
                kidcategorys={kidcategorys}
                CompanyFilter={CompanyFilter}
                emptyFilter={emptyFilter}
                priceFilter={priceFilter}
                sizeFilter={sizeFilter}
                ColorFilter={ColorFilter}
                CategoryFilter={CategoryFilter}
              />
            </div>
            : ""}
          <div className="sm:flex relative ">
            <div className="hidden sm:block h-full sticky top-12">
              <FilterKids
                kidcolors={kidcolors}
                kidcompanys={kidcompanys}
                kidsizes={kidsizes}
                kidcategorys={kidcategorys}
                CompanyFilter={CompanyFilter}
                emptyFilter={emptyFilter}
                priceFilter={priceFilter}
                sizeFilter={sizeFilter}
                ColorFilter={ColorFilter}
                CategoryFilter={CategoryFilter}
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold mb-4 mt-6 ml-6 ">
                Footwear for Kids
              </h2>

              <div className="flex flex-wrap ">
                {kidstopwearpro && kidstopwearpro.map((product, index) => (
                  <div key={product.id} className="m-4">
                    <Card
                      id={product.id}
                      src={product.image}
                      title={product.Title}
                      Previous={product.previous_price}
                      Current={product.Current_price}
                      discount={product.discount}
                    />
                  </div>
                ))}
              </div>
              {toperror && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">{toperror}</p>
              )}
            </div>
          </div>
        </div>
       </div>
      </>
      );
}

      export default KidsTopwear;
