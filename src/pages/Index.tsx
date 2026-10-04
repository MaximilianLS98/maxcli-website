import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import FeatureShowcase from '../components/FeatureShowcase';
import ModularitySpotlight from '../components/ModularitySpotlight';
import CTASection from '../components/CTASection';

const Index = () => {
	return (
		<SiteLayout>
			<HeroSection />
			<HowItWorks />
			<FeatureShowcase />
			<ModularitySpotlight />
			<CTASection />
		</SiteLayout>
	);
};

export default Index;
