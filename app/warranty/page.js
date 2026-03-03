import Link from "next/link";

export const metadata = {
  title: "Warranty & Service Policy",
};

export default function WarrantyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-10">
          <p className="text-xs text-gray-400 mb-2">
            <Link href="/" className="hover:text-brand-red font-medium">
              Home
            </Link>{" "}
            /{" "}
            <span className="text-brand-red font-semibold">
              Warranty &amp; Service Policy
            </span>
          </p>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Warranty &amp; Service Policy
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl">
            Summary of how warranties, repairs and after‑sales service are
            handled for your purchases from this store.
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8 space-y-5 text-sm md:text-base text-gray-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-bold text-gray-900">
              Standard Manufacturer Warranty
            </h2>
            <p>
              All products sold through this store follow the official warranty
              terms of their respective manufacturer or brand. Warranty coverage
              period, parts, and service eligibility may vary between brands and
              product types.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-900">Warranty Eligibility</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Warranty is valid only for purchases made from this official
                store.
              </li>
              <li>
                A valid invoice is required for claiming any warranty or
                after‑sales support.
              </li>
              <li>
                Physical damage, liquid damage, burn marks, or unauthorized
                modifications are not covered.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-900">How to Claim Service</h2>
            <p>
              To request warranty service, please contact us through the{" "}
              <Link
                href="/contact"
                className="text-brand-red font-semibold hover:underline"
              >
                contact page
              </Link>{" "}
              with your invoice number, product name, and a short description of
              the issue. Our support team will guide you to the nearest service
              point or help arrange inspection.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-900">Additional Notes</h2>
            <p>
              This page is a general summary. For specific models, campaigns or
              extended warranty offers, please refer to the product description
              or ask our team before purchasing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

