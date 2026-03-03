"use client";

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer({ categories = [] }) {
    const dynamicCategories = Array.isArray(categories) ? categories.slice(0, 4) : [];
    return (
        <footer className="bg-brand-red border-t border-brand-red/50 text-white/90 mt-auto">
            <div className="max-w-7xl mx-auto px-3 md:px-6 py-8 md:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8 mb-8 md:mb-12">

                    {/* Brand & Contact */}
                    <div className="flex flex-col gap-3 md:gap-6 col-span-2 sm:col-span-1">
                        <Link href="/" className="inline-block">
                            <div className="flex flex-row items-center shrink-0 border border-white bg-white h-8 w-fit">
                                <span className="text-lg text-black px-2 flex items-center h-full" style={{ fontFamily: 'Georgia, serif' }}>
                                    sevilla
                                </span>
                                <span className="text-lg text-white bg-brand-red px-2 flex items-center h-full font-bold">
                                    +
                                </span>
                            </div>
                        </Link>
                        <p className="text-[10px] md:text-sm leading-relaxed text-white/80">
                            Bangladesh&apos;s most trusted premium kitchen appliances shop.
                        </p>
                        <div className="flex flex-col gap-1.5 md:gap-2 text-[10px] md:text-sm text-white/90">
                            <p className="flex gap-1 md:gap-2">
                                <strong className="text-white">Address:</strong>
                                <span>Level-4, Block-C, Shop #35A, Jamuna Future Park</span>
                            </p>
                            <p className="flex gap-1 md:gap-2">
                                <strong className="text-white">Phone:</strong>
                                <a href="tel:+8801714404100" className="hover:text-white/70 transition-colors">+8801714404100</a>
                            </p>
                        </div>
                        <div className="flex gap-3 md:gap-4 mt-1">
                            <a href="https://facebook.com/sevilla.bd" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Facebook"><FaFacebook size={18} /></a>
                            <a href="https://instagram.com/sevilla.bd" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Instagram"><FaInstagram size={18} /></a>
                            <a href="https://youtube.com/@sevillabd" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="YouTube"><FaYoutube size={18} /></a>
                        </div>
                    </div>

                    {/* Services / Support */}
                    <div className="flex flex-col gap-3 md:gap-6">
                        <h3 className="text-sm md:text-lg font-bold text-white">Support</h3>
                        <div className="flex flex-col gap-1.5 md:gap-3 text-[10px] md:text-sm">
                            <Link href="/track-order" className="hover:text-white/70 transition-colors">Track Order</Link>
                            <Link href="/offer" className="hover:text-white/70 transition-colors">Special Offers</Link>
                            <Link href="/blog" className="hover:text-white/70 transition-colors">Blog & Tips</Link>
                            <Link href="/contact" className="hover:text-white/70 transition-colors">Help & Contact</Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="flex flex-col gap-3 md:gap-6">
                        <h3 className="text-sm md:text-lg font-bold text-white">Shop</h3>
                        <div className="flex flex-col gap-1.5 md:gap-3 text-[10px] md:text-sm">
                            <Link href="/shop" className="hover:text-white/70 transition-colors">All Products</Link>
                            {dynamicCategories.map((cat) => (
                                <Link
                                    key={cat.category_id || cat.id}
                                    href={`/category/${cat.category_id || cat.id}`}
                                    className="hover:text-white/70 transition-colors"
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col gap-3 md:gap-6 col-span-2 sm:col-span-1">
                        <h3 className="text-sm md:text-lg font-bold text-white">Company</h3>
                        <div className="flex flex-col gap-1.5 md:gap-3 text-[10px] md:text-sm">
                            <Link href="/about" className="hover:text-white/70 transition-colors">About Us</Link>
                            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact Us</Link>
                            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms & Conditions</Link>
                            <Link href="/refund" className="hover:text-white/70 transition-colors">Refund Policy</Link>
                            <Link href="/warranty" className="hover:text-white/70 transition-colors">Warranty & Service</Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="border-t border-white/10 bg-gray-900">
                <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-[9px] md:text-xs font-medium text-gray-400">
                    <p>&copy; {new Date().getFullYear()} sevilla. All rights reserved.</p>
                        <div className="flex gap-4 md:gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                            <Link href="/refund" className="hover:text-white transition-colors">Refund</Link>
                        </div>
                </div>
            </div>
        </footer>
    );
}
