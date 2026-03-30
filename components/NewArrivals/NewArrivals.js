"use client";

import ProductCard from '../Shared/ProductCard';

export default function NewArrivals({ products = [] }) {
    const displayProducts = Array.isArray(products) ? products : [];

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        New <span className="text-brand-red">Arrivals</span>
                    </h2>
                </div>

                {displayProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
                        {displayProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
                        New arrival products are not available right now.
                    </div>
                )}
            </div>
        </section>
    );
}
