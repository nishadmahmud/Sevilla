"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiShoppingCart, FiGrid, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { cartCount, openCart } = useCart();
    const { user, openAuthModal } = useAuth();

    const navItems = [
        { name: 'Home', href: '/', icon: FiHome },
        { name: 'Cart', href: '#', icon: FiShoppingCart, isCartToggle: true },
        { name: 'Categories', href: '/category', icon: FiGrid },
        { name: user ? 'Profile' : 'Login', href: '/profile', icon: FiUser, isAuth: true },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 pb-safe">
            <div className="flex w-full h-0.5 opacity-20">
                <div className="w-1/4 bg-white"></div>
                <div className="w-1/4 bg-white"></div>
                <div className="w-1/4 bg-white"></div>
                <div className="w-1/4 bg-white"></div>
            </div>

            <div className="flex justify-around items-center px-2 py-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    const isCartItem = item.isCartToggle;
                    const isAuthItem = item.isAuth;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                                if (isCartItem) {
                                    e.preventDefault();
                                    openCart();
                                } else if (isAuthItem) {
                                    e.preventDefault();
                                    if (user) {
                                        router.push('/profile');
                                    } else {
                                        openAuthModal('login');
                                    }
                                }
                            }}
                            className={`flex flex-col items-center justify-center w-full gap-1.5 transition-colors ${isActive ? 'text-brand-red' : 'text-white hover:text-gray-300'}`}
                        >
                            <div className="relative">
                                {isAuthItem && user?.image ? (
                                    <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-brand-red/60">
                                        <Image src={user.image} alt="Profile" width={24} height={24} className="w-full h-full object-cover" unoptimized />
                                    </div>
                                ) : isAuthItem && user ? (
                                    <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center text-[10px] font-bold text-brand-red ring-2 ring-brand-red/40">
                                        {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <>
                                        <Icon size={20} className={isCartItem && cartCount > 0 ? "text-brand-red" : ""} strokeWidth={isActive ? 2.5 : 2} />
                                        {isCartItem && cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-gray-900">
                                                {cartCount}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            <span className="text-[10px] font-semibold tracking-wide">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
