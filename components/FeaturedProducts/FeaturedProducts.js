import Link from 'next/link';
import ProductCard from '../Shared/ProductCard';

export default function FeaturedProducts({ products = [] }) {
    const fallbackProducts = [
        { id: 1, name: "sevilla Wall Mount Chimney", price: "৳12,500", oldPrice: "৳15,000", discount: "-16%", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600" },
        { id: 2, name: "Double Burner Gas Stove", price: "৳3,500", oldPrice: "৳4,000", discount: "-12%", imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600" },
        { id: 3, name: "Portable Induction Cooker", price: "৳2,299", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1590794055276-802cbb3e8c9b?q=80&w=600" },
        { id: 4, name: "Filterless Auto-Clean Chimney", price: "৳15,200", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600" },
        { id: 5, name: "Stainless Steel Built-in Hob", price: "৳11,800", oldPrice: "৳15,500", discount: "-28%", imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600" },
        { id: 6, name: "sevilla Advanced RO Purifier", price: "৳14,500", oldPrice: "৳16,500", discount: "-18%", imageUrl: "https://images.unsplash.com/photo-1585863959955-e427d1a580a6?q=80&w=600" },
        { id: 7, name: "Premium Baking Oven 40L", price: "৳12,500", oldPrice: "৳15,000", discount: "-17%", imageUrl: "https://images.unsplash.com/photo-1584288081692-74baeaed5b6c?q=80&w=600" },
        { id: 8, name: "Kitchen Exhaust Fan Heavy Duty", price: "৳1,500", oldPrice: "৳2,500", discount: "-40%", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600" },
    ];

    const displayProducts = products?.length ? products : fallbackProducts;

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

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-8">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
