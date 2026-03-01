"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FiFilter } from 'react-icons/fi';
import CategorySidebar from '../../../components/Category/CategorySidebar';
import ProductGrid from '../../../components/Category/ProductGrid';

export default function CategoryPage() {
    const params = useParams();
    const categoryName = decodeURIComponent(params.slug || 'Category');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Mock Products Data (replace with API call later)
    const products = [
        { id: 1, name: "sevilla Smart Island Chimney", price: "৳ 35,000", oldPrice: "৳ 42,000", discount: "৳ 7,000", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600" },
        { id: 2, name: "Eco Power Induction Cooktop", price: "৳ 2,750", oldPrice: "৳ 3,100", discount: "৳ 350", imageUrl: "https://images.unsplash.com/photo-1590794055276-802cbb3e8c9b?q=80&w=600" },
        { id: 3, name: "Premium Built-in Oven 60L", price: "৳ 28,500", oldPrice: "৳ 32,500", discount: "৳ 4,000", imageUrl: "https://images.unsplash.com/photo-1584288081692-74baeaed5b6c?q=80&w=600" },
        { id: 4, name: "sevilla Auto Ignition 4-Burner", price: "৳ 6,000", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600" },
        { id: 5, name: "Compact Dishwasher Pro", price: "৳ 25,000", oldPrice: "৳ 30,000", discount: "৳ 5,000", imageUrl: "https://images.unsplash.com/photo-1585863959955-e427d1a580a6?q=80&w=600" },
        { id: 6, name: "Advanced RO Water Purifier", price: "৳ 12,200", oldPrice: "৳ 14,800", discount: "৳ 2,600", imageUrl: "https://images.unsplash.com/photo-1585863959955-e427d1a580a6?q=80&w=600" },
        { id: 7, name: "sevilla Coffee Maker", price: "৳ 4,200", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600" },
        { id: 8, name: "Stainless Steel Microwave", price: "৳ 13,500", oldPrice: "৳ 15,500", discount: "৳ 2,000", imageUrl: "https://images.unsplash.com/photo-1584288081692-74baeaed5b6c?q=80&w=600" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Page Header */}
                <div className="mb-3 md:mb-8 pb-3 md:pb-6 border-b border-gray-200">
                    <div className="text-[11px] md:text-sm text-gray-400 mb-1 flex items-center gap-2">
                        <span>Home</span> / <span>Categories</span> / <span className="text-brand-red font-semibold capitalize">{categoryName}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                        <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 capitalize tracking-tight">
                            {categoryName}
                        </h1>
                        <p className="text-gray-500 text-[12px] md:text-sm font-medium">
                            Showing <span className="font-bold text-gray-900">{products.length}</span> products
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 pt-2 lg:pt-0">

                    {/* Sidebar (Filters) - Left Side on Desktop */}
                    <aside className="lg:w-1/4 order-1">
                        <CategorySidebar
                            isOpen={isMobileFilterOpen}
                            onClose={() => setIsMobileFilterOpen(false)}
                        />
                    </aside>

                    {/* Main Content (Product Grid) - Right Side on Desktop */}
                    <main className="lg:w-3/4 order-2">
                        {products.length > 0 ? (
                            <ProductGrid products={products} onOpenFilter={() => setIsMobileFilterOpen(true)} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
                                <p className="text-gray-400 font-medium">No products found in this category.</p>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
}
