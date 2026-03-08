"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Home, Phone } from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const invoice = searchParams.get("invoice") || "—";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Success Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

                    {/* Animated check icon */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
                            <CheckCircle className="w-14 h-14 text-green-500" strokeWidth={1.5} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Order Placed!</h1>
                    <p className="text-gray-500 text-sm mb-8">
                        Thank you for your order. We&apos;ll start processing it right away.
                    </p>

                    {/* Invoice Number */}
                    <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl px-6 py-5 mb-8">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Invoice Number</p>
                        <p className="text-xl font-extrabold text-brand-red tracking-wide">{invoice}</p>
                    </div>

                    {/* Info row */}
                    <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4 text-left mb-8">
                        <Package className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700 leading-relaxed">
                            Our team will contact you shortly to confirm delivery details. Please keep your phone reachable.
                        </p>
                    </div>

                    {/* Contact */}
                    <Link
                        href={`/track-order?invoice=${invoice}`}
                        className="flex items-center justify-center gap-2 w-full py-3.5 mb-3 rounded-xl bg-brand-red text-white font-extrabold text-sm shadow-lg shadow-brand-red/25 hover:bg-[#ff1a2b] transition-all"
                    >
                        <Package className="w-4 h-4" />
                        Track Your Order
                    </Link>

                    <a
                        href="tel:+8801805738326"
                        className="flex items-center justify-center gap-2 w-full py-3 mb-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-brand-red hover:text-brand-red transition-colors"
                    >
                        <Phone className="w-4 h-4" />
                        +880 1805-738326
                    </a>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-400 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Save your invoice number for tracking &amp; support.
                </p>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading…</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
