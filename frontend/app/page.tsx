import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import Features from "@/components/landing/Features";
import DashboardShowcase from "@/components/landing/DashboardShowcase";
import Workflow from "@/components/landing/Workflow";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white selection:bg-[#FF2D2D] selection:text-white">
      <Hero />
      <TrustedBy />
      <Features />
      <DashboardShowcase />
      <Workflow />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ThemeToggle />
    </main>
  );
}
