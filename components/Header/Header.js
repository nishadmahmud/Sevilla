"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiPhone, FiMapPin, FiMenu, FiX, FiMic, FiChevronRight, FiGrid } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { searchProducts } from '../../lib/api';

export default function Header({ categories = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [activeSearchCategory, setActiveSearchCategory] = useState('all');
  const { cartCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const defaultCategories = [
    { name: "Kitchen Chimneys", slug: "chimneys" },
    { name: "Induction Cookers", slug: "induction" },
    { name: "Gas Stoves", slug: "stoves" },
    { name: "Built-in Ovens", slug: "ovens" },
    { name: "Accessories", slug: "accessories" }
  ];

  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories;

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  // Close sidebar on navigation (using simple onClick for links)
  const closeSidebar = () => setIsSidebarOpen(false);

  const runSearch = async (q) => {
    if (!q) {
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    // If user keeps typing, avoid stacking multiple concurrent searches
    setIsSearchOpen(true);
    setIsSearching(true);
    setSearchError('');

    try {
      const res = await searchProducts(q);
      const payload = res?.data || res;
      const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

      const mapped = items.map((p) => {
        const basePrice = Number(p.retails_price || p.discounted_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = String(p.discount_type || '').toLowerCase();
        const hasDiscount = discountValue > 0 && discountType !== '0';

        const price = hasDiscount
          ? discountType === 'percentage'
            ? Math.max(0, Math.round(basePrice * (1 - discountValue / 100)))
            : Math.max(0, basePrice - discountValue)
          : basePrice;

        const discountLabel = hasDiscount
          ? discountType === 'percentage'
            ? `-${discountValue}%`
            : `৳ ${discountValue.toLocaleString('en-IN')}`
          : null;

        const imageUrl =
          p.image_path ||
          p.image_path1 ||
          p.image_path2 ||
          (Array.isArray(p.image_paths) && p.image_paths[0]) ||
          '/no-image.svg';

        return {
          id: p.id,
          name: p.name,
          price: `৳ ${price.toLocaleString('en-IN')}`,
          oldPrice: hasDiscount ? `৳ ${basePrice.toLocaleString('en-IN')}` : null,
          discount: discountLabel,
          imageUrl,
          brand: p.brands?.name || '',
          categoryName: p.category?.name || 'Others',
        };
      });

      setSearchResults(mapped);

      const categorySet = new Set(mapped.map((m) => m.categoryName));
      const cats = Array.from(categorySet).sort();
      setSearchCategories(cats);
      setActiveSearchCategory('all');
    } catch (err) {
      console.error('Search failed', err);
      setSearchError('Something went wrong while searching. Please try again.');
      setSearchResults([]);
      setSearchCategories([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    runSearch(q);
  };

  // Debounce search when user stops typing
  useEffect(() => {
    const q = searchQuery.trim();

    if (!q) {
      // Clear & close when input is emptied
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    const timeout = setTimeout(() => {
      runSearch(q);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  const filteredSearchResults = useMemo(() => {
    if (activeSearchCategory === 'all') return searchResults;
    return searchResults.filter((p) => p.categoryName === activeSearchCategory);
  }, [searchResults, activeSearchCategory]);

  return (
    <>
      <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
        {/* Top Bar - Hidden on mobile */}
        <div className="bg-gray-900 text-gray-300 text-xs py-2 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2"><FiPhone className="text-brand-red" /> +880 1805-738326</span>
              <span className="opacity-30">|</span>
              <span className="flex items-center gap-2"><FiMapPin className="text-brand-red" /> BA - 64/3 South Badda, Dhaka - 1212</span>
            </div>
            <div className="flex gap-4 font-medium">
              <Link href="/track-order" className="text-brand-red font-bold hover:text-red-300 transition-colors">Track Order</Link>
              <Link href="/warranty" className="hover:text-white transition-colors">Warranty &amp; Service</Link>
              <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-brand-red py-2 md:py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6 gap-2 md:gap-4">

            {/* Logo */}
            <Link href="/" className="flex flex-row items-center shrink-0 border border-white bg-white h-8 md:h-10">
              <span className="text-lg md:text-2xl text-black px-2 flex items-center h-full" style={{ fontFamily: 'Georgia, serif' }}>
                sevilla
              </span>
              <span className="text-lg md:text-2xl text-white bg-brand-red px-2 flex items-center h-full font-bold">
                +
              </span>
            </Link>

            {/* Global Search Bar (Mobile & Desktop) */}
            <form
              onSubmit={handleSearchSubmit}
              className="grow flex items-center bg-gray-50 md:bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm focus-within:ring-2 focus-within:ring-white/50 transition-all mx-1 md:mx-4"
            >
              <button
                type="submit"
                className="text-gray-400 hover:text-brand-red transition-colors mr-2 md:mr-3 shrink-0"
                aria-label="Search"
              >
                <FiSearch size={16} />
              </button>
              <input
                type="text"
                placeholder="Search gadget"
                className="grow bg-transparent border-none outline-none text-[13px] md:text-sm text-gray-800 min-w-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="text-gray-400 hover:text-brand-red transition-colors flex items-center justify-center p-1 shrink-0 border-l border-gray-200 ml-2 pl-2 md:border-none md:ml-0 md:pl-0"
              >
                <FiMic size={16} />
              </button>
            </form>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex gap-8 font-semibold text-white/90">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-white transition-colors">Shop Appliances</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>

            {/* Desktop Action Icons */}
            <div className="hidden md:flex gap-4 items-center">
              <button onClick={handleUserClick} className="text-white hover:text-white/80 transition-colors p-1 shrink-0" aria-label="Account">
                {user?.image ? (
                  <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white/50">
                    <Image src={user.image} alt="Profile" width={28} height={28} className="w-full h-full object-cover" unoptimized />
                  </div>
                ) : user ? (
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white ring-2 ring-white/50">
                    {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <FiUser size={22} />
                )}
              </button>
              <button onClick={openCart} className="text-white hover:text-white/80 transition-colors relative p-1 shrink-0" aria-label="Cart">
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-brand-red text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-white hover:text-white/80 transition-colors p-1.5 shrink-0"
              aria-label="Menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>

        {/* Desktop Category Strip */}
        <div className="hidden md:block bg-white py-3 text-sm border-b border-gray-100 shadow-sm relative z-40">
          <div className="max-w-7xl mx-auto flex gap-6 px-6 overflow-x-auto whitespace-nowrap items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span className="font-bold text-gray-500 text-sm">Categories:</span>
            {displayCategories.slice(0, 7).map((cat, idx) => (
              <Link
                key={idx}
                href={`/category/${cat.category_id || cat.id || cat.slug || cat.name.toLowerCase().replace(/ /g, '-')}`}
                className="text-gray-700 font-medium hover:text-brand-red transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/offer" className="text-brand-red font-bold hover:opacity-80 transition-opacity ml-auto">Special Offers</Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-white z-70 transform transition-transform duration-300 ease-in-out flex flex-col md:hidden shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Sidebar Header */}
        <div className="bg-brand-red p-4 flex justify-between items-center text-white">
          <div className="flex flex-row items-center shrink-0 border border-white bg-white h-8">
            <span className="text-lg text-black px-2 flex items-center h-full" style={{ fontFamily: 'Georgia, serif' }}>
              sevilla
            </span>
            <span className="text-lg text-white bg-brand-red px-2 flex items-center h-full font-bold">
              +
            </span>
          </div>
          <button onClick={closeSidebar} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Quick Actions */}
        <div className="flex border-b border-gray-100">
          <button onClick={() => { closeSidebar(); handleUserClick(); }} className="flex-1 py-4 flex flex-col items-center justify-center gap-2 border-r border-gray-100 text-gray-600 hover:text-brand-red hover:bg-red-50/50 transition-colors">
            {user?.image ? (
              <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-brand-red/40">
                <Image src={user.image} alt="Profile" width={28} height={28} className="w-full h-full object-cover" unoptimized />
              </div>
            ) : user ? (
              <div className="w-7 h-7 rounded-full bg-brand-red/10 flex items-center justify-center text-xs font-bold text-brand-red ring-2 ring-brand-red/30">
                {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
              </div>
            ) : (
              <FiUser size={20} />
            )}
            <span className="text-xs font-bold">{user ? 'Profile' : 'Login'}</span>
          </button>
          <button onClick={() => { closeSidebar(); openCart(); }} className="flex-1 py-4 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-brand-red hover:bg-red-50/50 transition-colors relative border-none">
            <div className="relative">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </div>
            <span className="text-xs font-bold">Cart</span>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-4 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">Main Menu</div>
          <Link href="/" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Home</span><FiChevronRight size={16} className="text-gray-400" />
          </Link>
          <Link href="/shop" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Shop Appliances</span><FiChevronRight size={16} className="text-gray-400" />
          </Link>
          <Link href="/offer" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Special Offers</span><FiChevronRight size={16} className="text-gray-400" />
          </Link>
          <Link href="/about" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>About</span><FiChevronRight size={16} className="text-gray-400" />
          </Link>
          <Link href="/contact" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Contact</span><FiChevronRight size={16} className="text-gray-400" />
          </Link>
          <Link href="/track-order" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 font-semibold border-b border-gray-50 text-brand-red bg-red-50/50 hover:bg-red-50">
            <span>Track Order</span><FiChevronRight size={16} className="text-brand-red" />
          </Link>

          <div className="px-4 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2 flex items-center gap-2">
            <FiGrid /> Categories
          </div>
          {displayCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.category_id || cat.id || cat.slug || cat.name.toLowerCase().replace(/ /g, '-')}`}
              onClick={closeSidebar}
              className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30"
            >
              <span>{cat.name}</span><FiChevronRight size={14} className="text-gray-400" />
            </Link>
          ))}
        </div>

      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-80"
            onClick={closeSearchModal}
          />
          <div className="fixed inset-x-0 top-[72px] md:top-[90px] z-90 flex justify-center px-3 md:px-6">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
              {/* Left: Categories */}
              <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/80 p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Categories
                  </h3>
                  <button
                    type="button"
                    onClick={closeSearchModal}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    aria-label="Close search"
                  >
                    <FiX size={16} />
                  </button>
                </div>
                <div className="flex md:flex-col gap-2 text-sm overflow-x-auto md:overflow-visible">
                  <button
                    type="button"
                    onClick={() => setActiveSearchCategory('all')}
                    className={`px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-colors ${activeSearchCategory === 'all'
                        ? 'bg-brand-red text-white border-brand-red'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-red hover:text-brand-red'
                      }`}
                  >
                    All
                  </button>
                  {searchCategories.map((name) => (
                    <button
                      type="button"
                      key={name}
                      onClick={() => setActiveSearchCategory(name)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-colors ${activeSearchCategory === name
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-brand-red hover:text-brand-red'
                        }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </aside>

              {/* Right: Results */}
              <main className="flex-1 p-4 md:p-6 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4 gap-3">
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-gray-900">
                      Products
                    </h3>
                    <p className="text-[11px] md:text-xs text-gray-400">
                      Showing {filteredSearchResults.length} result
                      {filteredSearchResults.length === 1 ? '' : 's'} for{' '}
                      <span className="font-semibold text-gray-700">
                        “{searchQuery}”
                      </span>
                      {activeSearchCategory !== 'all' && (
                        <>
                          {' '}
                          in{' '}
                          <span className="font-semibold text-gray-700">
                            {activeSearchCategory}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {isSearching && (
                  <p className="text-sm text-gray-500">Searching…</p>
                )}
                {searchError && !isSearching && (
                  <p className="text-sm text-red-500 mb-3">{searchError}</p>
                )}
                {!isSearching && !searchError && filteredSearchResults.length === 0 && (
                  <p className="text-sm text-gray-500">No products found.</p>
                )}

                {!isSearching && filteredSearchResults.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {filteredSearchResults.map((product) => (
                      <div key={product.id} className="border border-gray-100 rounded-xl bg-white">
                        {/* Reuse ProductCard layout via link */}
                        <Link
                          href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}
                          className="block"
                          onClick={closeSearchModal}
                        >
                          <div className="w-full aspect-square relative bg-gray-50 rounded-t-xl overflow-hidden">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div className="px-3 py-2">
                            <p className="text-[11px] text-gray-400 truncate">
                              {product.categoryName}
                            </p>
                            <h4 className="text-[12px] font-semibold text-gray-900 line-clamp-2">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[13px] font-extrabold text-gray-900">
                                {product.price}
                              </span>
                              {product.oldPrice && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  {product.oldPrice}
                                </span>
                              )}
                              {product.discount && (
                                <span className="text-[10px] font-bold text-brand-red">
                                  {product.discount}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
}
