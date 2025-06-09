
import React from 'react';
import HeroSection from '../components/HeroSection';
import ModularitySpotlight from '../components/ModularitySpotlight';
import FeatureShowcase from '../components/FeatureShowcase';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <ModularitySpotlight />
      <FeatureShowcase />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
