import Link from "next/link";
import Image from "next/image";
import { getCategoriesFromServer } from "../../lib/api";

export const metadata = {
  title: "Shop All Products",
};

export default async function ShopPage() {
  let categories = [];

  try {
    const res = await getCategoriesFromServer();
    if (res?.success && Array.isArray(res.data)) {
      categories = res.data;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to load categories for shop page", err);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-10">
          <p className="text-xs text-gray-400 mb-2">
            <Link href="/" className="hover:text-brand-red font-medium">
              Home
            </Link>{" "}
            / <span className="text-brand-red font-semibold">Shop</span>
          </p>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Shop All Products
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl">
            Browse by category and jump directly into the products you are
            looking for.
          </p>
        </header>

        {categories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
            <p className="text-gray-700 font-semibold text-lg mb-1">
              Categories not available
            </p>
            <p className="text-gray-400 text-sm">
              Please try again later or explore our{" "}
              <Link
                href="/offer"
                className="text-brand-red font-semibold hover:underline"
              >
                Special Offers
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.category_id || cat.id}
                href={`/category/${cat.category_id || cat.id}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-brand-red/40 transition-all duration-300 flex flex-col"
              >
                <div className="relative w-full h-28 md:h-32 bg-gray-100 overflow-hidden">
                  <Image
                    src={
                      cat.image_url ||
                      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop"
                    }
                    alt={cat.name}
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 md:p-4 flex flex-col gap-1">
                  <h2 className="text-xs md:text-sm font-extrabold text-gray-900 group-hover:text-brand-red transition-colors">
                    {cat.name}
                  </h2>
                  {typeof cat.products_count === "number" && (
                    <p className="text-[10px] md:text-xs text-gray-500">
                      {cat.products_count} products
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

