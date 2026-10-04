import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Navbar from './Navbar';
import Footer from '../Footer';

/**
 * Scroll to the element referenced by the URL hash after client-side navigation,
 * or to the top of the page when there is no hash.
 */
const useScrollToHash = () => {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (!hash) {
			window.scrollTo({ top: 0 });
			return;
		}
		// Wait a frame so the target page has rendered
		const frame = requestAnimationFrame(() => {
			document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
		});
		return () => cancelAnimationFrame(frame);
	}, [pathname, hash]);
};

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
	useScrollToHash();

	return (
		<MotionConfig reducedMotion='user'>
			<div className='relative min-h-screen overflow-x-clip bg-background text-foreground'>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</div>
		</MotionConfig>
	);
};

export default SiteLayout;
