"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { FiHome, FiChevronRight, FiSliders, FiX, FiGrid, FiList, FiSearch, FiPackage, FiChevronLeft } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

/* ──────────────────────────────────────────────────────────── */
/*  Pagination Component                                         */
/* ──────────────────────────────────────────────────────────── */
function Pagination({ currentPage, lastPage, total, perPage }) {
    const router = useRouter();
    const pathname = usePathname();

    if (lastPage <= 1) return null;

    const goTo = (page) => {
        if (page < 1 || page > lastPage) return;
        router.push(`${pathname}?page=${page}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Build windowed page numbers: always show first, last, current ±2, with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const delta = 2;
        const range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(lastPage - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) range.unshift('...');
        if (currentPage + delta < lastPage - 1) range.push('...');
        pages.push(1);
        pages.push(...range);
        if (lastPage > 1) pages.push(lastPage);
        return pages;
    };

    const pages = getPageNumbers();
    const from = ((currentPage - 1) * perPage) + 1;
    const to = Math.min(currentPage * perPage, total);

    return (
        <div className="mt-10 flex flex-col items-center gap-3">
            {/* Info text */}
            <p className="text-xs text-gray-400">
                Showing <span className="font-semibold text-gray-600">{from}–{to}</span> of <span className="font-semibold text-gray-600">{total}</span> products
            </p>

            {/* Page buttons */}
            <div className="flex items-center gap-1.5">
                {/* Prev */}
                <button
                    onClick={() => goTo(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-brand-red hover:text-brand-red disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                >
                    <FiChevronLeft size={16} />
                </button>

                {pages.map((page, idx) =>
                    page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none">
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => goTo(page)}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${page === currentPage
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-105'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    onClick={() => goTo(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-brand-red hover:text-brand-red disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                >
                    <FiChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────────────────── */
/*  Mini ProductCard (category-page specific)                    */
/* ──────────────────────────────────────────────────────────── */
function CategoryProductCard({ product, view }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        const numericPrice = parseFloat(String(product.price || '').replace(/[^\d.]/g, '')) || 0;
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            numericPrice,
            imageUrl: product.imageUrl,
        });
    };

    const productSlug = `${product.name?.toLowerCase().replace(/\s+/g, '-')}-${product.id}`;

    if (view === 'list') {
        return (
            <Link
                href={`/product/${productSlug}`}
                className="flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-brand-red/30 hover:shadow-lg transition-all duration-300 group"
            >
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative rounded-xl overflow-hidden bg-gray-50">
                    {product.imageUrl ? (
                        <Image src={product.imageUrl} alt={product.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <FiPackage size={32} />
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                        {product.brand && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red/70 mb-1 block">{product.brand}</span>
                        )}
                        <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug line-clamp-2">{product.name}</h3>
                        <span className={`inline-flex mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                            {product.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-lg md:text-xl font-extrabold text-gray-900">{product.price}</span>
                        {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>}
                        {product.discount && <span className="text-xs font-bold bg-brand-red text-white px-2 py-0.5 rounded-full">{product.discount}</span>}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/product/${productSlug}`}
            className="bg-white border border-gray-100 rounded-2xl pb-4 flex flex-col hover:border-brand-red/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group overflow-hidden relative"
        >
            {product.discount && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-brand-red text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wide">
                        {product.discount}
                    </span>
                </div>
            )}
            {product.stock === 0 && (
                <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-2xl">
                    <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">Out of Stock</span>
                </div>
            )}
            <div className="w-full aspect-square relative bg-gray-50 rounded-t-2xl overflow-hidden">
                {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <FiPackage size={48} />
                    </div>
                )}
            </div>
            <div className="flex flex-col px-3 pt-3 flex-1">
                {product.brand && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">{product.brand}</span>
                )}
                <h3 className="text-gray-900 font-bold text-[12px] md:text-[13px] leading-snug line-clamp-2 flex-1">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-900 font-extrabold text-[14px] md:text-[16px]">{product.price}</span>
                    {product.oldPrice && <span className="text-gray-400 text-[10px] line-through">{product.oldPrice}</span>}
                </div>
            </div>
        </Link>
    );
}

/* ──────────────────────────────────────────────────────────── */
/*  Main Client Page                                             */
/* ──────────────────────────────────────────────────────────── */
export default function CategoryPageClient({ initialProducts, categoryName, brandFilters, priceRange, pagination, categoryId }) {
    const [view, setView] = useState('grid'); // 'grid' | 'list'
    const [sortBy, setSortBy] = useState('default');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [maxPrice, setMaxPrice] = useState(priceRange.max || 0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [showInStockOnly, setShowInStockOnly] = useState(false);

    const brandList = Object.entries(brandFilters); // [[id, name], ...]

    // Parse price from "৳ X,XX,XXX" → number
    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
    };

    const filteredProducts = useMemo(() => {
        let out = [...initialProducts];

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            out = out.filter(p => p.name.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
        }

        // Brand filter
        if (selectedBrands.length > 0) {
            out = out.filter(p => selectedBrands.includes(p.brand));
        }

        // In stock filter
        if (showInStockOnly) {
            out = out.filter(p => p.stock > 0);
        }

        // Price filter
        if (maxPrice > 0 && maxPrice < priceRange.max) {
            out = out.filter(p => parsePrice(p.price) <= maxPrice);
        }

        // Sort
        if (sortBy === 'price_asc') out.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        else if (sortBy === 'price_desc') out.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        else if (sortBy === 'name_asc') out.sort((a, b) => a.name.localeCompare(b.name));

        return out;
    }, [initialProducts, searchQuery, selectedBrands, showInStockOnly, maxPrice, sortBy, priceRange.max]);

    const toggleBrand = (brandName) => {
        setSelectedBrands(prev =>
            prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setMaxPrice(priceRange.max || 0);
        setShowInStockOnly(false);
        setSearchQuery('');
        setSortBy('default');
    };

    const hasActiveFilters = selectedBrands.length > 0 || showInStockOnly || sortBy !== 'default' || searchQuery.trim() || (maxPrice > 0 && maxPrice < priceRange.max);

    /* ── Sidebar ── */
    const FilterPanel = () => (
        <div className="flex flex-col gap-6">
            {/* Search within category */}
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Search</label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 gap-2 focus-within:border-brand-red transition-colors">
                    <FiSearch size={14} className="text-gray-400 flex-shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search products…"
                        className="flex-1 bg-transparent border-none outline-none text-xs text-gray-700"
                    />
                </div>
            </div>

            {/* Availability */}
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Availability</label>
                <button
                    onClick={() => setShowInStockOnly(v => !v)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${showInStockOnly ? 'text-brand-red' : 'text-gray-700'}`}
                >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${showInStockOnly ? 'bg-brand-red border-brand-red' : 'border-gray-300'}`}>
                        {showInStockOnly && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    In Stock Only
                </button>
            </div>

            {/* Brands */}
            {brandList.length > 0 && (
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Brands</label>
                    <div className="flex flex-col gap-2">
                        {brandList.map(([id, name]) => (
                            <button
                                key={id}
                                onClick={() => toggleBrand(name)}
                                className={`flex items-center gap-2.5 text-sm font-medium transition-colors ${selectedBrands.includes(name) ? 'text-brand-red' : 'text-gray-700'}`}
                            >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selectedBrands.includes(name) ? 'bg-brand-red border-brand-red' : 'border-gray-300'}`}>
                                    {selectedBrands.includes(name) && <span className="text-white text-[10px]">✓</span>}
                                </div>
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Price Range */}
            {priceRange.max > 0 && (
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Max Price</label>
                    <input
                        type="range"
                        min={priceRange.min || 0}
                        max={priceRange.max}
                        value={maxPrice || priceRange.max}
                        onChange={e => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-brand-red"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>৳{(priceRange.min || 0).toLocaleString('en-IN')}</span>
                        <span className="font-bold text-gray-700">৳{(maxPrice || priceRange.max).toLocaleString('en-IN')}</span>
                    </div>
                </div>
            )}

            {/* Clear Filters */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-brand-red font-semibold hover:text-red-700 transition-colors"
                >
                    <FiX size={14} /> Clear all filters
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-3 md:px-6 py-6 md:py-10">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
                    <Link href="/" className="flex items-center gap-1 hover:text-brand-red transition-colors">
                        <FiHome size={12} /> Home
                    </Link>
                    <FiChevronRight size={12} />
                    <span className="text-brand-red font-semibold capitalize">{categoryName}</span>
                </nav>

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-5 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight capitalize">{categoryName}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {filteredProducts.length} <span className="font-semibold text-gray-700">products</span> found
                            {hasActiveFilters && <span className="text-brand-red ml-2 font-medium">(filtered)</span>}
                        </p>
                    </div>

                    {/* Sort + View Toggle */}
                    <div className="flex items-center gap-2">
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 outline-none focus:border-brand-red transition-colors cursor-pointer"
                        >
                            <option value="default">Featured</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="name_asc">Name A–Z</option>
                        </select>
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1">
                            <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}>
                                <FiGrid size={16} />
                            </button>
                            <button onClick={() => setView('list')} className={`p-1.5 rounded-lg transition-colors ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}>
                                <FiList size={16} />
                            </button>
                        </div>
                        {/* Mobile filter button */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:border-brand-red transition-colors"
                        >
                            <FiSliders size={14} />
                            Filters
                            {hasActiveFilters && <span className="bg-brand-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{selectedBrands.length + (showInStockOnly ? 1 : 0)}</span>}
                        </button>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-gray-900 flex items-center gap-2"><FiSliders size={16} /> Filters</h2>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="text-[11px] text-brand-red font-semibold hover:underline">Clear all</button>
                                )}
                            </div>
                            <FilterPanel />
                        </div>
                    </aside>

                    {/* Product area */}
                    <main className="flex-1 min-w-0">
                        {filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
                                <FiPackage size={48} className="text-gray-200 mb-4" />
                                <p className="text-gray-500 font-semibold text-lg">No products found</p>
                                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="mt-4 text-brand-red text-sm font-semibold hover:underline">Clear filters</button>
                                )}
                            </div>
                        ) : view === 'grid' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                                {filteredProducts.map(p => (
                                    <CategoryProductCard key={p.id} product={p} view="grid" />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {filteredProducts.map(p => (
                                    <CategoryProductCard key={p.id} product={p} view="list" />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!hasActiveFilters && (
                            <Pagination
                                currentPage={pagination.current_page || 1}
                                lastPage={pagination.last_page || 1}
                                total={pagination.total || 0}
                                perPage={pagination.per_page || 20}
                            />
                        )}
                        {hasActiveFilters && filteredProducts.length > 0 && (
                            <p className="text-center text-xs text-gray-400 mt-8">
                                Showing {filteredProducts.length} filtered results from this page
                            </p>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFilterOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-[60] lg:hidden" onClick={() => setIsMobileFilterOpen(false)} />
                    <div className="fixed inset-y-0 right-0 w-[300px] bg-white z-[70] flex flex-col shadow-2xl lg:hidden">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900 flex items-center gap-2"><FiSliders size={16} /> Filters</h2>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5">
                            <FilterPanel />
                        </div>
                        <div className="p-4 border-t border-gray-100">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full bg-brand-red text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors"
                            >
                                Show {filteredProducts.length} Products
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
