"use client";

import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
    const reviews = [
        { id: 1, name: "Rahim Ahmed", role: "Chimney Buyer", rating: 5, text: "Installation was done in 45 minutes. The chimney works silently and beautifully. Top-notch!", avatar: "R" },
        { id: 2, name: "Tasnia Farin", role: "Induction User", rating: 5, text: "Bought an induction cooker and it heats up instantly. Saved so much time on cooking!", avatar: "T" },
        { id: 3, name: "Imran Khan", role: "Oven Buyer", rating: 4, text: "Bought a built-in oven in pristine condition. Fair price, came with warranty.", avatar: "I" },
        { id: 4, name: "Nusrat Jahan", role: "Purifier User", rating: 5, text: "Water purifier installation done within a day. Professional staff, genuine parts. 100% recommended.", avatar: "N" },
        { id: 5, name: "Sakib Hasan", role: "Stove User", rating: 5, text: "Gas stove switch had an issue. They sent technicians perfectly. Works flawlessly!", avatar: "S" },
        { id: 6, name: "Maliha Rahman", role: "Accessory Buyer", rating: 4, text: "Ordered cookware online. Super fast delivery. Everything original!", avatar: "M" },
    ];

    return (
        <section className="bg-[#fbfcfa] py-16 md:py-28 text-gray-900 border-b border-gray-100 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">

                    {/* Left Intro Section - Sticky */}
                    <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit mb-4 lg:mb-0">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight mb-6 leading-[1.05] text-gray-900">
                            Don't just take our word for it.
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 mb-8 leading-relaxed font-medium">
                            We've built our reputation on trust, premium appliances, and excellent service. Here's what our community has to say.
                        </p>

                        {/* Rating Block */}
                        <div className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] max-w-sm">
                            <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">4.9</div>
                            <div className="flex flex-col justify-center">
                                <div className="flex gap-1 text-brand-red text-sm md:text-base mb-1">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <span className="text-xs md:text-sm font-semibold text-gray-500">Based on 2,500+ reviews</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Horizontal Scroll Layout (Visible only on mobile) */}
                    <div className="sm:hidden flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory mt-6 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {reviews.map((review) => (
                            <div key={review.id} className="snap-start min-w-[280px] w-[85vw] flex-shrink-0 flex h-full">
                                <ReviewCard review={review} />
                            </div>
                        ))}
                    </div>

                    {/* Desktop/Tablet Masonry Layout (Hidden on mobile) */}
                    <div className="hidden sm:grid sm:grid-cols-2 gap-4 md:gap-6 lg:mt-0 lg:w-2/3">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            {reviews.filter((_, i) => i % 2 === 0).map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                        {/* Column 2 - Staggered */}
                        <div className="flex flex-col gap-4 md:gap-6 sm:mt-12">
                            {reviews.filter((_, i) => i % 2 !== 0).map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ReviewCard({ review }) {
    return (
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-brand-red/30 transition-all duration-300 flex flex-col items-start text-left group">
            <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-[12px] md:text-[14px] ${i < review.rating ? 'text-brand-red' : 'text-gray-200'}`} />
                ))}
            </div>
            <p className="text-gray-800 text-sm md:text-[15px] leading-relaxed mb-8 font-medium">
                "{review.text}"
            </p>
            <div className="flex items-center gap-4 mt-auto w-full pt-5 border-t border-gray-50">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#fdf3eb] flex items-center justify-center text-brand-red font-bold text-sm md:text-lg border border-red-100 shadow-sm">
                    {review.avatar}
                </div>
                <div>
                    <h4 className="text-sm md:text-[15px] font-bold text-gray-900 leading-none mb-1.5">{review.name}</h4>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-wider uppercase leading-none">{review.role}</p>
                </div>
            </div>
        </div>
    );
}
