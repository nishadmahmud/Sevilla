"use client";

import Image from "next/image";

const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop";

export default function HomeBanners({ banners = [] }) {
  const safeBanners = (Array.isArray(banners) ? banners : [])
    .slice(0, 2)
    .map((b, idx) => ({
      id: b.id ?? idx,
      imageUrl: b.image_path || FALLBACK_BANNER,
    }));

  if (!safeBanners.length) {
    // Fallback: just show two generic kitchen banners
    safeBanners.push(
      { id: "ph-1", imageUrl: FALLBACK_BANNER },
      { id: "ph-2", imageUrl: FALLBACK_BANNER }
    );
  }

  return (
    <section className="bg-white py-6 md:py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {safeBanners.map((banner) => (
            <div
              key={banner.id}
              className="relative w-full h-[180px] sm:h-[210px] md:h-[260px] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 border border-gray-100"
            >
              <Image
                src={banner.imageUrl || FALLBACK_BANNER}
                alt="Promotional banner"
                fill
                unoptimized
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

