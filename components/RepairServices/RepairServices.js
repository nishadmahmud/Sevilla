import Link from 'next/link';
import { FiWind, FiThermometer, FiTool, FiHome, FiCheckCircle, FiSettings } from 'react-icons/fi';

export default function RepairServices() {
    const services = [
        { title: "Chimney Setup", desc: "Expert wall mount and island chimney installation.", icon: <FiWind /> },
        { title: "Cooker Repair", desc: "Diagnostics and repair for inductions and microwaves.", icon: <FiThermometer /> },
        { title: "Stove Maintenance", desc: "Burner cleaning, pipe checks, and leak prevention.", icon: <FiTool /> },
        { title: "Oven Installation", desc: "Built-in oven fitting and electrical configuration.", icon: <FiHome /> },
        { title: "General Checkup", desc: "Routine health checks for all your major kitchen appliances.", icon: <FiCheckCircle /> },
        { title: "Parts Replacement", desc: "Genuine motors, filters, and glass replacements.", icon: <FiSettings /> }
    ];

    return (
        <section className="bg-white py-10 md:py-20 px-3 md:px-6 border-b border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-16 max-w-2xl mx-auto">
                    <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight">
                        We Make <span className="text-brand-red">Appliance Installation</span> Stress Free
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500">
                        From simple setups to complex maintenance, our certified experts have you covered.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {services.map((service, idx) => (
                        <div key={idx} className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 hover:border-brand-red/50 transition-all duration-300 cursor-pointer">
                            <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-3 md:mb-6 bg-red-50 rounded-full flex items-center justify-center text-xl md:text-3xl text-brand-red group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-3">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-[11px] md:text-base hidden sm:block">{service.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:mt-16 text-center">
                    <Link href="/services" className="inline-flex items-center justify-center font-bold text-sm md:text-base text-brand-red hover:text-red-700 underline underline-offset-4 decoration-2 decoration-brand-red/30 hover:decoration-brand-red transition-all">
                        View All Repair Services &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
