"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiPhone, FiMapPin, FiMenu, FiX, FiMic, FiChevronRight, FiGrid } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  // Close sidebar on navigation (using simple onClick for links)
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
        {/* Top Bar - Hidden on mobile */}
        <div className="bg-gray-900 text-gray-300 text-xs py-2 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2"><FiPhone className="text-brand-red" /> +8801714404100</span>
              <span className="opacity-30">|</span>
              <span className="flex items-center gap-2"><FiMapPin className="text-brand-red" /> Level-4, Block-C, Shop #35A, Jamuna Future Park, Dhaka</span>
            </div>
            <div className="flex gap-4 font-medium">
              <Link href="/track-order" className="text-brand-red font-bold hover:text-red-300 transition-colors">Track Order</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-brand-red py-2 md:py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6 gap-2 md:gap-4">

            {/* Logo */}
            <Link href="/" className="flex flex-row items-center flex-shrink-0 border border-white bg-white h-8 md:h-10">
              <span className="text-lg md:text-2xl text-black px-2 flex items-center h-full" style={{ fontFamily: 'Georgia, serif' }}>
                sevilla
              </span>
              <span className="text-lg md:text-2xl text-white bg-brand-red px-2 flex items-center h-full font-bold">
                +
              </span>
            </Link>

            {/* Global Search Bar (Mobile & Desktop) */}
            <div className="flex-grow flex items-center bg-gray-50 md:bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm focus-within:ring-2 focus-within:ring-white/50 transition-all mx-1 md:mx-4">
              <FiSearch size={16} className="text-gray-400 mr-2 md:mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search gadget"
                className="flex-grow bg-transparent border-none outline-none text-[13px] md:text-sm text-gray-800 min-w-0"
              />
              <button className="text-gray-400 hover:text-brand-red transition-colors flex items-center justify-center p-1 flex-shrink-0 border-l border-gray-200 ml-2 pl-2 md:border-none md:ml-0 md:pl-0">
                <FiMic size={16} />
              </button>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex gap-8 font-semibold text-white/90">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-white transition-colors">Shop Appliances</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>

            {/* Desktop Action Icons */}
            <div className="hidden md:flex gap-4 items-center">
              <button onClick={handleUserClick} className="text-white hover:text-white/80 transition-colors p-1" aria-label="Account">
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
              <button onClick={openCart} className="text-white hover:text-white/80 transition-colors relative p-1" aria-label="Cart">
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
              className="md:hidden text-white hover:text-white/80 transition-colors p-1.5 flex-shrink-0"
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
            <Link href="/category/chimneys" className="text-gray-700 font-medium hover:text-brand-red transition-colors">Kitchen Chimneys</Link>
            <Link href="/category/induction" className="text-gray-700 font-medium hover:text-brand-red transition-colors">Induction Cookers</Link>
            <Link href="/category/stoves" className="text-gray-700 font-medium hover:text-brand-red transition-colors">Gas Stoves</Link>
            <Link href="/category/ovens" className="text-gray-700 font-medium hover:text-brand-red transition-colors">Built-in Ovens</Link>
            <Link href="/category/accessories" className="text-gray-700 font-medium hover:text-brand-red transition-colors">Accessories</Link>
            <Link href="/offers" className="text-brand-red font-bold hover:opacity-80 transition-opacity">Special Offers</Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col md:hidden shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Sidebar Header */}
        <div className="bg-brand-red p-4 flex justify-between items-center text-white">
          <div className="flex flex-row items-center flex-shrink-0 border border-white bg-white h-8">
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
          <Link href="/category/chimneys" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Kitchen Chimneys</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
          <Link href="/category/induction" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Induction Cookers</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
          <Link href="/category/stoves" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Gas Stoves</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
          <Link href="/category/ovens" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Built-in Ovens</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
          <Link href="/category/accessories" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-red hover:bg-red-50/30">
            <span>Accessories</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
        </div>

      </div>
    </>
  );
}
