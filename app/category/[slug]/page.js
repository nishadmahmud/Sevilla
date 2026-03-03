import { getCategoriesFromServer } from '../../../lib/api';
import CategoryPageClient from '../../../components/Category/CategoryPageClient';

// Force dynamic rendering so searchParams.page is always read fresh
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return {
        title: `Category — sevilla`,
        description: `Browse all products in this category.`,
    };
}

/**
 * Maps a raw API product to the shape expected by CategoryProductCard
 */
function mapProduct(p) {
    const inStockImeis = p.imeis?.filter(i => i.in_stock === 1) || [];
    const price = inStockImeis.length > 0
        ? Math.min(...inStockImeis.map(i => i.sale_price))
        : (p.retails_price || 0);

    const discount = p.discount && Number(p.discount) > 0
        ? (p.discount_type === 'Percentage' ? `-${p.discount}%` : `৳ ${p.discount}`)
        : null;

    const oldPrice = discount ? `৳ ${p.retails_price?.toLocaleString('en-IN')}` : null;
    const imageUrl = p.image_path || p.image_path1 || p.image_path2 || '';

    return {
        id: p.id,
        name: p.name,
        price: `৳ ${price.toLocaleString('en-IN')}`,
        oldPrice,
        discount,
        imageUrl,
        brand: p.brand_name || '',
        stock: p.current_stock || 0,
        status: p.status || 'Unknown',
        inStockImeis: inStockImeis.length,
    };
}

export default async function CategoryPage({ params, searchParams }) {
    // Next 16: `params` / `searchParams` can be Promises in dynamic routes.
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const rawSlug = resolvedParams.slug;
    const currentPage = Math.max(1, parseInt(resolvedSearchParams?.page || '1', 10));

    let categoryId = rawSlug; // fallback: use whatever came in
    let categoryName = 'Category';
    let products = [];
    let brandFilters = {};
    let priceRange = { min: 0, max: 0 };
    let pagination = { total: 0, current_page: 1, last_page: 1, per_page: 20 };

    // First, resolve the real numeric category_id and human name
    try {
        const catRes = await getCategoriesFromServer();
        if (catRes?.success && Array.isArray(catRes.data)) {
            const normalize = (val) =>
                val
                    ? String(val)
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-')
                    : '';

            const slugLower = String(rawSlug).toLowerCase();

            const found = catRes.data.find((c) =>
                // direct numeric match
                String(c.category_id) === String(rawSlug) ||
                String(c.id) === String(rawSlug) ||
                // slug-style match against the category name
                normalize(c.name) === slugLower
            );

            if (found) {
                categoryId = found.category_id ?? found.id ?? categoryId;
                if (found.name) {
                    categoryName = found.name;
                }
            }
        }
    } catch (err) {
        console.error('Failed to resolve category from slug:', err);
    }

    try {
        // Cache each (categoryId, page) for 60s to speed up pagination.
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${categoryId}?page=${currentPage}`,
            { next: { revalidate: 60 } }
        );
        const data = await res.json();

        if (data?.success && Array.isArray(data.data)) {
            // Sort: in-stock first, then out-of-stock
            products = data.data
                .map(mapProduct)
                .sort((a, b) => b.stock - a.stock);

            brandFilters = data.filter_options?.brands || {};
            priceRange = data.filter_options?.price_range || { min: 0, max: 0 };
            pagination = data.pagination
                || { total: products.length, current_page: currentPage, last_page: 1, per_page: 20 };
        }
    } catch (err) {
        console.error('Failed to fetch category products:', err);
    }

    return (
        <CategoryPageClient
            initialProducts={products}
            categoryName={categoryName}
            brandFilters={brandFilters}
            priceRange={priceRange}
            pagination={{ ...pagination, current_page: currentPage }}
            categoryId={categoryId}
        />
    );
}
