"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero({ slides: apiSlides = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const defaultSlides = [
        {
            id: 1,
            badge: "Premium Italian Design",
            title: "Upgrade Your Kitchen",
            desc: "Discover state-of-the-art kitchen chimneys and induction cookers.",
            ctaText: "Shop Now",
            ctaLink: "/shop",
            imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1170&auto=format&fit=crop"
        },
        {
            id: 2,
            badge: "Free Installation",
            title: "Professional Service",
            desc: "Get your new appliances installed by certified experts at no extra cost.",
            ctaText: "Learn More",
            ctaLink: "/services",
            imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1170&auto=format&fit=crop"
        },
        {
            id: 4,
            badge: "Exclusive Offers",
            title: "Up to 30% Off Chimneys",
            desc: "Keep your kitchen fresh with our premium range of silent chimneys.",
            ctaText: "View Offers",
            ctaLink: "/category/chimneys",
            imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1170&auto=format&fit=crop"
        }
    ];

    const slides = apiSlides && apiSlides.length ? apiSlides : defaultSlides;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="w-full bg-white py-2 md:py-8 px-3 md:px-6">
            <div className="max-w-7xl mx-auto relative overflow-hidden rounded-xl h-[220px] sm:h-[320px] md:h-[500px] shadow-lg border border-gray-100">
                {slides.map((slide, idx) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <Link
                            href={slide.ctaLink || '/'}
                            className="relative block w-full h-full"
                            aria-label={slide.title || `Slide ${idx + 1}`}
                        >
                            <Image
                                src={slide.imageUrl}
                                alt={slide.title || `Slide ${idx + 1}`}
                                fill
                                unoptimized
                                className="object-cover object-center"
                                priority={idx === 0}
                            />
                        </Link>
                    </div>
                ))}
                <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-1.5 md:gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-white w-5 md:w-8' : 'bg-white/50 w-1.5 md:w-2 hover:bg-white/80'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
