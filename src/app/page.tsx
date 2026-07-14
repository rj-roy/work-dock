import BrowseByCategorySection from "@/components/home/BrowseByCategory";
import CTASection from "@/components/home/CTA";
import FeaturedSpacesSection from "@/components/home/FeaturedSpaces";
import HeroSection from "@/components/home/HeroSecion";
import HowItWorksSection from "@/components/home/HowItWorks";
import NewsletterSection from "@/components/home/NewsLater";
import StatsSection from "@/components/home/Stats";
import StatsBanner from "@/components/home/StatsBanner";
import TestimonialsSection from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-indigo-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <HeroSection />
      <StatsSection />
      <FeaturedSpacesSection />
      <BrowseByCategorySection />
      <HowItWorksSection />
      <StatsBanner />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </main>
  );
}