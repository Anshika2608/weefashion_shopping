import React, { useContext, useState } from "react";
import Card from "../../Components/Card/Card";
import MenContext from "../../Contexts/MenContext/MenContext";
import FilterComponent from "../../Components/Filter/FilterMen";
import menTopwear from "../../assets/Men_Images/banner.jpg";

import { Link } from "react-router-dom";
function MenTopwear() {
  const { topWearProducts, errort, handleColor, handleCategory, handleCompany, handleSize, handlePriceSort, clearFilter } = useContext(MenContext);

  const colors = ["Blue", "Black", "Green", "Yellow", "White", "Gray", "Purple", "Red"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const categories = ["Activewear", "Half Sleeves Shirt", "Full sleeves Shirt", "Jacket", "T-shirt"];
  const companies = ["Peter England", "Levi's", "Arrow", "Park Avenue", "U.S Polo"];
  const [mentopfiltervalue, setMenTopFilterValue] = useState(false)
  return (
    <>
      <div className="pt-24">
        <nav
          aria-label="breadcrumb"
          className="my-4 ml-6 text-slate-500 text-sm"
        >
          <ol className="flex">
            <li>
              <Link to="/">HOME {">"} </Link>
            </li>
            <li>
              <Link to="/men"> MEN CLOTHING {">"} </Link>
            </li>
            <li>TOPWEAR</li>
          </ol>
        </nav>
        <img src={menTopwear} alt="banner" className="w-full h-auto " />
        <div className="flex sm:hidden justify-end">
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={e => setMenTopFilterValue(!mentopfiltervalue)}>Filters</button>
        </div>
        <div className="flex relative flex-col justify-end ">
          {(mentopfiltervalue) ?
            <div className="absolute block bg-white">
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
            <div className=" h-full sticky top-12">
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
                Topwear for Men
              </h2>

              <div className="flex flex-wrap">
                {topWearProducts &&
                  topWearProducts.map((product, index) => (
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
              {errort && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">{errort}</p>
              )}
            </div>
          </div>
        </div>
</div>
      </>
      );
}

      export default MenTopwear;
