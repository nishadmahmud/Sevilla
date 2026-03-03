import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
    const baseSlug = product.name
        ? product.name.toLowerCase().replace(/\s+/g, '-')
        : 'product';

    const href =
        product.link ||
        (product.id
            ? `/product/${baseSlug}-${product.id}`
            : `/product/${baseSlug}`);

    return (
        <Link
            href={href}
            className="bg-white border border-gray-100 rounded-[16px] pb-4 flex flex-col hover:border-brand-red/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group overflow-hidden relative block"
        >

            {/* Discount Badge (Top Left Absolute) */}
            {product.discount && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#ff2a3b] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-[6px] tracking-wide inline-flex items-center justify-center">
                        {product.discount}
                    </span>
                </div>
            )}

            {/* Image Container — flush edges, fixed aspect ratio */}
            <div className="w-full aspect-square relative flex items-center justify-center bg-[#f5f5f5] rounded-t-[16px]">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Details — sits right below the image */}
            <div className="flex flex-col text-left px-3 pt-3">
                <h3 className="text-[#1a3b34] font-bold text-[13px] md:text-[15px] leading-snug line-clamp-2 mb-1">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2">
                    <span className="text-[#1a3b34] font-extrabold text-[15px] md:text-[17px]">
                        {product.price}
                    </span>
                    {product.oldPrice && (
                        <span className="text-[#9ea6a3] text-[11px] md:text-[12px] font-medium line-through">
                            {product.oldPrice}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
