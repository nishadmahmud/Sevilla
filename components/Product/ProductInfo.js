"use client";

import { useMemo, useState, useEffect } from 'react';
import { FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

export default function ProductInfo({ product, onVariantImageChange }) {
    const { addToCart } = useCart();

    const variantItems = Array.isArray(product.variantsMatrix) ? product.variantsMatrix : [];

    const defaultVariant = useMemo(
        () =>
            variantItems.find((v) => v.inStock) ||
            variantItems[0] ||
            null,
        [variantItems]
    );

    const [quantity, setQuantity] = useState(1);
    const [selectedStorage, setSelectedStorage] = useState(
        defaultVariant?.storage || product.variants?.storage?.[0] || null
    );
    const [selectedColorName, setSelectedColorName] = useState(
        defaultVariant?.color || product.variants?.colors?.[0]?.name || null
    );
    const [selectedRegion, setSelectedRegion] = useState(
        defaultVariant?.region || product.variants?.regions?.[0] || null
    );

    useEffect(() => {
        setQuantity(1);
        setSelectedStorage(defaultVariant?.storage || product.variants?.storage?.[0] || null);
        setSelectedColorName(defaultVariant?.color || product.variants?.colors?.[0]?.name || null);
        setSelectedRegion(defaultVariant?.region || product.variants?.regions?.[0] || null);
    }, [product.id, defaultVariant, product.variants]);

    const formatMoney = (n) => `৳ ${Number(n || 0).toLocaleString('en-IN')}`;

    const findMatchingVariant = (storage, colorName, region) => {
        const withStock = variantItems.find((v) =>
            (!storage || v.storage === storage) &&
            (!colorName || v.color === colorName) &&
            (!region || v.region === region) &&
            v.inStock
        );
        if (withStock) return withStock;
        return variantItems.find((v) =>
            (!storage || v.storage === storage) &&
            (!colorName || v.color === colorName) &&
            (!region || v.region === region)
        ) || null;
    };

    const currentVariant = useMemo(
        () => findMatchingVariant(selectedStorage, selectedColorName, selectedRegion),
        [selectedStorage, selectedColorName, selectedRegion, variantItems]
    );

    useEffect(() => {
        if (onVariantImageChange && currentVariant?.image) {
            onVariantImageChange(currentVariant.image);
        }
    }, [currentVariant, onVariantImageChange]);

    const priceNumber =
        currentVariant?.priceNumber != null
            ? currentVariant.priceNumber
            : parseInt(String(product.price || '').replace(/[^\d]/g, ''), 10) || 0;

    const oldPriceNumberRaw =
        currentVariant?.oldPriceNumber != null
            ? currentVariant.oldPriceNumber
            : parseInt(String(product.oldPrice || '').replace(/[^\d]/g, ''), 10) || 0;

    const hasDiscount =
        Number.isFinite(oldPriceNumberRaw) &&
        oldPriceNumberRaw > 0 &&
        oldPriceNumberRaw > priceNumber;

    const discountAmount = hasDiscount ? oldPriceNumberRaw - priceNumber : 0;

    const effectivePrice = formatMoney(priceNumber);
    const effectiveOldPrice = hasDiscount ? formatMoney(oldPriceNumberRaw) : null;

    const isOptionDisabled = (type, value) => {
        if (!value) return false;
        if (!variantItems.length) return false;

        const testStorage = type === 'storage' ? value : selectedStorage;
        const testColor = type === 'color' ? value : selectedColorName;
        const testRegion = type === 'region' ? value : selectedRegion;

        const match = variantItems.find((v) =>
            (!testStorage || v.storage === testStorage) &&
            (!testColor || v.color === testColor) &&
            (!testRegion || v.region === testRegion) &&
            v.inStock
        );
        return !match;
    };

    const handleAddToCart = () => {
        const variants = {};
        if (selectedStorage) variants.storage = selectedStorage;
        if (selectedColorName) variants.color = selectedColorName;
        if (selectedRegion) variants.region = selectedRegion;

        const productForCart = {
            ...product,
            price: effectivePrice,
            numericPrice: priceNumber,
            oldPrice: effectiveOldPrice,
        };

        addToCart(productForCart, quantity, Object.keys(variants).length > 0 ? variants : null);
    };

    return (
        <div className="flex flex-col">
            {/* Header: Title, Share */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="bg-red-50 text-brand-red text-xs font-bold px-2.5 py-1 rounded-md inline-block mb-3">
                        {currentVariant?.inStock === false ? 'Out of Stock' : 'In Stock'}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                </div>

                <button className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-full transition-colors">
                    <FiShare2 size={20} />
                </button>
            </div>

            {/* Price section */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        {effectivePrice}
                    </span>
                    {hasDiscount && effectiveOldPrice && (
                        <span className="text-lg text-gray-400 line-through font-medium">
                            {effectiveOldPrice}
                        </span>
                    )}
                </div>
                {hasDiscount && discountAmount > 0 && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                        You save {formatMoney(discountAmount)}
                    </p>
                )}
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
                                    onClick={() => !isOptionDisabled('storage', size) && setSelectedStorage(size)}
                                    disabled={isOptionDisabled('storage', size)}
                                    className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${selectedStorage === size
                                            ? 'border-brand-red bg-brand-red text-white'
                                            : 'border-gray-200 text-gray-600 hover:border-brand-red'
                                        } ${isOptionDisabled('storage', size) ? 'opacity-40 cursor-not-allowed' : ''}`}
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
                                    onClick={() => !isOptionDisabled('color', color.name) && setSelectedColorName(color.name)}
                                    disabled={isOptionDisabled('color', color.name)}
                                    className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${selectedColorName === color.name
                                            ? 'border-brand-red bg-red-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        } ${isOptionDisabled('color', color.name) ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                    <span
                                        className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                                        style={{ backgroundColor: color.hex }}
                                    ></span>
                                    <span className="text-sm font-medium text-gray-700">
                                        {color.name}
                                    </span>
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
                                    onClick={() => !isOptionDisabled('region', region) && setSelectedRegion(region)}
                                    disabled={isOptionDisabled('region', region)}
                                    className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${selectedRegion === region
                                            ? 'border-brand-red text-brand-red bg-red-50/30'
                                            : 'border-gray-200 text-gray-600 hover:border-brand-red'
                                        } ${isOptionDisabled('region', region) ? 'opacity-40 cursor-not-allowed' : ''}`}
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
