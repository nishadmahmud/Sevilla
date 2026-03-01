import Hero from "../components/Hero/Hero";
import TrustStats from "../components/TrustStats/TrustStats";
import RepairServices from "../components/RepairServices/RepairServices";
import RepairPricing from "../components/RepairPricing/RepairPricing";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import ShopCategories from "../components/ShopCategories/ShopCategories";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import DiscountedParts from "../components/DiscountedParts/DiscountedParts";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import BestDeals from "../components/BestDeals/BestDeals";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import BlogTips from "../components/BlogTips/BlogTips";
import CTABanner from "../components/CTABanner/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      {/* <RepairServices /> */}
      {/* <RepairPricing /> */}

      <ShopCategories />
      <NewArrivals />
      <DiscountedParts />
      <FeaturedProducts />
      <BestDeals />

      <HowItWorks />
      <Testimonials />
      <FAQ />
      <BlogTips />
      <CTABanner />
    </>
  );
}
