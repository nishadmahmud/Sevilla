"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiGrid, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function ShopCategories({ categories = [], flashSaleProducts = [] }) {
    const [timeLeft, setTimeLeft] = useState(23 * 86400 + 4 * 3600 + 4 * 60 + 59);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 0 ? 30 * 86400 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const days = String(Math.floor(timeLeft / 86400)).padStart(2, '0');
    const hours = String(Math.floor((timeLeft % 86400) / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    const displayCategories = (Array.isArray(categories) ? categories : []).map((cat) => ({
        name: cat.name,
        icon: <FiGrid />,
        image: cat.image_url || '',
        slug: cat.category_id || cat.id || cat.name?.toLowerCase().replace(/ /g, '-'),
    }));

    const displayFlashSaleProducts = Array.isArray(flashSaleProducts) ? flashSaleProducts : [];
    const flashRowRef = useRef(null);

    const scrollFlashRow = (direction) => {
        const el = flashRowRef.current;
        if (!el) return;
        const amount = Math.max(240, Math.floor(el.clientWidth * 0.9));
        el.scrollBy({ left: direction * amount, behavior: 'smooth' });
    };

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Featured <span className="text-brand-red">Categories</span>
                    </h2>
                </div>

                {displayCategories.length > 0 ? (
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-y-8 md:gap-y-12 gap-x-2 mb-16 md:mb-24">
                        {displayCategories.map((cat, index) => (
                            <Link
                                href={`/category/${cat.slug || cat.category_id || cat.id || cat.name.toLowerCase().replace(/ /g, '-')}`}
                                key={cat.slug || index}
                                className="flex flex-col items-center justify-start gap-3 md:gap-4 text-center group"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 relative flex items-center justify-center text-3xl md:text-4xl text-gray-700 group-hover:scale-110 transition-transform duration-300">
                                    {cat.image ? (
                                        <Image src={cat.image} alt={cat.name} fill unoptimized className="object-contain" />
                                    ) : (
                                        cat.icon
                                    )}
                                </div>
                                <span className="text-[10px] md:text-xs font-medium text-gray-700 leading-tight group-hover:text-brand-red transition-colors">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="mb-16 md:mb-24 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
                        Categories are not available right now.
                    </div>
                )}

                <div className="bg-brand-red rounded-2xl p-4 md:p-8 relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4">
                        <div className="flex items-center gap-2 md:gap-3">
                            <h3 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-gray-900 leading-[1.15]">
                                Flash Sale
                            </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-800 tracking-wider">
                                OFFER ENDING IN:
                            </div>
                            <div className="flex gap-2 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-800 mb-1 font-semibold">Days</span>
                                    <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{days}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-800 mb-1 font-semibold">Hour</span>
                                    <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{hours}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-800 mb-1 font-semibold">Min</span>
                                    <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{minutes}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-800 mb-1 font-semibold">Sec</span>
                                    <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{seconds}</span>
                                </div>
                            </div>
                            <button className="bg-white text-gray-800 font-bold text-xs py-2 md:py-3 px-4 md:px-6 rounded-md transition-colors whitespace-nowrap shadow-sm hover:shadow-md hidden md:block">
                                SEE ALL
                            </button>
                        </div>
                    </div>

                    {displayFlashSaleProducts.length > 0 ? (
                        <div className="relative group">
                            <button
                                type="button"
                                onClick={() => scrollFlashRow(-1)}
                                className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white shadow hover:shadow-md rounded-full items-center justify-center z-10 transition-colors text-gray-800 hidden md:inline-flex"
                                aria-label="Scroll flash sale left"
                            >
                                <FiChevronLeft size={20} />
                            </button>

                            <div
                                ref={flashRowRef}
                                className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pr-3 md:pr-6"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                                {displayFlashSaleProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] shrink-0 snap-start"
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => scrollFlashRow(1)}
                                className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white shadow hover:shadow-md rounded-full items-center justify-center z-10 transition-colors text-gray-800 hidden md:inline-flex"
                                aria-label="Scroll flash sale right"
                            >
                                <FiChevronRight size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-gray-900/20 bg-white/60 p-8 text-center text-sm text-gray-800">
                            Flash sale products are not available right now.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
