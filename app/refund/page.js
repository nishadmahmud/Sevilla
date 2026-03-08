import Link from "next/link";
import { CheckCircle, XCircle, Smartphone, Landmark, Tag, AlertTriangle } from "lucide-react";

export const metadata = {
    title: "Refund Policy | sevilla",
    description: "sevilla refund and return policy — learn about our return process, eligibility, and refund timelines.",
};

const faqs = [
    { q: "How long does a refund take?", a: "Refunds are typically processed within 7-10 business days after we receive and inspect the returned item. Bank refunds may take an additional 3-5 business days to appear in your account." },
    { q: "Can I return a product after using it?", a: "Products must be unused, in original packaging, and returned within 3 days of delivery. Used products are not eligible for return unless they are defective." },
    { q: "Who pays for return shipping?", a: "Return shipping costs are the customer's responsibility unless the product is defective or we shipped the wrong item." },
    { q: "Are installation services refundable?", a: "Installation and maintenance service fees are non-refundable once the service is completed. If you are unsatisfied with the installation, please contact us within 7 days and we will re-inspect at no additional cost." },
];

export default function RefundPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-10">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center">
                    <span className="inline-block px-4 py-1.5 bg-brand-red/20 text-brand-red text-xs font-bold rounded-full mb-4 border border-brand-red/20">POLICY</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Refund & Return Policy</h1>
                    <p className="text-gray-400 text-sm md:text-base">Your satisfaction is our priority</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-6 space-y-6">
                {/* Overview */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        At sevilla, we want you to be completely happy with your purchase. If you&apos;re not satisfied, we offer a hassle-free return and refund process. Please read the details below carefully.
                    </p>

                    {/* Eligibility */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Eligible for Return</h3>
                            <ul className="text-sm text-green-700 space-y-1.5">
                                <li>• Unused, unopened products in original packaging</li>
                                <li>• Returned within 3 days of delivery</li>
                                <li>• Defective or damaged products (with proof)</li>
                                <li>• Wrong product delivered</li>
                                <li>• Product significantly differs from description</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                            <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><XCircle className="w-5 h-5" /> Not Eligible</h3>
                            <ul className="text-sm text-red-700 space-y-1.5">
                                <li>• Used or opened products</li>
                                <li>• Products returned after 3 days</li>
                                <li>• Sale or discounted items</li>
                                <li>• Custom or special orders</li>
                                <li>• Software or digital products</li>
                                <li>• Products without original packaging</li>
                            </ul>
                        </div>
                    </div>

                    {/* Process */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
                    <div className="space-y-4 mb-8">
                        {[
                            { step: 1, title: "Contact Us", desc: "Call us at +880 1805-738326 or email sevilla.agt@gmail.com with your order details and reason for return.", color: "from-blue-500 to-blue-600" },
                            { step: 2, title: "Get Approval", desc: "Our team will review your request and provide a Return Authorization (RA) number within 24 hours.", color: "from-indigo-500 to-purple-600" },
                            { step: 3, title: "Ship the Product", desc: "Pack the item securely in its original packaging and ship it to our store address. Include the RA number with your return.", color: "from-brand-red to-red-500" },
                            { step: 4, title: "Receive Refund", desc: "Once we receive and inspect the product, your refund will be processed within 7-10 business days.", color: "from-green-500 to-emerald-600" },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 items-start">
                                <div className={`w-10 h-10 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg`}>{item.step}</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-0.5">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Refund Methods */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Refund Methods</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                        {[
                            { method: "bKash / Nagad", time: "1-3 business days", icon: <Smartphone className="w-6 h-6 text-brand-red" /> },
                            { method: "Bank Transfer", time: "5-7 business days", icon: <Landmark className="w-6 h-6 text-brand-red" /> },
                            { method: "Store Credit", time: "Instant", icon: <Tag className="w-6 h-6 text-brand-red" /> },
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                                <span className="mb-2 block">{item.icon}</span>
                                <h4 className="font-bold text-gray-900 text-sm">{item.method}</h4>
                                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                            </div>
                        ))}
                    </div>

                    {/* Service Policies */}
                    <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 mb-8">
                        <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Installation Services</h3>
                        <p className="text-sm text-amber-800">
                            Service fees are non-refundable once work has been completed. If you experience issues after installation, please contact us within 90 days and we will re-inspect and fix the installation at no additional cost. Warranty does not cover misuse, physical damage, or unauthorized modifications.
                        </p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-1.5 text-sm">{faq.q}</h4>
                                <p className="text-sm text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100 text-center">
                        <p className="text-sm text-gray-600 mb-3">Still have questions about our refund policy?</p>
                        <Link href="/contact" className="inline-block px-6 py-2.5 bg-brand-red text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-red/30 hover:bg-[#ff1a2b] transition-all">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
