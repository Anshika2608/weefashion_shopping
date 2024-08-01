import React from "react";

const FilterComponent = ({
  colors,
  sizes,
  categories,
  companies,
  handleColor,
  handleCategory,
  handleCompany,
  handleSize,
  handlePriceSort,
  clearFilter,
}) => {
  return (
    <>
      <div className="w-64 border-b ml-6 border-dashed border-slate-400">
        <p className="font-bold text-xl mt-6">FILTER</p>
      </div>

      {/* Color Filter */}
      <div className="ml-6 mt-4 flex flex-col">
        <p className="font-bold text-lg text-slate-700 my-5">COLOR</p>
        {colors.map((color) => (
          <label key={color} htmlFor={color}>
            <input type="radio" id={color} name="color" value={color} onChange={() => handleColor(color)} /> {color}
          </label>
        ))}
      </div>

      {/* Size Filter */}
      <div className="ml-6 mt-4 flex flex-col">
        <p className="font-bold text-lg text-slate-700 my-5">SIZE</p>
        {sizes.map((size) => (
          <label key={size} htmlFor={size}>
            <input type="radio" id={size} value={size} name="size" onChange={() => handleSize(size)} /> {size}
          </label>
        ))}
      </div>

      {/* Category Filter */}
      <div className="ml-6 mt-4 flex flex-col">
        <p className="font-bold text-lg text-slate-700 my-5">CATEGORY</p>
        {categories.map((category) => (
          <label key={category} htmlFor={category} >
            <input
              type="radio"
              id={category}
              value={category}
              onChange={() => handleCategory(category)}
              name="category"
            />{" "}
            {category}
          </label>
        ))}
      </div>

      {/* Company Filter */}
      <div className="ml-6 mt-4 flex flex-col">
        <p className="font-bold text-lg text-slate-700 my-5">COMPANY</p>
        {companies.map((company) => (
          <label key={company} htmlFor={company}>
            <input
            name="company"
              type="radio"
              id={company}
              value={company}
              onChange={() => handleCompany(company)}
            />{" "}
            {company}
          </label>
        ))}
      </div>

      {/* Price Filter */}
      <div className="ml-6 mt-4 flex flex-col">
        <p className="font-bold text-lg text-slate-700 my-5">PRICE</p>
        <label htmlFor="ltoh">
          <input
            type="radio"
            id="ltoh"
            value="ltoh"
            name="price"
            onChange={() => handlePriceSort("low_to_high")}
          />{" "}
          Price-Low to High
        </label>
        <label htmlFor="htol">
          <input
            type="radio"
            id="htol"
            value="htol"
            name="price"
            onChange={() => handlePriceSort("high_to_low")}
          />{" "}
          Price-High to Low
        </label>
      </div>

      <button
        onClick={clearFilter}
        className="bg-slate-300 h-8 w-32 ml-6 rounded-md text-center my-3"
      >
        Clear Filters
      </button>
      </>
  );
};

export default FilterComponent;