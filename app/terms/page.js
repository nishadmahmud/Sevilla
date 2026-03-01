import Link from "next/link";

export const metadata = {
    title: "Terms & Conditions | sevilla",
    description: "sevilla terms and conditions — rules and regulations for using our website and services.",
};

const sections = [
    {
        title: "1. Acceptance of Terms",
        content: "By accessing and using the sevilla website (sevilla.com.bd), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.",
    },
    {
        title: "2. Products & Pricing",
        content: "All product prices are listed in Bangladeshi Taka (BDT) and are subject to change without prior notice. We strive to display accurate pricing, but errors may occur. In the event of a pricing error, we reserve the right to cancel the order and issue a full refund. Product images are for illustration purposes and may vary slightly from the actual product.",
    },
    {
        title: "3. Orders & Payment",
        content: "By placing an order, you confirm that all information provided is accurate. We accept Cash on Delivery (COD), bKash, Nagad, and bank transfers. Orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order for any reason, including suspected fraud.",
    },
    {
        title: "4. Shipping & Delivery",
        content: "We deliver nationwide across Bangladesh. Delivery times vary by location — typically 1-3 business days within Dhaka and 3-7 business days outside Dhaka. Delivery charges are calculated at checkout based on your location. We are not responsible for delays caused by courier services, natural disasters, or unforeseen circumstances.",
    },
    {
        title: "5. Installation & Maintenance Services",
        content: "All installations and maintenance services are performed by certified technicians. Estimates are provided before work begins. We offer a 1-year warranty on installation labor. The warranty does not cover physical damage, water damage, or unauthorized modifications after the installation.",
    },
    {
        title: "6. Returns & Exchanges",
        content: "Products may be returned within 3 days of delivery if unused, unopened, and in original packaging. Refunds will be processed within 7-10 business days after we receive and inspect the returned item. Return shipping costs are the responsibility of the customer unless the product is defective or incorrect. Custom orders, software, and sale items are non-returnable.",
    },
    {
        title: "7. User Accounts",
        content: "You are responsible for maintaining the confidentiality of your account credentials. You agree not to share your account with others. We reserve the right to suspend or terminate accounts that violate these terms. You are responsible for all activities that occur under your account.",
    },
    {
        title: "8. Intellectual Property",
        content: "All content on this website — including logos, images, text, graphics, and software — is the property of sevilla and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without explicit written permission.",
    },
    {
        title: "9. Limitation of Liability",
        content: "sevilla shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid by you for the specific product or service in question.",
    },
    {
        title: "10. Governing Law",
        content: "These Terms and Conditions are governed by the laws of Bangladesh. Any disputes arising from these terms shall be resolved through the courts of Dhaka, Bangladesh.",
    },
];

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-10">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center">
                    <span className="inline-block px-4 py-1.5 bg-brand-red/20 text-brand-red text-xs font-bold rounded-full mb-4 border border-brand-red/20">LEGAL</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Terms & Conditions</h1>
                    <p className="text-gray-400 text-sm md:text-base">Last updated: February 2026</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    <div className="space-y-8">
                        {sections.map((section, i) => (
                            <div key={i}>
                                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-600">
                            Questions about these terms? Contact us at{" "}
                            <a href="mailto:support@sevilla.com.bd" className="text-brand-red font-semibold hover:underline">support@sevilla.com.bd</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
