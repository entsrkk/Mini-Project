import React from 'react';

const Categories = ({ allCategories, filterItems }) => {
    return (
        <div >
            {allCategories.map((product_type, index) => {
                return (
                    <button className="btn btn-error mx-2 hover:bg-[#8f262b] hover:text-base-100" key={index} onClick={() => filterItems(product_type)} >
                        {product_type}
                    </button>
                );
            })}
        </div>
    )
}

export default Categories;
