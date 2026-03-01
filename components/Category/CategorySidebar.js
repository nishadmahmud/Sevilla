"use client";

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFilter, FiX } from 'react-icons/fi';

export default function CategorySidebar({ isOpen, onClose }) {
    // Mobile drawer state is controlled by parent (page.js)

    const [filters, setFilters] = useState({
        priceRange: [0, 50000],
        colors: [],
        brands: [],
        availability: []
    });

    const [expandedSections, setExpandedSections] = useState({
        price: true,
        brand: true,
        color: true,
        availability: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const brands = ["Bosch", "sevilla", "Whirlpool", "Siemens", "Faber"];
    const colors = [
        { name: "Stainless Steel", hex: "#C0C0C0" },
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Grey", hex: "#808080" },
        { name: "sevilla Red", hex: "#e31e24" },
        { name: "Glass Black", hex: "#1a1a1a" }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside className={`
        fixed inset-y-0 right-0 z-50 w-[280px] bg-white border-l border-gray-100 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-full lg:shadow-none lg:border-none lg:bg-transparent
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>

                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
                    <span className="font-bold text-lg flex items-center gap-2">
                        <FiFilter /> Filters
                    </span>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-5 lg:p-0 space-y-6 overflow-y-auto h-full lg:h-auto pb-20 lg:pb-0">

                    {/* Price Range */}
                    <div className="border-b border-gray-100 pb-6">
                        <button
                            onClick={() => toggleSection('price')}
                            className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-4"
                        >
                            <span>Price Range</span>
                            {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {expandedSections.price && (
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">৳</span>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">৳</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>
                                </div>
                                <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red" />
                            </div>
                        )}
                    </div>

                    {/* Brands */}
                    <div className="border-b border-gray-100 pb-6">
                        <button
                            onClick={() => toggleSection('brand')}
                            className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-4"
                        >
                            <span>Brands</span>
                            {expandedSections.brand ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {expandedSections.brand && (
                            <div className="space-y-2.5">
                                {brands.map(brand => (
                                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer h-4 w-4 border border-gray-300 rounded text-brand-red focus:ring-brand-red" />
                                        </div>
                                        <span className="text-sm text-gray-600 group-hover:text-brand-red transition-colors">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="border-b border-gray-100 pb-6">
                        <button
                            onClick={() => toggleSection('availability')}
                            className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-4"
                        >
                            <span>Availability</span>
                            {expandedSections.availability ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        {expandedSections.availability && (
                            <div className="space-y-2.5">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded text-brand-red focus:ring-brand-red" />
                                    <span className="text-sm text-gray-600 group-hover:text-brand-red">All</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded text-brand-red focus:ring-brand-red" />
                                    <span className="text-sm text-gray-600 group-hover:text-brand-red">In Stock</span>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Colors */}
                    <div className="pb-6">
                        <button
                            onClick={() => toggleSection('color')}
                            className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-4"
                        >
                            <span>Color</span>
                            {expandedSections.color ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {expandedSections.color && (
                            <div className="flex flex-wrap gap-3">
                                {colors.map(color => (
                                    <button
                                        key={color.name}
                                        className="w-8 h-8 rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110 focus:ring-2 focus:ring-brand-red focus:ring-offset-2 relative"
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    >
                                        {color.name === 'White' && <span className="absolute inset-0 rounded-full border border-gray-100"></span>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Footer Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white lg:hidden flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-bold text-sm">
                        Reset
                    </button>
                    <button onClick={onClose} className="flex-1 py-3 bg-brand-red text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-red/20">
                        Apply Filters
                    </button>
                </div>
            </aside>
        </>
    );
}
