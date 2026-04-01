import Hero from "../components/Hero/Hero";
import TrustStats from "../components/TrustStats/TrustStats";
import RepairServices from "../components/RepairServices/RepairServices";
import RepairPricing from "../components/RepairPricing/RepairPricing";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import ShopCategories from "../components/ShopCategories/ShopCategories";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import HomeBanners from "../components/Banners/HomeBanners";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import BestDeals from "../components/BestDeals/BestDeals";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import BlogTips from "../components/BlogTips/BlogTips";
import CTABanner from "../components/CTABanner/CTABanner";
import { getBannerFromServer, getBestDealsFromServer, getBestSellersFromServer, getBlogs, getCategoriesFromServer, getNewArrivalsFromServer, getSlidersFromServer } from "../lib/api";

export default async function Home() {
  let categories = [];
  let newArrivals = [];
  let heroSlides = [];
  let bestDealsProducts = [];
  let bestDealsCards = [];
  let flashSaleProducts = [];
  let featuredProducts = [];
  let blogPosts = [];
  let homeBanners = [];

  const toMoney = (v) => `৳ ${Number(v || 0).toLocaleString("en-IN")}`;
  const normalizeDiscount = (discount, type) => {
    const d = Number(discount || 0);
    if (!d || d <= 0) return null;
    return String(type).toLowerCase() === "percentage"
      ? `-${d}%`
      : `৳ ${d.toLocaleString("en-IN")}`;
  };
  try {
    const res = await getCategoriesFromServer();
    if (res?.success && res?.data) {
      categories = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  try {
    const res = await getNewArrivalsFromServer();
    const items = res?.success ? res?.data?.data : null;
    if (Array.isArray(items)) {
      newArrivals = items.slice(0, 10).map((p) => {
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';

        const originalPrice = Number(p.retails_price || 0);
        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;

        return {
          id: p.id,
          name: p.name,
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
          imageUrl:
            p.image_path ||
            p.image_path1 ||
            p.image_path2 ||
            p.image_url ||
            "/no-image.svg",
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch new arrivals:", error);
  }

  try {
    const res = await getBestDealsFromServer();
    const items = res?.success ? res?.data : null;
    if (Array.isArray(items)) {
      bestDealsProducts = items.map((p) => {
        const originalPrice = Number(p.retails_price || 0);
        const discountedPrice = Number(p.discounted_price || originalPrice || 0);
        const hasDiscount = discountedPrice > 0 && discountedPrice < originalPrice;

        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;

        return {
          id: p.id,
          name: p.name,
          price: toMoney(discountedPrice || originalPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue || p.discount_rate, discountType) : null,
          imageUrl:
            p.image_path ||
            p.image_url ||
            "/no-image.svg",
          _raw: p,
        };
      });

      // BestDeals section: first 2 products
      bestDealsCards = bestDealsProducts.slice(0, 2).map((pp, idx) => {
        const p = pp._raw || {};
        const originalPrice = Number(p.retails_price || 0);
        const discountedPrice = Number(p.discounted_price || originalPrice || 0);
        const savingsValue = Math.max(0, originalPrice - discountedPrice);

        const badge = pp.discount || (idx === 0 ? "BEST DEAL" : "HOT DEAL");
        const descParts = [];
        if (p.brands?.name) descParts.push(p.brands.name);
        if (p.status) descParts.push(p.status);
        if (savingsValue > 0) descParts.push(`Save ৳ ${savingsValue.toLocaleString("en-IN")}`);

        const slugName = pp.name ? pp.name.toLowerCase().replace(/\s+/g, "-") : "product";
        const slugWithId = pp.id ? `${slugName}-${pp.id}` : slugName;

        return {
          id: pp.id,
          title: pp.name,
          description: descParts.join(" • ") || "Limited time offer.",
          price: pp.price,
          oldPrice: pp.oldPrice,
          savings: savingsValue > 0 ? `Save ৳ ${savingsValue.toLocaleString("en-IN")}` : null,
          imageUrl: pp.imageUrl,
          badge,
          link: `/product/${slugWithId}`,
        };
      });

      // Flash sale: use the same API items (all)
      flashSaleProducts = bestDealsProducts;
    }
  } catch (error) {
    console.error("Failed to fetch best deals:", error);
  }

  try {
    const res = await getBestSellersFromServer();
    const items = res?.success ? res?.data : null;
    if (Array.isArray(items)) {
      featuredProducts = items.map((p) => {
        const originalPrice = Number(p.retails_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount =
          discountValue > 0 && String(discountType || "").toLowerCase() !== "0";

        const discountedPrice = hasDiscount
          ? String(discountType).toLowerCase() === "percentage"
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue)
          : originalPrice;

      return {
          id: p.id,
          name: p.name,
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
          imageUrl:
            p.image_path ||
            p.image_url ||
            "/no-image.svg",
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch best sellers:", error);
  }

  try {
    const res = await getBlogs();
    const items = res?.success ? res?.data : null;
    if (Array.isArray(items)) {
      blogPosts = items.map((b) => {
        const rawHtml = b.description || "";
        const text = rawHtml
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        const excerpt =
          text.length > 140 ? `${text.slice(0, 140).trimEnd()}…` : text;

        return {
          id: b.id,
          title: b.title,
          excerpt,
          imageUrl: b.image || "/no-image.svg",
          category: "Blog",
          readTime: "2 min read",
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  // Banners
  try {
    const res = await getBannerFromServer();
    const items = res?.success ? res?.data : null;
    if (Array.isArray(items)) {
      homeBanners = items;
    }
  } catch (error) {
    console.error("Failed to fetch banners:", error);
  }
  try {
    const sliderRes = await getSlidersFromServer();
    const sliderItems = Array.isArray(sliderRes?.sliders)
      ? sliderRes.sliders
      : Array.isArray(sliderRes?.data)
      ? sliderRes.data
      : [];

    heroSlides = sliderItems
      .filter((s) => s?.image_path && Number(s?.status ?? 1) === 1)
      .map((s) => {
        const rawLink = typeof s.link === "string" ? s.link.trim() : "";
        const ctaLink = rawLink
          ? /^https?:\/\//i.test(rawLink)
            ? rawLink
            : `https://${rawLink}`
          : "/";

        return {
          id: s.id,
          title: s.title || "Slide",
          ctaLink,
          imageUrl: s.image_path,
        };
      });
  } catch (error) {
    console.error("Failed to fetch sliders:", error);
  }

  const bannerPair1 = homeBanners.slice(0, 2);
  const bannerPair2 = homeBanners.slice(2, 4);

  return (
    <>
      <Hero slides={heroSlides} />
      <TrustStats />
      {/* <RepairServices /> */}
      {/* <RepairPricing /> */}

      <ShopCategories categories={categories} flashSaleProducts={flashSaleProducts} />
      <NewArrivals products={newArrivals} />
      <HomeBanners banners={bannerPair1} />
      <FeaturedProducts products={featuredProducts} />
      {bannerPair2.length > 0 && <HomeBanners banners={bannerPair2} />}
      <BestDeals deals={bestDealsCards} />

      <HowItWorks />
      <Testimonials />
      <FAQ />
      <BlogTips posts={blogPosts.slice(0, 3)} />
      <CTABanner />
    </>
  );
}


