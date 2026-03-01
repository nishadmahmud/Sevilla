"use client";

import { useState } from 'react';
import { FiGrid, FiList, FiFilter, FiChevronDown } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';
import CustomDropdown from '../Shared/CustomDropdown';

export default function ProductGrid({ products, onOpenFilter }) {
    const [sortBy, setSortBy] = useState("Sort by: Featured");

    const sortOptions = [
        { label: "Sort by: Featured", value: "Sort by: Featured" },
        { label: "Price: Low to High", value: "Price: Low to High" },
        { label: "Price: High to Low", value: "Price: High to Low" },
        { label: "Newest Arrivals", value: "Newest Arrivals" },
    ];

    return (
        <div>
            {/* Top Bar: View Toggles, Sort, filter (mobile) */}
            <div className="flex items-center gap-2 mb-6">

                {/* View Toggles */}
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shrink-0">
                    <button className="p-1.5 md:p-2 bg-gray-100 text-gray-900 rounded-md">
                        <FiGrid size={16} className="md:w-5 md:h-5" />
                    </button>
                    <button className="p-1.5 md:p-2 text-gray-400 hover:text-gray-600 rounded-md">
                        <FiList size={16} className="md:w-5 md:h-5" />
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex-grow">
                    <CustomDropdown
                        options={sortOptions}
                        value={sortBy}
                        onChange={setSortBy}
                    />
                </div>

                {/* Mobile Filter Button */}
                <button
                    onClick={onOpenFilter}
                    className="lg:hidden flex items-center justify-center gap-1.5 bg-white border border-gray-200 py-[9px] px-3 rounded-lg text-gray-700 hover:bg-gray-50 shrink-0 text-xs md:text-sm font-semibold"
                >
                    <FiFilter size={15} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-red text-white font-bold shadow-lg shadow-brand-red/30">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold transition-colors">3</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">...</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold transition-colors">8</button>
            </div>
        </div>
    );
}
