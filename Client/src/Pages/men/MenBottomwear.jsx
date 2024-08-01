import React, { useContext, useState } from "react";
import Card from "../../Components/Card/Card";
import MenContext from "../../Contexts/MenContext/MenContext";
import FilterComponent from "../../Components/Filter/FilterMen";
import menBottomwear from "../../assets/Men_Images/banner1.jpg";

import { Link } from "react-router-dom";
function MenBottomwear() {
  const { bottomwearProducts,
    handleColor, handleCategory, errorbott, handleCompany, handleSize, handlePriceSort, clearFilter } = useContext(MenContext);


  const colors = ["Blue", "Black", "Green", "Yellow", "White", "Gray", "Purple"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const categories = ["Joggers", "Cargo-Pants", "Jeans"];
  const companies = ["Peter England", "Levi's", "Arrow", "Park Avenue", "U.S Polo"];
  const [menbottomfiltervalue, setMenBottomFilterValue] = useState(false)
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
            <li> BOTTOMWEAR</li>
          </ol>
        </nav>
        <img src={menBottomwear} alt="banner" className="w-full h-auto " />
        <div className="flex sm:hidden justify-end">
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={e => setMenBottomFilterValue(!menbottomfiltervalue)}>Filters</button>
        </div>
        <div className="flex relative justify-end flex-col">
          {(menbottomfiltervalue) ?
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
          <div className="hidden sm:block h-full sticky top-12">
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
                {bottomwearProducts && bottomwearProducts.map((product, index) => (
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
              {errorbott && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">{errorbott}</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default MenBottomwear;
