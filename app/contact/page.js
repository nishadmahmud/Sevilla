"use client";

import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiMessageCircle } from "react-icons/fi";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate sending
        await new Promise(r => setTimeout(r, 1500));
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setSending(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-10">
            {/* Hero */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center">
                    <span className="inline-block px-4 py-1.5 bg-brand-red/20 text-brand-red text-xs font-bold rounded-full mb-4 border border-brand-red/20">GET IN TOUCH</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Contact <span className="text-brand-red">Us</span></h1>
                    <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto">Have a question or need a repair quote? We&apos;d love to hear from you.</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-4">
                        {[
                            { icon: <FiMapPin size={20} />, title: "Visit Us", text: "Level-4, Block-C, Shop #35A,\nJamuna Future Park, Dhaka-1229" },
                            { icon: <FiPhone size={20} />, title: "Call Us", text: "+880 1714-404100", href: "tel:+8801714404100" },
                            { icon: <FiMail size={20} />, title: "Email Us", text: "support@sevillabd.com", href: "mailto:support@sevillabd.com" },
                            { icon: <FiClock size={20} />, title: "Business Hours", text: "Sat–Thu: 10 AM – 9 PM\nFri: 2 PM – 9 PM" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all flex gap-4 items-start">
                                <div className="w-10 h-10 bg-brand-red/10 text-brand-red rounded-lg flex items-center justify-center flex-shrink-0">{item.icon}</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                                    {item.href ? (
                                        <a href={item.href} className="text-sm text-gray-600 hover:text-brand-red transition-colors">{item.text}</a>
                                    ) : (
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{item.text}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Social */}
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <h3 className="font-bold text-gray-900 text-sm mb-3">Connect With Us</h3>
                            <div className="flex gap-3">
                                <a href="https://facebook.com/sevilla.bd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"><FaFacebook size={20} /></a>
                                <a href="https://wa.me/8801714404100" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors"><FaWhatsapp size={20} /></a>
                                <a href="mailto:support@sevillabd.com" className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"><FiMail size={20} /></a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-brand-red/10 text-brand-red rounded-lg flex items-center justify-center"><FiMessageCircle size={20} /></div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Send a Message</h2>
                                <p className="text-xs text-gray-500">We typically respond within 24 hours</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Name *</label>
                                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Phone</label>
                                    <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="01XXXXXXXXX" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Email *</label>
                                <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Subject *</label>
                                <input type="text" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} placeholder="How can we help?" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Message *</label>
                                <textarea required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} placeholder="Tell us the details..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-sm resize-none" />
                            </div>
                            <button type="submit" disabled={sending} className="w-full py-3.5 bg-brand-red text-white font-extrabold rounded-xl shadow-lg shadow-brand-red/30 hover:bg-[#ff1a2b] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2">
                                {sending ? (<><div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />Sending...</>) : (<><FiSend size={16} />Send Message</>)}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d90.4315!3d23.8136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJamuna+Future+Park!5e0!3m2!1sen!2sbd!4v1630000000000"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="sevilla Location"
                    />
                </div>
            </div>
        </div>
    );
}
