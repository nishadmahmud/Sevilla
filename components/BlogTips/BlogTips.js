"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function BlogTips({ posts = [] }) {
    const displayPosts = Array.isArray(posts) ? posts : [];

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex items-end justify-between mb-6 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-3 tracking-tight">
                            Tips &amp; <span className="text-brand-red">Guides</span>
                        </h2>
                        <p className="text-gray-500 text-xs md:text-lg hidden sm:block">Expert advice to keep your kitchen running perfectly.</p>
                    </div>
                    <Link href="/blog" className="text-xs md:text-sm font-bold text-gray-500 hover:text-brand-red uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-red whitespace-nowrap">
                        View All
                    </Link>
                </div>

                {displayPosts.length > 0 ? (
                    <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-3 md:gap-8 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {displayPosts.map((post) => (
                            <Link href="/blog" key={post.id} className="group flex flex-col bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-red/20 transition-all duration-300 min-w-[220px] md:min-w-0 shrink-0">
                                <div className="w-full aspect-video relative overflow-hidden bg-gray-100">
                                    <Image src={post.imageUrl || '/no-image.svg'} alt={post.title} fill unoptimized className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                                        <span className="bg-brand-red text-white text-[8px] md:text-[10px] font-bold px-2 md:px-2.5 py-0.5 md:py-1 rounded-full uppercase tracking-wider">{post.category || 'Blog'}</span>
                                    </div>
                                </div>
                                <div className="p-3 md:p-6 flex flex-col grow">
                                    <h3 className="font-bold text-gray-900 text-xs md:text-lg mb-1 md:mb-2 leading-tight group-hover:text-brand-red transition-colors line-clamp-2">{post.title}</h3>
                                    <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed mb-2 md:mb-4 grow line-clamp-2 hidden sm:block">{post.excerpt}</p>
                                    <span className="text-[9px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">{post.readTime || 'Read'}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
                        Blog posts are not available right now.
                    </div>
                )}
            </div>
        </section>
    );
}
