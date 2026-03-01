"use client";

import { useState } from 'react';
import { FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

export default function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedStorage, setSelectedStorage] = useState(product.variants?.storage?.[0]);
    const [selectedColor, setSelectedColor] = useState(product.variants?.colors?.[0]);
    const [selectedRegion, setSelectedRegion] = useState(product.variants?.regions?.[0]);

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const variants = {};
        if (selectedStorage) variants.storage = selectedStorage;
        if (selectedColor) variants.colors = selectedColor;
        if (selectedRegion) variants.region = selectedRegion;

        addToCart(product, quantity, Object.keys(variants).length > 0 ? variants : null);
    };

    return (
        <div className="flex flex-col">
            {/* Header: Title, Reviews, Share */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="bg-red-50 text-brand-red text-xs font-bold px-2.5 py-1 rounded-md inline-block mb-3">
                        In Stock
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>

                    {/* Reviews */}
                    <div className="flex items-center gap-2 mb-6 cursor-pointer group">
                        <div className="flex text-yellow-400 text-sm">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm group-hover:text-brand-red transition-colors">
                            (12 Reviews)
                        </span>
                    </div>
                </div>

                <button className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-full transition-colors">
                    <FiShare2 size={20} />
                </button>
            </div>

            {/* Price section */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        {product.price}
                    </span>
                    {product.oldPrice && (
                        <span className="text-lg text-gray-400 line-through font-medium">
                            {product.oldPrice}
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Price includes VAT</p>
            </div>

            {/* Variants */}
            <div className="space-y-6 mb-8">
                {/* Storage / Size */}
                {product.variants?.storage && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Size/Capacity:</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.storage.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedStorage(size)}
                                    className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${selectedStorage === size
                                        ? 'border-brand-red bg-brand-red text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-brand-red'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Colors */}
                {product.variants?.colors && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Color:</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.variants.colors.map(color => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color)}
                                    className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${selectedColor?.name === color.name
                                        ? 'border-brand-red bg-red-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <span className="w-4 h-4 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: color.hex }}></span>
                                    <span className="text-sm font-medium text-gray-700">{color.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Region / Installation Mode */}
                {product.variants?.regions && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Model/Type:</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.regions.map(region => (
                                <button
                                    key={region}
                                    onClick={() => setSelectedRegion(region)}
                                    className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${selectedRegion === region
                                        ? 'border-brand-red text-brand-red bg-red-50/30'
                                        : 'border-gray-200 text-gray-600 hover:border-brand-red'
                                        }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Delivery Est */}
            <div className="mb-8">
                <p className="text-sm text-gray-600 font-medium">Estimated delivery: <span className="text-gray-900 font-bold underline cursor-pointer">0-3 days</span></p>
            </div>

            {/* Add to Cart / Buy Now */}
            <div className="flex flex-row items-stretch gap-2 mt-4">
                {/* Quantity */}
                <div className="flex items-center justify-between border-2 border-gray-200 rounded-lg py-1 px-1 w-[100px] shrink-0 bg-white">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="cursor-pointer w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <FiMinus size={14} />
                    </button>
                    <span className="font-bold text-gray-900 w-6 text-center text-sm">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="cursor-pointer w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <FiPlus size={14} />
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="cursor-pointer flex-1 bg-white border-2 border-gray-900 text-gray-900 font-bold py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-sm whitespace-nowrap"
                >
                    Add to Cart
                </button>

                <button
                    onClick={handleAddToCart}
                    className="cursor-pointer flex-[1.5] bg-brand-red text-white font-bold py-3 px-2 rounded-lg hover:bg-[#ff1a2b] shadow-lg shadow-brand-red/30 transition-all text-sm whitespace-nowrap"
                >
                    Buy Now
                </button>
            </div>

        </div>
    );
}
