import React from 'react'

function FilterKids({kidcolors,kidcompanys,kidcategorys,kidsizes,sizeFilter,ColorFilter,CategoryFilter,priceFilter,CompanyFilter,emptyFilter}) {
  return (
    <>
                <div className="w-64 border-b ml-6 border-dashed border-slate-400">
                    <p className="font-bold text-xl mt-6">FILTER</p>

                </div>
                <div className="ml-6 mt-4 flex flex-col  ">
                    <p className="font-bold text-lg text-slate-700 my-5">COLOR</p>
                    {
                        kidcolors.map((kidcolor,index ) => (
                            <label htmlFor={kidcolor} key={index}>
                                <input type="radio" id={kidcolor}  value={kidcolor} onChange={(e) => ColorFilter(e.target.value)} name="color" />{kidcolor}
                            </label>
                        ))
                    }
                </div>
                <div className="ml-6 mt-4 flex flex-col">
                    <p className="font-bold text-lg text-slate-700 my-5">SIZE</p>
                    {
                        (kidsizes).map((kidsize,index) => (
                            <label htmlFor={kidsize} key={index}>
                                <input type="radio" name='size' id={kidsize} value={kidsize} onChange={(e) => sizeFilter(e.target.value)} />{" "}
                                {kidsize}
                            </label>
                        ))
                    }

                </div>
                <div className="ml-6 mt-4 flex flex-col">
                    <p className="font-bold text-lg text-slate-700 my-5">CATEGORY</p>
                    {
                        (kidcategorys).map((kidcategory,index) => (
                            <label htmlFor={kidcategory} key={index}>
                                <input type="radio" id={kidcategory} value={kidcategory} name='category' onChange={(e) => CategoryFilter(e.target.value)} />
                                {kidcategory}
                            </label>
                        ))
                    }

                </div>
                <div className="ml-6 mt-4 flex flex-col">
                    <p className="font-bold text-lg text-slate-700 my-5">SIZE</p>
                    {
                        (kidcompanys).map((kidcompany,index) => (
                            <label htmlFor={kidcompany} key={index}>
                                <input type="radio" id={kidcompany} value={kidcompany} name="company" onChange={(e) =>CompanyFilter(e.target.value)} />
                                {kidcompany}
                            </label>
                        ))
                    }

                </div>
                <div className="ml-6 mt-4 flex flex-col ">
                    <p className="font-bold text-lg text-slate-700 my-5">PRICE</p>
                    <label htmlFor="ltoh">
                        <input type="radio" id="ltoh" value="ltoh" name="ltoh" onChange={() => priceFilter("low_to_high")} /> Price-Low to High
                    </label>
                    <label htmlFor="htol">
                        <input type="radio" id="htol" value="htol" name="ltoh" onChange={() => priceFilter("high_to_low")} /> Price-High to Low
                    </label>
                </div>
                <button
                    onClick={emptyFilter}
                    className="bg-slate-300 h-8 w-32  ml-6 rounded-md text-center my-3 "
                >
                    Clear Filters
                </button>
            {/* </div> */}
    </>
  )
}

export default FilterKids