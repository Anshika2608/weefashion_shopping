import React, { Suspense, lazy, useContext, useState } from "react";
const Card = lazy(() => import("../../Components/Card/Card"));
import KidsContext from "../../Contexts/KidsContext/KidsContext";
import FilterKids from "../../Components/Filter/FilterKids";
import kidfootwear from "../../assets/Kids_Images/Kids_Topwear/kidsfootbanner.png";
import { Link } from "react-router-dom";
import CardSkeleton from "../../Components/Card Skeleton/Card_skeleton";

function KidsFootwear() {
  const {
    kidsFootwearPro,
    footerror,
    handleKidsFootwearFilter,
    emptyFilter,
    loading,
  } = useContext(KidsContext);

  const [kidfootfiltervalue, setKidFootFilterValue] = useState(false);

  const kidColors = ["Blue", "Black", "Yellow", "White", "Green", "Red", "Pink"];
  const kidCompanies = ["Puma", "Nike", "Campus"];
  const kidCategories = ["Sandals", "Flipflops", "Shoes"];
  const kidSizes = ["11Y", "12Y", "13Y", "14Y"];

  return (
    <>
      <div className="pt-24">
        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="my-4 ml-6 text-slate-500 text-sm"
        >
          <ol className="flex">
            <li>
              <Link to="/">HOME {">"} </Link>
            </li>
            <li>
              <Link to="/men"> KIDS CLOTHING {">"} </Link>
            </li>
            <li> FOOTWEAR</li>
          </ol>
        </nav>

        {/* Banner */}
        <img src={kidfootwear} alt="banner" className="w-full h-[22rem]" />

        {/* Mobile Filters */}
        <div className="flex sm:hidden justify-end">
          <button
            className="h-9 font-bold m-4 w-20 cursor-pointer bg-cyan-700 text-white rounded-md"
            onClick={(e) => setKidFootFilterValue(!kidfootfiltervalue)}
          >
            Filters
          </button>
        </div>

        <div className="flex relative flex-col justify-end">
          {/* Mobile Filter Drawer */}
          {kidfootfiltervalue && (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 p-4">
              <FilterKids
                kidColors={kidColors}
                kidCompanies={kidCompanies}
                kidCategories={kidCategories}
                kidSizes={kidSizes}
                ColorFilter={(val) => handleKidsFootwearFilter("color", val)}
                CategoryFilter={(val) => handleKidsFootwearFilter("category", val)}
                CompanyFilter={(val) => handleKidsFootwearFilter("company", val)}
                sizeFilter={(val) => handleKidsFootwearFilter("size", val)}
                priceFilter={(val) => handleKidsFootwearFilter("sort", val)}
                clearFilters={emptyFilter}
              />
            </div>
          )}

          {/* Desktop Filter */}
          <div className="sm:flex relative">
            <div className="hidden sm:block h-full sticky top-12">
              <FilterKids
                kidColors={kidColors}
                kidCompanies={kidCompanies}
                kidCategories={kidCategories}
                kidSizes={kidSizes}
                ColorFilter={(val) => handleKidsFootwearFilter("color", val)}
                CategoryFilter={(val) => handleKidsFootwearFilter("category", val)}
                CompanyFilter={(val) => handleKidsFootwearFilter("company", val)}
                sizeFilter={(val) => handleKidsFootwearFilter("size", val)}
                priceFilter={(val) => handleKidsFootwearFilter("sort", val)}
                clearFilters={emptyFilter}
              />

            </div>

            {/* Product Grid */}
            <div className="ml-6">
              <h2 className="text-2xl font-bold mb-4 mt-6 ml-6 ">
                Footwear for Kids
              </h2>

              <div className="flex flex-wrap">
                {loading ? (
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="m-4">
                      <CardSkeleton />
                    </div>
                  ))
                ) : (
                  kidsFootwearPro.map((product) => (
                    <div key={product._id || product.id} className="m-4">
                      <Suspense fallback={<CardSkeleton />}>
                        <Card
                          id={product._id || product.id}
                          src={product.image}
                          title={product.title || product.Title}
                          Previous={product.previous_price}
                          Current={product.current_price || product.Current_price}
                          discount={product.discount}
                        />
                      </Suspense>
                    </div>
                  ))
                )}
              </div>

              {/* Error Message */}
              {footerror && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">
                  {footerror}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KidsFootwear;
