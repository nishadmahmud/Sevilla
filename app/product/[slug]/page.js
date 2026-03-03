"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductGallery from '../../../components/Product/ProductGallery';
import ProductInfo from '../../../components/Product/ProductInfo';
import ProductTabs from '../../../components/Product/ProductTabs';
import ProductCard from '../../../components/Shared/ProductCard';
import { getProductById, getRelatedProduct } from '../../../lib/api';

export default function ProductDetailsPage() {
    const params = useParams();
    const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0] || '';

    // Parse product ID from slug
    const productId = useMemo(() => {
        if (!slug) return null;
        const decoded = decodeURIComponent(slug).trim();

        // Case 1: slug is just the numeric ID, e.g. "86086"
        if (/^\d+$/.test(decoded)) {
            const directId = Number(decoded);
            return Number.isFinite(directId) && directId > 0 ? directId : null;
        }

        // Case 2: slug is "name-<id>", e.g. "iphone-17-pro-max-86086"
        const parts = decoded.split('-');
        const maybeId = parts[parts.length - 1];
        const idNum = Number(maybeId);
        return Number.isFinite(idNum) && idNum > 0 ? idNum : null;
    }, [slug]);

    const [productData, setProductData] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        if (!productId) {
            setIsLoading(false);
            setError('Invalid product.');
            return;
        }

        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError('');
            try {
                const res = await getProductById(productId);
                const payload = res?.data || res;
                if (!payload || !payload.id) {
                    throw new Error('Product not found');
                }

                const p = payload;

                const variantItems = Array.isArray(p.imeis)
                    ? p.imeis.map((i) => {
                        const baseRetail = Number(p.retails_price || 0);
                        const priceNumber = Number(i.sale_price || baseRetail || 0);
                        const oldPriceNumber = priceNumber < baseRetail && baseRetail > 0 ? baseRetail : null;
                        return {
                            id: i.id,
                            storage: i.storage || null,
                            color: i.color || null,
                            colorHex: i.color_code || null,
                            region: i.region || null,
                            inStock: i.in_stock === 1,
                            priceNumber,
                            oldPriceNumber,
                            image: i.image_path || null,
                        };
                    })
                    : [];

                const defaultVariant =
                    variantItems.find((v) => v.inStock) ||
                    variantItems[0] ||
                    null;

                const basePrice = defaultVariant
                    ? defaultVariant.priceNumber
                    : Number(p.retails_price || 0);

                const discountValue = Number(p.discount || 0);
                const discountType = String(p.discount_type || '').toLowerCase();
                const hasDiscount = discountValue > 0 && discountType !== '0';

                const price = hasDiscount
                    ? discountType === 'percentage'
                        ? Math.max(0, Math.round(basePrice * (1 - discountValue / 100)))
                        : Math.max(0, basePrice - discountValue)
                    : basePrice;

                const discountLabel = hasDiscount
                    ? discountType === 'percentage'
                        ? `-${discountValue}%`
                        : `৳ ${discountValue.toLocaleString('en-IN')}`
                    : null;

                const images =
                    (Array.isArray(p.images) && p.images.length > 0 && p.images) ||
                    (Array.isArray(p.imei_image) && p.imei_image.filter(Boolean)) ||
                    (p.image_path ? [p.image_path] : []) ||
                    ['/no-image.svg'];

                const storageOptions = Array.from(
                    new Set(
                        (Array.isArray(p.imeis) ? p.imeis : [])
                            .map((i) => i.storage)
                            .filter(Boolean)
                    )
                );

                const colorMap = new Map();
                (Array.isArray(p.imeis) ? p.imeis : [])
                    .filter((i) => i.color)
                    .forEach((i) => {
                        const existing = colorMap.get(i.color);
                        const hex = i.color_code || existing?.hex || null;
                        colorMap.set(i.color, {
                            name: i.color,
                            hex,
                        });
                    });

                const colorOptions = Array.from(
                    Array.from(colorMap.values()).map((c) => ({
                        name: c.name,
                        hex: c.hex || '#e5e7eb',
                    }))
                );

                const regionOptions = Array.from(
                    new Set(
                        (Array.isArray(p.imeis) ? p.imeis : [])
                            .map((i) => i.region)
                            .filter(Boolean)
                    )
                );

                const variants =
                    storageOptions.length || colorOptions.length || regionOptions.length
                        ? {
                              storage: storageOptions,
                              colors: colorOptions,
                              regions: regionOptions,
                          }
                        : null;

                const specs = `
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Brand:</strong> ${p.brand_name || 'N/A'}</li>
                        <li><strong>Base price:</strong> ৳ ${Number(p.retails_price || basePrice || 0).toLocaleString('en-IN')}</li>
                        <li><strong>Status:</strong> ${p.status || 'N/A'}</li>
                        <li><strong>Current stock:</strong> ${p.current_stock ?? 'N/A'}</li>
                        ${variants?.storage?.length ? `<li><strong>Storage options:</strong> ${variants.storage.join(', ')}</li>` : ''}
                    </ul>
                `;

                const mappedProduct = {
                    id: p.id,
                    name: p.name,
                    price: `৳ ${price.toLocaleString('en-IN')}`,
                    oldPrice: hasDiscount
                        ? `৳ ${Number(p.retails_price || basePrice || 0).toLocaleString('en-IN')}`
                        : defaultVariant?.oldPriceNumber
                            ? `৳ ${defaultVariant.oldPriceNumber.toLocaleString('en-IN')}`
                            : null,
                    discount: discountLabel,
                    images,
                    variants,
                    variantsMatrix: variantItems,
                    description: p.description || '',
                    specifications: specs,
                };

                if (!cancelled) {
                    setProductData(mappedProduct);
                    setMainImage(images[0] || '/no-image.svg');
                }

                // Load related products (best effort)
                try {
                    const relatedRes = await getRelatedProduct(p.id);
                    const relatedPayload = relatedRes?.data || relatedRes;
                    const relatedItems = Array.isArray(relatedPayload?.data)
                        ? relatedPayload.data
                        : Array.isArray(relatedPayload)
                        ? relatedPayload
                        : [];

                    if (!cancelled) {
                        const mappedRelated = relatedItems.map((rp) => {
                            const inStockImeisR = Array.isArray(rp.imeis)
                                ? rp.imeis.filter((i) => i.in_stock === 1)
                                : [];
                            const baseR = inStockImeisR.length
                                ? Math.min(...inStockImeisR.map((i) => Number(i.sale_price || 0)))
                                : Number(rp.retails_price || 0);
                            return {
                                id: rp.id,
                                name: rp.name,
                                price: `৳ ${baseR.toLocaleString('en-IN')}`,
                                oldPrice: null,
                                discount: null,
                                imageUrl:
                                    rp.image_path ||
                                    rp.image_path1 ||
                                    rp.image_path2 ||
                                    '/no-image.svg',
                            };
                        });
                        setRelatedProducts(mappedRelated.slice(0, 8));
                    }
                } catch {
                    // ignore related errors
                }
            } catch (err) {
                console.error('Failed to load product details', err);
                if (!cancelled) {
                    setError('Failed to load product details.');
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [productId]);

    const productName =
        productData?.name ||
        (slug
            ? decodeURIComponent(slug)
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (ch) => ch.toUpperCase())
            : 'Product');

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Breadcrumb Header */}
            <div className="border-b border-gray-100 bg-gray-50/50 py-3 md:py-4 mb-6 md:mb-10">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-[11px] md:text-sm text-gray-500 flex items-center gap-2">
                        <span className="hover:text-[#1a3b34] cursor-pointer">Home</span> /
                        <span className="hover:text-[#1a3b34] cursor-pointer">Shop</span> /
                        <span className="text-brand-red font-semibold capitalize truncate">{productName}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* 2-Column Top Layout */}
                {isLoading ? (
                    <div className="py-10 text-sm text-gray-500">Loading product details…</div>
                ) : error || !productData ? (
                    <div className="py-10 text-sm text-red-500">{error || 'Product not found.'}</div>
                ) : (
                    <>
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* Col 1: Gallery (40% on Desktop, 50% iPad) */}
                    <div className="w-full md:w-1/2 lg:w-[40%] shrink-0">
                        <ProductGallery
                            images={productData.images}
                            mainImage={mainImage}
                            onChangeMainImage={setMainImage}
                        />
                    </div>

                    {/* Col 2: Info (60% on Desktop, 50% iPad) */}
                    <div className="w-full md:w-1/2 lg:w-[60%]">
                        <ProductInfo
                            product={productData}
                            onVariantImageChange={(img) => {
                                if (img) {
                                    setMainImage(img);
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Bottom: Tabs */}
                <ProductTabs
                    description={productData.description}
                    specifications={productData.specifications}
                />

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 md:mt-24 pt-12 border-t border-gray-200">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a3b34] mb-8 text-center md:text-left">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
                    </>
                )}
            </div>
        </div>
    );
}
