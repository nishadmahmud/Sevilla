"use client";

import Image from 'next/image';

export default function HomeBanners({ banners = [] }) {
  const safeBanners = (Array.isArray(banners) ? banners : [])
    .slice(0, 2)
    .map((b, idx) => ({
      id: b.id ?? idx,
      imageUrl: b.image_path || b.imageUrl,
    }))
    .filter((b) => !!b.imageUrl);

  if (!safeBanners.length) {
    return (
      <section className="bg-white py-6 md:py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
            Promotional banners are not available right now.
          </div>
        </div>
      </section>
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
                src={banner.imageUrl}
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
