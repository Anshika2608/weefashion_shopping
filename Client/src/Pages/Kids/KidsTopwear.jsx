import React, { Suspense, lazy, useContext, useState } from "react";
const Card = lazy(() => import("../../Components/Card/Card"));
import KidsContext from "../../Contexts/KidsContext/KidsContext";
import FilterKids from "../../Components/Filter/FilterKids";
import kidstopwear from "../../assets/Kids_Images/Kids_Topwear/kids_banner1.jpg";
import CardSkeleton from "../../Components/Card Skeleton/Card_skeleton";

import { Link } from "react-router-dom";
function KidsTopwear() {
  const {
    kidsTopwearPro, handleKidsTopwearFilter, toperror,emptyFilter,loading } = useContext(KidsContext);

  const kidColors = ["Blue", "Black", "Yellow", "White", "Green", "Purple", "Red", "Pink", "Gray"]
  const kidCompanies = ["Puma", "Park Avenue", "U.S Polo"]
  const kidCategories = ["Hoodie", "Sweatshirt", "T-shirt"]
  const kidSizes = ["11Y", "12Y", "13Y", "14Y"]
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
            <li> TOPWEAR</li>
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

                kidColors={kidColors}
                kidCompanies={kidCompanies}
                kidCategories={kidCategories}
                kidSizes={kidSizes}
                ColorFilter={(val) => handleKidsTopwearFilter("color", val)}
                CategoryFilter={(val) => handleKidsTopwearFilter("category", val)}
                CompanyFilter={(val) => handleKidsTopwearFilter("company", val)}
                sizeFilter={(val) => handleKidsTopwearFilter("size", val)}
                priceFilter={(val) => handleKidsTopwearFilter("sort", val)}
                clearFilters={emptyFilter}
              />
            </div>
            : ""}
          <div className="sm:flex relative ">
            <div className="hidden sm:block h-full sticky top-12">
             <FilterKids

                kidColors={kidColors}
                kidCompanies={kidCompanies}
                kidCategories={kidCategories}
                kidSizes={kidSizes}
                ColorFilter={(val) => handleKidsTopwearFilter("color", val)}
                CategoryFilter={(val) => handleKidsTopwearFilter("category", val)}
                CompanyFilter={(val) => handleKidsTopwearFilter("company", val)}
                sizeFilter={(val) => handleKidsTopwearFilter("size", val)}
                priceFilter={(val) => handleKidsTopwearFilter("sort", val)}
                clearFilters={emptyFilter}
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold mb-4 mt-6 ml-6 ">
                Topwear for Kids
              </h2>

              <div className="flex flex-wrap">
                {loading ? (
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="m-4">
                      <CardSkeleton />
                    </div>
                  ))
                ) : (
                  kidsTopwearPro.map((product) => (
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
