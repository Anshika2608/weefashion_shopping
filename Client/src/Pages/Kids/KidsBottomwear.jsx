import React, { useContext, useState } from "react";
import Card from "../../Components/Card/Card";
import KidsContext from "../../Contexts/KidsContext/KidsContext";
// import FilterKids from "../../Components/Filter/FilterKids";
import kidsbottomwear from "../../assets/Kids_Images/Kids_Topwear/banner2.webp";


import { Link } from "react-router-dom";
import FilterKids from "../../Components/Filter/FilterKids";
function KidsBottomwear() {
  const {
    kidsBottomwearpro, sizeFilter, ColorFilter, CategoryFilter, boterror, CompanyFilter, emptyFilter, priceFilter } = useContext(KidsContext);
  const kidcolors = ["Blue", "Black", "Pink", "White", "Purple"]
  const kidcompanys = ["Puma", "Park Avenue", "U.S Polo"]
  const kidcategorys = ["Shorts", "Pants"]
  const kidsizes = ["11Y", "12Y", "13Y", "14Y"]
  const [filterValue, setFiltervalue] = useState(false)
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
            <li> BOTTOMWEAR</li>
          </ol>
        </nav>
        <img src={kidsbottomwear} alt="banner" className="w-full h-[22rem] " />
        <div className="flex sm:hidden justify-end">
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={e => setFiltervalue(!filterValue)}>Filters</button>
        </div>
        <div className="flex flex-col relative justify-end ">

          {(filterValue) ?
            <div className="  absolute block bg-white">
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
          <div className=" h-full sticky top-12">
              <FilterKids
                className=" h-full"
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
                Bottomwear for Kids
              </h2>

              <div className="flex flex-wrap ">
                {kidsBottomwearpro && kidsBottomwearpro.map((product, index) => (
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
              {boterror && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">{boterror}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KidsBottomwear;
