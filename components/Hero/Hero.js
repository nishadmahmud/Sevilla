"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero({ slides: apiSlides = [] }) {
    const slides = (Array.isArray(apiSlides) ? apiSlides : []).filter((slide) => slide?.imageUrl);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    useEffect(() => {
        if (currentSlide >= slides.length) {
            setCurrentSlide(0);
        }
    }, [currentSlide, slides.length]);

    if (!slides.length) {
        return (
            <section className="w-full bg-white py-2 md:py-8 px-3 md:px-6">
                <div className="max-w-7xl mx-auto rounded-xl h-[220px] sm:h-[320px] md:h-[500px] shadow-sm border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-sm text-gray-500 text-center p-6">
                    Slider content is not available right now.
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-white py-2 md:py-8 px-3 md:px-6">
            <div className="max-w-7xl mx-auto relative overflow-hidden rounded-xl h-[220px] sm:h-[320px] md:h-[500px] shadow-lg border border-gray-100">
                {slides.map((slide, idx) => (
                    <div
                        key={slide.id || idx}
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
