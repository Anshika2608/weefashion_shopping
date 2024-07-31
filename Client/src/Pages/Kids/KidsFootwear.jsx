import React, { useContext, useState } from "react";
import Card from "../../Components/Card/Card";
import KidsContext from "../../Contexts/KidsContext/KidsContext";
import FilterKids from "../../Components/Filter/FilterKids";
import kidfootwear from "../../assets/Kids_Images/Kids_Topwear/kidsfootbanner.png";
import { Link } from "react-router-dom";
function KidsFootwear() {
  const {
    kidsfootwearpro, sizeFilter, ColorFilter, CategoryFilter, footerror, CompanyFilter, emptyFilter, priceFilter } = useContext(KidsContext);
  const [kidfootfiltervalue, setKidFootFilterValue] = useState(false)
  const kidcolors = ["Blue", "Black", "Yello", "White", "Green", "Red", "Pink"]
  const kidcompanys = ["Puma", "Nike", "Campus"]
  const kidcategorys = ["Sandals", "Flipflops", "Shoes"]
  const kidsizes = ["11Y", "12Y", "13Y", "14Y"]
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
            <li> FOOTWEAR</li>
          </ol>
        </nav>
        <img src={kidfootwear} alt="banner" className="w-full h-[22rem] " />
        <div className="flex sm:hidden justify-end">
          <button className="  h-9 font-bold  m-4  w-20 cursor-pointer bg-cyan-700 text-white rounded-md " onClick={e => setKidFootFilterValue(!kidfootfiltervalue)}>Filters</button>
        </div>
        <div className="flex relative flex-col justify-end">
          {(kidfootfiltervalue) ?
            <div className="absolute block bg-white">
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
                Footwear for Kids
              </h2>

              <div className="flex flex-wrap">
                {kidsfootwearpro && kidsfootwearpro.map((product, index) => (
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
              {footerror && (
                <p className="text-center mt-6 mb-4 text-gray-600 text-xl italic capitalize">{footerror}</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default KidsFootwear;
