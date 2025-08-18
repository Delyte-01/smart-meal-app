import Footer from '@/component/footer'
import Header from '@/component/header'
import BenefitSection from '@/features/benefit'
import CTA from '@/features/cta-section'
import FeatureSection from '@/features/feature'
import Hero from '@/features/hero'
import { StatsPage } from '@/features/stats'
import Testimonial from '@/features/testimonial'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      {/* Your Content/Components */}
      <Header />
      <Hero />
      <StatsPage />
      <FeatureSection />
      <BenefitSection />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}

export default HomePage