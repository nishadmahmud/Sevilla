import { MdVerifiedUser, MdOutlineEngineering, MdLocalShipping, MdShield } from 'react-icons/md';

export default function TrustStats() {
    const stats = [
        { label: "Premium Quality", icon: <MdVerifiedUser />, counter: "10,000+", counterLabel: "Installed" },
        { label: "Certified Experts", icon: <MdOutlineEngineering />, counter: "5,000+", counterLabel: "Serviced" },
        { label: "Free Delivery", icon: <MdLocalShipping />, counter: "4.9★", counterLabel: "Rating" },
        { label: "Warranty", icon: <MdShield />, counter: "5 Yr", counterLabel: "Motor Guarantee" }
    ];

    return (
        <section className="bg-white py-4 md:py-10 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="grid grid-cols-4 gap-2 md:gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center gap-0.5 md:gap-2 py-3 md:py-6 px-2 md:px-4 bg-white border border-gray-100 rounded-lg md:rounded-xl shadow-sm hover:shadow-md hover:border-brand-red/30 transition-all duration-300 text-center">
                            <div className="text-xl md:text-3xl text-brand-red">{stat.icon}</div>
                            <span className="text-sm md:text-2xl font-black text-gray-900">{stat.counter}</span>
                            <span className="text-[8px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.counterLabel}</span>
                            <span className="text-[9px] md:text-sm font-semibold text-gray-700 hidden sm:block">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}