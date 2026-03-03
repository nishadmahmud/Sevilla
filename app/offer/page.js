import Image from "next/image";
import Link from "next/link";
import { getOffersFromServer } from "../../lib/api";

export const metadata = {
  title: "Special Offers | sevilla",
};

export default async function OfferPage() {
  let offers = [];

  try {
    const res = await getOffersFromServer();
    const data = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
    offers = data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to load offers", err);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-10">
          <p className="text-xs text-gray-400 mb-2">
            <Link href="/" className="hover:text-brand-red font-medium">
              Home
            </Link>{" "}
            / <span className="text-brand-red font-semibold">Special Offers</span>
          </p>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Special <span className="text-brand-red">Offers</span>
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl">
            Discover the latest combo deals and limited-time promotions curated just for you.
          </p>
        </header>

        {offers.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center text-center">
            <p className="text-gray-700 font-semibold text-lg mb-1">No active offers right now</p>
            <p className="text-gray-400 text-sm">
              Please check back soon or explore our{" "}
              <Link href="/shop" className="text-brand-red font-semibold hover:underline">
                full collection
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8">
            {offers.map((offer) => (
              <article
                key={offer.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-72 aspect-16/10 md:aspect-square bg-gray-100">
                  <Image
                    src={offer.image || "/no-image.svg"}
                    alt={offer.title || "Special offer"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 p-5 md:p-7 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg md:text-xl font-extrabold text-gray-900">
                      {offer.title || "Special Offer"}
                    </h2>
                    <span className="text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-brand-red border border-red-100">
                      LIMITED
                    </span>
                  </div>

                  {offer.description && (
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {offer.description}
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    {offer.brand_id && (
                      <span className="px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100 text-gray-500">
                        Brand ID: {offer.brand_id}
                      </span>
                    )}
                    {offer.created_at && (
                      <span>
                        Starts from{" "}
                        {new Date(offer.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {offer.url ? (
                      <Link
                        href={offer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold bg-brand-red text-white hover:bg-[#ff1a2b] shadow-md shadow-brand-red/30 transition-colors"
                      >
                        View Offer
                      </Link>
                    ) : (
                      <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold bg-brand-red text-white hover:bg-[#ff1a2b] shadow-md shadow-brand-red/30 transition-colors"
                      >
                        Shop Now
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

