import React, { useContext, useState, lazy, Suspense } from "react";
const Card = lazy(() => import("../../Components/Card/Card"));
import MenContext from "../../Contexts/MenContext/MenContext";
import FilterComponent from "../../Components/Filter/FilterMen";
import menBottomwear from "../../assets/Men_Images/banner1.jpg";
import CardSkeleton from "../../Components/Card Skeleton/Card_skeleton";
import { Link } from "react-router-dom";

function MenBottomwear() {
  const {
    bottomwearProducts,
    handleBottomwearFilter,  // ✅ use bottomwear-specific handler
    errorbott,
    clearFilter,
    menLoading,
  } = useContext(MenContext);

  const colors = ["Blue", "Black", "Green", "Yellow", "White", "Gray", "Purple"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const categories = ["Joggers", "Cargo-Pants", "Jeans"];
  const companies = ["Peter England", "Levi's", "Arrow", "Park Avenue", "U.S Polo"];

  const [menbottomfiltervalue, setMenBottomFilterValue] = useState(false);

  return (
    <>
      <div className="pt-24">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="my-4 ml-6 text-slate-500 text-sm">
          <ol className="flex">
            <li>
              <Link to="/">HOME {'>'} </Link>
            </li>
            <li>
              <Link to="/men"> MEN CLOTHING {'>'} </Link>
            </li>
            <li> BOTTOMWEAR</li>
          </ol>
        </nav>

        {/* Banner */}
        <img src={menBottomwear} alt="banner" className="w-full h-auto " />

        {/* Mobile Filter Button */}
        <div className="flex sm:hidden justify-end">
          <button
            className="h-9 font-bold m-4 w-20 cursor-pointer bg-cyan-700 text-white rounded-md"
            onClick={() => setMenBottomFilterValue(!menbottomfiltervalue)}
          >
            Filters
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex relative justify-end flex-col">
          {menbottomfiltervalue && (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 p-4">
              <FilterComponent
                colors={colors}
                sizes={sizes}
                categories={categories}
                companies={companies}
                handleColor={(val) => handleBottomwearFilter("color", val)}
                handleCategory={(val) => handleBottomwearFilter("category", val)}
                handleCompany={(val) => handleBottomwearFilter("company", val)}
                handleSize={(val) => handleBottomwearFilter("size", val)}
                handlePriceSort={(val) => handleBottomwearFilter("sortBy", val)}
                clearFilter={clearFilter}
              />
            </div>
          )}

          <div className="sm:flex relative ">
            {/* Sidebar Filter */}
            <div className="hidden sm:block h-full sticky top-12">
              <FilterComponent
                colors={colors}
                sizes={sizes}
                categories={categories}
                companies={companies}
                handleColor={(val) => handleBottomwearFilter("color", val)}
                handleCategory={(val) => handleBottomwearFilter("category", val)}
                handleCompany={(val) => handleBottomwearFilter("company", val)}
                handleSize={(val) => handleBottomwearFilter("size", val)}
                handlePriceSort={(val) => handleBottomwearFilter("sortBy", val)}
                clearFilter={clearFilter}
              />
            </div>

            {/* Products */}
            <div className="ml-6">
              <h2 className="text-2xl font-bold mb-4 mt-6 ml-6 ">
                Bottomwear for Men
              </h2>

              <div className="flex flex-wrap">
                {menLoading ? (
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="m-4">
                      <CardSkeleton />
                    </div>
                  ))
                ) : (
                  bottomwearProducts.map((product) => (
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

              {errorbott && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">
                  {errorbott}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenBottomwear;
