import React from 'react';

function FilterWomen({
    womencolors,
    womencompanys,
    womencategorys,
    womensizes,
    handleColorChange,
    handleSizeChange,
    handleCategoryChange,
    handleCompanyChange,
    handlePriceSortChange,
    clearFilters,
}) {
    return (
        <div className="flex flex-col h-full sticky top-0">
            <div className="w-64 border-b ml-6 border-dashed border-slate-400">
                <p className="font-bold text-xl mt-6">FILTER</p>
            </div>
            <div className="ml-6 mt-4 flex flex-col">
                <p className="font-bold text-lg text-slate-700 my-5">COLOR</p>
                {womencolors.map((womencolor) => (
                    <label key={womencolor} htmlFor={womencolor}>
                        <input
                            type="radio"
                            id={womencolor}
                            value={womencolor}
                            onChange={(e) => handleColorChange(e.target.value)}
                            name="color"
                        />
                        {womencolor}
                    </label>
                ))}
            </div>
            <div className="ml-6 mt-4 flex flex-col">
                <p className="font-bold text-lg text-slate-700 my-5">SIZE</p>
                {womensizes.map((womensize) => (
                    <label key={womensize} htmlFor={womensize}>
                        <input
                            type="radio"
                            id={womensize}
                            value={womensize}
                            onChange={(e) => handleSizeChange(e.target.value)}
                            name="size"
                        />
                        {womensize}
                    </label>
                ))}
            </div>
            <div className="ml-6 mt-4 flex flex-col">
                <p className="font-bold text-lg text-slate-700 my-5">CATEGORY</p>
                {womencategorys.map((womencategory) => (
                    <label key={womencategory} htmlFor={womencategory}>
                        <input
                            type="radio"
                            id={womencategory}
                            value={womencategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            name="category"
                        />
                        {womencategory}
                    </label>
                ))}
            </div>
            <div className="ml-6 mt-4 flex flex-col">
                <p className="font-bold text-lg text-slate-700 my-5">COMPANY</p>
                {womencompanys.map((womencompany) => (
                    <label key={womencompany} htmlFor={womencompany}>
                        <input
                            type="radio"
                            id={womencompany}
                            value={womencompany}
                            onChange={(e) => handleCompanyChange(e.target.value)}
                            name="company"
                        />
                        {womencompany}
                    </label>
                ))}
            </div>
            <div className="ml-6 mt-4 flex flex-col">
                <p className="font-bold text-lg text-slate-700 my-5">PRICE</p>
                <label htmlFor="ltoh">
                    <input
                        type="radio"
                        id="ltoh"
                        value="low_to_high"
                        name="price"
                        onChange={() => handlePriceSortChange('low_to_high')}
                    />
                    Price-Low to High
                </label>
                <label htmlFor="htol">
                    <input
                        type="radio"
                        id="htol"
                        value="high_to_low"
                        name="price"
                        onChange={() => handlePriceSortChange('high_to_low')}
                    />
                    Price-High to Low
                </label>
            </div>
            <button
                onClick={clearFilters}
                className="bg-slate-300 h-8 w-32 ml-6 rounded-md text-center my-3"
            >
                Clear Filters
            </button>
        </div>
    );
}

export default FilterWomen;
