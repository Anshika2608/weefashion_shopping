import React, { useContext, useState } from "react";
import Card from "../../Components/Card/Card";
import WomenContext from "../../Contexts/WomenContext/WomenContext";
import FilterWomen from "../../Components/Filter/FilterWomen";
import womenBottomwear from "../../assets/Women_Images/banner3.jpg";
import CardSkeleton from "../../Components/Card Skeleton/Card_skeleton";
import { Link } from "react-router-dom";
function WomenBottomwear() {
  const { BottomWearpro,
    handleSizeChange,
    handleColorChange,
    handleCategoryChange,
    handleCompanyChange,
    handlePriceSortChange,
    errorbot,
    clearFilters,
    womenLoading } = useContext(WomenContext);

  const womencolors = ["Blue", "Black", "Green", "Yellow", "White", "Gray", "Brown", "Peach"];
  const womencompanys = ["Peter England", "Levi's", "Arrow", "U.S Polo"];
  const womencategorys = ["Boxers", "Couple Boxers", "Pants", "Jegging"];
  const womensizes = ["S", "M", "L", "XL", "XXL"];
  const [womenbottomfiltervalue, setWomenBottomFilterValue] = useState(false)
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
              <Link to="/men"> WOMEN CLOTHING {'>'} </Link>
            </li>
            <li> BOTTOMWEAR</li>
          </ol>
        </nav>
        <img src={womenBottomwear} alt="banner" className="w-full h-auto " />
        <div className="flex sm:hidden justify-end">
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={e => setWomenBottomFilterValue(!womenbottomfiltervalue)}>Filters</button>
        </div>
        <div className="flex relative flex-col justify-end ">
          {(womenbottomfiltervalue) ?
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 p-4">
              <FilterWomen
                womencolors={womencolors}
                womencompanys={womencompanys}
                womencategorys={womencategorys}
                womensizes={womensizes}
                handleColorChange={handleColorChange}
                handleSizeChange={handleSizeChange}
                handleCategoryChange={handleCategoryChange}
                handleCompanyChange={handleCompanyChange}
                handlePriceSortChange={handlePriceSortChange}
                clearFilters={clearFilters}
              />

            </div>
            : ""}
          <div className="sm:flex relative ">
            <div className=" h-full sticky top-12 sm:block hidden">
              <FilterWomen
                womencolors={womencolors}
                womencompanys={womencompanys}
                womencategorys={womencategorys}
                womensizes={womensizes}
                handleColorChange={handleColorChange}
                handleSizeChange={handleSizeChange}
                handleCategoryChange={handleCategoryChange}
                handleCompanyChange={handleCompanyChange}
                handlePriceSortChange={handlePriceSortChange}
                clearFilters={clearFilters}
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold mb-4 mt-6 ml-6">Bottomwear for Women</h2>

              <div className="flex flex-wrap">
                {womenLoading ? (
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="m-4">
                      <CardSkeleton />
                    </div>
                  ))
                ) : (
                  BottomWearpro.map((product) => (
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
                  ))
                )}
              </div>

              {errorbot && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">{errorbot}</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default WomenBottomwear;
