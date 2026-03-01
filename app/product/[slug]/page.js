"use client";

import { useParams } from 'next/navigation';
import ProductGallery from '../../../components/Product/ProductGallery';
import ProductInfo from '../../../components/Product/ProductInfo';
import ProductTabs from '../../../components/Product/ProductTabs';
import ProductCard from '../../../components/Shared/ProductCard';

export default function ProductDetailsPage() {
    const params = useParams();
    const productName = decodeURIComponent(params.slug || 'Product')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Mock Data for the PDP
    const productData = {
        name: params.slug === 'iphone-16-plus' ? 'sevilla 90cm Auto-Clean Chimney' : productName,
        price: '৳ 18,500',
        oldPrice: '৳ 25,000',
        images: [
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800'
        ],
        variants: {
            storage: ['60cm', '90cm', '120cm'],
            colors: [
                { name: 'Stainless Steel', hex: '#C0C0C0' },
                { name: 'Black Glass', hex: '#1a1a1a' },
                { name: 'White', hex: '#ffffff' },
            ],
            regions: ['Wall Mount', 'Island', 'Built-in']
        },
        description: `
            <p><strong>sevilla</strong> has officially launched the latest Auto-Clean Chimney series. This appliance brings a sleek and modern design that offers 1500 m3/hr suction power and heat auto-clean technology for a smoke-free cooking experience. Powered by a heavy-duty copper motor, it ensures efficient performance for heavy frying and grilling. The baffle filter setup with LED lighting delivers sharp visibility and stable operation. Featuring touch controls and gesture sensors, the sevilla chimney is built to make your kitchen smarter.</p>
            <br/>
            <h3>Key Features</h3>
            <p>Under the hood, it runs quietly with advanced noise reduction architecture. With a powerful suction rate, removing smoke and odors is a breeze. From regular cooking to deep-frying, this chimney can handle it all without breaking a sweat. Paired with sturdy build quality and an elegant finish, you get both power and aesthetics. And if that's not enough, there's a 5-year warranty on the motor to keep you going.</p>
        `,
        specifications: `
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Size:</strong> 90cm width</li>
                <li><strong>Suction Power:</strong> 1500 m³/hr</li>
                <li><strong>Filter Type:</strong> Baffle Filter</li>
                <li><strong>Control Panel:</strong> Touch Control with Gesture Sensor</li>
                <li><strong>Auto Clean:</strong> Thermal Auto-Clean Technology</li>
                <li><strong>Material:</strong> Tempered Glass & Stainless Steel</li>
            </ul>
        `
    };

    // Mock Related Products
    const relatedProducts = [
        { id: 101, name: "Eco Power Induction Cooktop", price: "৳ 3,500", oldPrice: "৳ 4,500", discount: "৳ 1,000", imageUrl: "https://images.unsplash.com/photo-1590794055276-802cbb3e8c9b?q=80&w=600" },
        { id: 102, name: "Built-in Convection Oven", price: "৳ 28,500", oldPrice: "৳ 35,000", discount: "৳ 6,500", imageUrl: "https://images.unsplash.com/photo-1584288081692-74baeaed5b6c?q=80&w=600" },
        { id: 103, name: "3-Burner Glass Top Stove", price: "৳ 4,500", oldPrice: "৳ 5,200", discount: "৳ 700", imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600" },
        { id: 104, name: "Premium Water Purifier Plus", price: "৳ 15,200", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1585863959955-e427d1a580a6?q=80&w=600" },
    ];

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Breadcrumb Header */}
            <div className="border-b border-gray-100 bg-gray-50/50 py-3 md:py-4 mb-6 md:mb-10">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-[11px] md:text-sm text-gray-500 flex items-center gap-2">
                        <span className="hover:text-[#1a3b34] cursor-pointer">Home</span> /
                        <span className="hover:text-[#1a3b34] cursor-pointer">Shop</span> /
                        <span className="text-brand-red font-semibold capitalize truncate">{productData.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* 2-Column Top Layout */}
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* Col 1: Gallery (40% on Desktop, 50% iPad) */}
                    <div className="w-full md:w-1/2 lg:w-[40%] shrink-0">
                        <ProductGallery images={productData.images} />
                    </div>

                    {/* Col 2: Info (60% on Desktop, 50% iPad) */}
                    <div className="w-full md:w-1/2 lg:w-[60%]">
                        <ProductInfo product={productData} />
                    </div>
                </div>

                {/* Bottom: Tabs */}
                <ProductTabs
                    description={productData.description}
                    specifications={productData.specifications}
                />

                {/* Related Products Section */}
                <div className="mt-16 md:mt-24 pt-12 border-t border-gray-200">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a3b34] mb-8 text-center md:text-left">
                        Related Products
                    </h2>

                    {/* Reusing ProductGrid for display, omitting the onOpenFilter/sort headers since this is just a short list */}
                    {/* We can hide the top bar via CSS or just map cards directly for simplicity */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                        {relatedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
