"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function BlogTips() {
    const posts = [
        { id: 1, title: "5 Signs Your Kitchen Chimney Needs Cleaning", excerpt: "Is your kitchen getting smoky? Here are the telltale signs your chimney filters are blocked.", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600", category: "Cleaning", readTime: "3 min" },
        { id: 2, title: "How to Maintain Your Induction Cooktop", excerpt: "Prevention is better than repair. Keep your induction surface scratch-free and safe.", imageUrl: "https://images.unsplash.com/photo-1590794055276-802cbb3e8c9b?q=80&w=600", category: "Maintenance", readTime: "4 min" },
        { id: 3, title: "Choosing the Right Built-in Oven", excerpt: "Selecting the right capacity and features for your ultimate baking experience.", imageUrl: "https://images.unsplash.com/photo-1584288081692-74baeaed5b6c?q=80&w=600", category: "Tips", readTime: "2 min" },
    ];

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex items-end justify-between mb-6 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-3 tracking-tight">
                            Tips & <span className="text-brand-red">Guides</span>
                        </h2>
                        <p className="text-gray-500 text-xs md:text-lg hidden sm:block">Expert advice to keep your kitchen running perfectly.</p>
                    </div>
                    <Link href="/blog" className="text-xs md:text-sm font-bold text-gray-500 hover:text-brand-red uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-red whitespace-nowrap">
                        View All
                    </Link>
                </div>

                {/* Horizontal scroll on mobile, grid on desktop */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-3 md:gap-8 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {posts.map((post) => (
                        <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-red/20 transition-all duration-300 min-w-[220px] md:min-w-0 flex-shrink-0">
                            <div className="w-full aspect-[16/9] relative overflow-hidden bg-gray-100">
                                <Image src={post.imageUrl} alt={post.title} fill unoptimized className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-2 left-2 md:top-3 md:left-3">
                                    <span className="bg-brand-red text-white text-[8px] md:text-[10px] font-bold px-2 md:px-2.5 py-0.5 md:py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                                </div>
                            </div>
                            <div className="p-3 md:p-6 flex flex-col flex-grow">
                                <h3 className="font-bold text-gray-900 text-xs md:text-lg mb-1 md:mb-2 leading-tight group-hover:text-brand-red transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed mb-2 md:mb-4 flex-grow line-clamp-2 hidden sm:block">{post.excerpt}</p>
                                <span className="text-[9px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">{post.readTime}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
