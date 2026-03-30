"use client";

import { useState } from 'react';
import ProductCard from '../Shared/ProductCard';

export default function DiscountedParts() {
    const [activeTab, setActiveTab] = useState('Chimneys');

    const tabs = ['Chimneys', 'Cookers'];

    const batteryImage = "/no-image.svg";
    const screenImage = "/no-image.svg";

    const products = {
        'Chimneys': [
            { id: 1, name: "sevilla Smart Island Chimney", price: "22000 TK", oldPrice: "30000", discount: "-27%", imageUrl: batteryImage },
            { id: 2, name: "sevilla Auto-Clean Chimney", price: "15000 TK", oldPrice: "18000", discount: "-17%", imageUrl: batteryImage },
            { id: 3, name: "Wall Mount Glass Chimney", price: "15000 TK", oldPrice: "18000", discount: "-17%", imageUrl: batteryImage },
            { id: 4, name: "Filterless Auto-Clean", price: "9000 TK", oldPrice: "12000", discount: "-25%", imageUrl: batteryImage },
            { id: 5, name: "sevilla Island Range Hood", price: "9000 TK", oldPrice: "12000", discount: "-25%", imageUrl: batteryImage },
            { id: 6, name: "Ductless Downdraft Chimney", price: "7000 TK", oldPrice: "9000", discount: "-22%", imageUrl: batteryImage },
            { id: 7, name: "Basic Wall Canopy Chimney", price: "7000 TK", oldPrice: "9000", discount: "-22%", imageUrl: batteryImage },
        ],
        'Cookers': [
            { id: 8, name: "Built-In Convection Oven", price: "12500 TK", oldPrice: "15000", discount: "-16%", imageUrl: screenImage },
            { id: 9, name: "Smart Induction Cooktop", price: "8500 TK", oldPrice: "10000", discount: "-15%", imageUrl: screenImage },
            { id: 10, name: "Eco Power Induction", price: "4500 TK", oldPrice: "5500", discount: "-18%", imageUrl: screenImage },
            { id: 11, name: "4-Burner Glass Top Stove", price: "3500 TK", oldPrice: "4500", discount: "-22%", imageUrl: screenImage },
            { id: 12, name: "Portable Gas Stove", price: "2000 TK", oldPrice: "2500", discount: "-20%", imageUrl: screenImage },
            { id: 13, name: "sevilla Microwave Oven", price: "15000 TK", oldPrice: "20000", discount: "-25%", imageUrl: screenImage },
        ]
    };

    const activeProducts = products[activeTab];

    return (
        <section className="bg-white py-8 md:py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="text-center mb-5 md:mb-10">
                    <h2 className="text-lg md:text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                        <span className="text-brand-red">MOST</span> DISCOUNTED
                    </h2>
                </div>

                <div className="flex justify-center border-b border-gray-200 mb-5 md:mb-10">
                    <div className="flex gap-6 md:gap-8 overflow-x-auto hide-scrollbar pb-[-1px]">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 md:pb-3 text-xs md:text-sm font-bold uppercase transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'text-brand-red border-b-2 border-brand-red'
                                    : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-3 md:gap-6 pb-2 snap-x snap-mandatory flex-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {activeProducts.map((product) => (
                        <div key={product.id} className="min-w-[150px] w-[150px] md:min-w-[240px] md:w-[240px] flex-shrink-0 snap-center">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

