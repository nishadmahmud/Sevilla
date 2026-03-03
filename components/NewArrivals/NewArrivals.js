"use client";

import ProductCard from '../Shared/ProductCard';

export default function NewArrivals({ products = [] }) {
    const fallbackProducts = [
        { id: 1, name: "sevilla Smart Island Chimney", price: "৳ 35,000", oldPrice: "৳ 42,000", discount: "৳ 7,000", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600" },
        { id: 2, name: "Eco Power Induction Cooktop", price: "৳ 2,750", oldPrice: "৳ 3,100", discount: "৳ 350", imageUrl: "https://images.unsplash.com/photo-1590794055276-802cbb3e8c9b?q=80&w=600" },
        { id: 3, name: "Premium Built-in Oven 60L", price: "৳ 28,500", oldPrice: "৳ 32,500", discount: "৳ 4,000", imageUrl: "https://images.unsplash.com/photo-1584288081692-74baeaed5b6c?q=80&w=600" },
        { id: 4, name: "sevilla Auto Ignition 4-Burner", price: "৳ 6,000", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600" },
        { id: 5, name: "Compact Dishwasher Pro", price: "৳ 25,000", oldPrice: "৳ 30,000", discount: "৳ 5,000", imageUrl: "https://images.unsplash.com/photo-1585863959955-e427d1a580a6?q=80&w=600" }
    ];

    const displayProducts = products?.length ? products : fallbackProducts;

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        New <span className="text-brand-red">Arrivals</span>
                    </h2>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
