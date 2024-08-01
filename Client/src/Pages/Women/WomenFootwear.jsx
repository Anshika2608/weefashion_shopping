import React, { useContext, useState } from "react";
import Card from "../../Components/Card/Card";
import WomenContext from "../../Contexts/WomenContext/WomenContext";
import FilterWomen from "../../Components/Filter/FilterWomen";
import womenFootwear from "../../assets/Women_Images/footwearbannerw.jpg";

import { Link } from "react-router-dom";
function WomenFootwear() {
  const { Footwearpro,
    handleSizeChange,
    handleColorChange,
    handleCategoryChange,
    handleCompanyChange,
    handlePriceSortChange,
    clearFilters, errorfoot } = useContext(WomenContext);

  const womencolors = ["Blue", "Black", "Yellow", "White", "Gray", "Pink"];
  const womencompanys = ["Puma", "Nike", "Campus"];
  const womencategorys = ["Badminton shoes", "Slip-ons & Ballerinas", "Flipflops", "Sneakers"];
  const womensizes = ["UK6", "UK7", "UK8"];
  const [womenfootfiltervalue, setWomenFootFilterValue] = useState(false)
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
            <li> FOOTWEAR</li>
          </ol>
        </nav>
        <img src={womenFootwear} alt="banner" className="w-full h-[22rem]" />
        <div className="flex sm:hidden justify-end">
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={e => setWomenFootFilterValue(!womenfootfiltervalue)}>Filters</button>
        </div>
        <div className="flex relative flex-col justify-end">
          {(womenfootfiltervalue) ?
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
            <div className=" h-full sm:block hidden sticky top-12">
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
              <h2 className="text-2xl font-bold mb-4 mt-6 ml-6 ">
                Footwear for Women
              </h2>


              <div className="flex flex-wrap">
                {Footwearpro && Footwearpro.map((product, index) => (
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
              {errorfoot && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">{errorfoot}</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default WomenFootwear;
