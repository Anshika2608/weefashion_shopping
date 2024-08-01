import React, { useContext, useState,useEffect } from "react";
import Card from "../../Components/Card/Card";
import MenContext from "../../Contexts/MenContext/MenContext";
import FilterComponent from "../../Components/Filter/FilterMen";
import menfootwear from "../../assets/Men_Images/bannerfoot.jpg";
import CardSkeleton from "../../Components/Card Skeleton/Card_skeleton";
import { Link } from "react-router-dom";
function MenFootwear() {
  const { footwearProducts,
    handleColor, handleCategory, handleCompany, handleSize, handlePriceSort, clearFilter, errorfootw,menLoading } = useContext(MenContext);
  const colors = ["Blue", "Black", "Yellow", "White", "Gray", "Red"];
  const sizes = ["UK6", "UK7", "UK8", "UK8"];
  const categories = ["Walking Shoes", "Sneakers", "Flipflops & Sandals"];
  const companies = ["Puma", "Nike", "Campus"];
  const [menfootfiltervalue, setMenFootFilterValue] = useState(false)
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
              <Link to="/men"> MEN CLOTHING {'>'} </Link>
            </li>
            <li> FOOTWEAR</li>
          </ol>
        </nav>
        <img src={menfootwear} alt="banner" className="w-full h-[22rem] " />
        <div className="flex sm:hidden justify-end">
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={e => setMenFootFilterValue(!menfootfiltervalue)}>Filters</button>
        </div>
        <div className="flex relative flex-col justify-end">
          {(menfootfiltervalue) ?
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 p-4">
                            <FilterComponent
                colors={colors}
                sizes={sizes}
                categories={categories}
                companies={companies}
                handleColor={handleColor}
                handleCategory={handleCategory}
                handleCompany={handleCompany}
                handleSize={handleSize}
                handlePriceSort={handlePriceSort}
                clearFilter={clearFilter}
              />
            </div>
            : ""}
          <div className="sm:flex relative ">
            <div className=" h-full sm:block hidden sticky top-12">
              <FilterComponent
                colors={colors}
                sizes={sizes}
                categories={categories}
                companies={companies}
                handleColor={handleColor}
                handleCategory={handleCategory}
                handleCompany={handleCompany}
                handleSize={handleSize}
                handlePriceSort={handlePriceSort}
                clearFilter={clearFilter}
              />
            </div>
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
                  footwearProducts.map((product) => (
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
              {errorfootw && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">{errorfootw}</p>
              )}
            </div>
          </div>
        </div>
</div>
      </>
      );
}

      export default MenFootwear;
