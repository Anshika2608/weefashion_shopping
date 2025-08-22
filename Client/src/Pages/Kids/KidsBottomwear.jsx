import React, { Suspense, lazy, useContext, useState } from "react";
const Card = lazy(() => import("../../Components/Card/Card"));

import KidsContext from "../../Contexts/KidsContext/KidsContext";
// import FilterKids from "../../Components/Filter/FilterKids";
import kidsbottomwear from "../../assets/Kids_Images/Kids_Topwear/banner2.webp";
import CardSkeleton from "../../Components/Card Skeleton/Card_skeleton";


import { Link } from "react-router-dom";
import FilterKids from "../../Components/Filter/FilterKids";
function KidsBottomwear() {
  const {
    kidsBottomwearPro, handleKidsBottomwearFilter, boterror, loading,emptyFilter } = useContext(KidsContext);
  const kidColors = ["Blue", "Black", "Pink", "White", "Purple"]
  const kidCompanies = ["Puma", "Park Avenue", "U.S Polo"]
  const kidCategories = ["Shorts", "Pants"]
  const kidSizes = ["11Y", "12Y", "13Y", "14Y"]
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
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={(e) => setFiltervalue(!filterValue)}>Filters</button>
        </div>
        <div className="flex flex-col relative justify-end ">

          {filterValue && (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 p-4">
              <FilterKids

                kidColors={kidColors}
                kidCompanies={kidCompanies}
                kidCategories={kidCategories}
                kidSizes={kidSizes}
                ColorFilter={(val) => handleKidsBottomwearFilter("color", val)}
                CategoryFilter={(val) => handleKidsBottomwearFilter("category", val)}
                CompanyFilter={(val) => handleKidsBottomwearFilter("company", val)}
                sizeFilter={(val) => handleKidsBottomwearFilter("size", val)}
                priceFilter={(val) => handleKidsBottomwearFilter("sort", val)}
                clearFilters={emptyFilter}
              />
            </div>
          )}
          <div className=" sm:flex relative ">
            <div className="hidden sm:block h-full sticky top-12">
              <FilterKids

                kidColors={kidColors}
                kidCompanies={kidCompanies}
                kidCategories={kidCategories}
                kidSizes={kidSizes}
                ColorFilter={(val) => handleKidsBottomwearFilter("color", val)}
                CategoryFilter={(val) => handleKidsBottomwearFilter("category", val)}
                CompanyFilter={(val) => handleKidsBottomwearFilter("company", val)}
                sizeFilter={(val) => handleKidsBottomwearFilter("size", val)}
                priceFilter={(val) => handleKidsBottomwearFilter("sort", val)}
                clearFilters={emptyFilter}
              />
              
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold mb-4 mt-6 ml-6 ">
                Bottomwear for Kids
              </h2>

              <div className="flex flex-wrap">
                {loading ? (
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="m-4">
                      <CardSkeleton />
                    </div>
                  ))
                ) : (
                  kidsBottomwearPro.map((product) => (
                    <div key={product.id} className="m-4">
                      <Suspense fallback={<CardSkeleton />}>
                        <Card
                          id={product.id}
                          src={product.image}
                          title={product.Title}
                          Previous={product.previous_price}
                          Current={product.Current_price}
                          discount={product.discount}
                        />
                      </Suspense>
                    </div>
                  ))
                )}
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
