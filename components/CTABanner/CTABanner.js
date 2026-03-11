import Link from 'next/link';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

export default function CTABanner() {
    return (
        <section className="bg-gray-900 py-8 md:py-16 border-b-4 border-brand-red">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-lg md:text-3xl font-extrabold text-white mb-1 md:mb-2">Need Professional Installation?</h2>
                        <p className="text-white/80 text-xs md:text-base">Book a service slot today. Our experts will install your appliance right away.</p>
                    </div>
                    <div className="flex gap-2 md:gap-3">
                        <Link href="/book-repair" className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-white text-brand-red font-bold py-2 md:py-3 px-4 md:px-8 rounded-lg hover:bg-gray-50 transition-colors shadow-lg text-xs md:text-base">
                            Book Service <FiArrowRight />
                        </Link>
                        <a href="tel:+8801805738326" className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-white/10 text-white font-bold py-2 md:py-3 px-4 md:px-8 rounded-lg border border-white/30 hover:bg-white/20 transition-colors text-xs md:text-base">
                            <FiPhone /> Call Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
