import Link from 'next/link';
import ProductCard from '../Shared/ProductCard';

export default function FeaturedProducts({ products = [] }) {
    const displayProducts = Array.isArray(products) ? products : [];

    return (
        <section className="bg-white py-8 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex items-end justify-between mb-6 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-3 tracking-tight">
                            Best <span className="text-brand-red">Sellers</span>
                        </h2>
                        <p className="text-gray-500 text-xs md:text-lg hidden sm:block">
                            Our most wanted gadgets, loved by customers.
                        </p>
                    </div>
                    <Link href="/shop" className="text-xs md:text-sm font-bold text-gray-500 hover:text-brand-red uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-red whitespace-nowrap">
                        View All
                    </Link>
                </div>

                {displayProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-8">
                        {displayProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
                        Best seller products are not available right now.
                    </div>
                )}
            </div>
        </section>
    );
}
