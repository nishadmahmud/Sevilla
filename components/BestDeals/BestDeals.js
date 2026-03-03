import Image from 'next/image';
import Link from 'next/link';

export default function BestDeals({ deals = [] }) {
    const fallbackDeals = [
        {
            id: 1,
            title: "sevilla Dream Kitchen Combo",
            description: "Get our top-rated 90cm Auto-Clean Chimney with a premium 3-Burner Built-in Hob. Free installation included.",
            price: "৳25,000",
            oldPrice: "৳32,000",
            savings: "Save ৳7,000",
            imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800",
            badge: "BEST SELLER",
            link: "/shop",
        },
        {
            id: 2,
            title: "Smart Cooker Bundle",
            description: "Eco Power Induction Cooktop with a compatible non-stick cookware set.",
            price: "৳8,500",
            oldPrice: "৳10,500",
            savings: "Save ৳2,000",
            imageUrl: "https://images.unsplash.com/photo-1590794055276-802cbb3e8c9b?q=80&w=800",
            badge: "HOT DEAL",
            link: "/shop",
        },
    ];

    const displayDeals = deals?.length ? deals : fallbackDeals;

    return (
        <section className="bg-gray-50 py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="text-center mb-6 md:mb-14">
                    <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight">
                        Best <span className="text-brand-red">Deals</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto hidden sm:block">
                        Unbeatable offers hand-picked for you. Grab them before they're gone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {displayDeals.map((deal) => (
                        <div key={deal.id} className="group bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row">
                            <div className="sm:w-2/5 aspect-[16/9] sm:aspect-auto relative overflow-hidden bg-gray-100">
                                <Image src={deal.imageUrl} alt={deal.title} fill unoptimized className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
                                    <span className="bg-red-500 text-white text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-wider shadow-md">{deal.badge}</span>
                                </div>
                            </div>
                            <div className="sm:w-3/5 p-4 md:p-8 flex flex-col justify-center">
                                <h3 className="text-base md:text-2xl font-extrabold text-gray-900 mb-1 md:mb-3 leading-tight group-hover:text-brand-red transition-colors">{deal.title}</h3>
                                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-3 md:mb-6 line-clamp-2">{deal.description}</p>
                                <div className="flex items-end gap-2 md:gap-3 mb-2 md:mb-4">
                                    <span className="text-xl md:text-3xl font-black text-brand-red">{deal.price}</span>
                                    {deal.oldPrice && (
                                        <span className="text-gray-400 text-sm md:text-lg line-through mb-0.5">{deal.oldPrice}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    {deal.savings && (
                                        <span className="bg-green-50 text-green-700 text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-green-200">{deal.savings}</span>
                                    )}
                                    <Link href={deal.link || "/shop"} className="text-[10px] md:text-sm font-bold text-brand-red hover:text-red-700 underline underline-offset-4 transition-colors">Shop Now →</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
