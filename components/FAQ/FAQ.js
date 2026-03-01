"use client";

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { question: "How long does installation take?", answer: "Most installations are completed within 1-2 hours. Complex fittings may take 3-4 hours." },
        { question: "Do you use original parts?", answer: "Yes, we provide 100% genuine parts for all major appliance brands. We do not compromise on safety or quality." },
        { question: "Is there a warranty on products and services?", answer: "All our appliances come with a minimum 1-year product warranty and a 5-year guarantee on motors." },
        { question: "Do you offer installation services at home?", answer: "Yes, free installation and product demonstration right at your home for all major appliances." },
        { question: "Can I track my delivery status?", answer: "Yes, you'll receive a tracking ID via SMS. Our dispatch team will call you before arrival." },
        { question: "Do you ship nationwide?", answer: "Yes, we deliver to all 64 districts. Inside Dhaka delivery takes 1-2 days, outside Dhaka takes 3-5 business days." },
    ];

    const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

    return (
        <section className="bg-gray-50 py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-3 md:px-6">
                <div className="text-center mb-6 md:mb-12">
                    <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight">
                        Frequently Asked <span className="text-brand-red">Questions</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 hidden sm:block">Got questions? We've got answers.</p>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className={`bg-white rounded-lg md:rounded-xl border transition-all duration-200 ${openIndex === idx ? 'border-brand-red/30 shadow-md' : 'border-gray-100 shadow-sm'}`}>
                            <button onClick={() => toggle(idx)} className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-left">
                                <span className="font-bold text-gray-900 text-xs md:text-base pr-4">{faq.question}</span>
                                <FiChevronDown className={`text-brand-red flex-shrink-0 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} size={16} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-200 ${openIndex === idx ? 'max-h-48 pb-3 md:pb-4' : 'max-h-0'}`}>
                                <p className="px-4 md:px-6 text-gray-500 text-[11px] md:text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
