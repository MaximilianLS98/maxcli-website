import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SiteLayout from '../components/layout/SiteLayout';

const NotFound = () => {
	const location = useLocation();

	useEffect(() => {
		console.error('404 Error: User attempted to access non-existent route:', location.pathname);
	}, [location.pathname]);

	return (
		<SiteLayout>
			<section className='relative isolate flex min-h-[80vh] items-center justify-center px-6 pt-24'>
				<div className='bg-grid absolute inset-0 -z-10' />
				<div className='absolute left-1/2 top-1/3 -z-10 h-72 w-[500px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-[100px]' />
				<div className='w-full max-w-xl text-center'>
					<p className='font-mono text-8xl font-bold tracking-tighter text-gradient'>404</p>
					<div className='mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0e] text-left font-mono text-sm'>
						<div className='flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5'>
							<span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
							<span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
							<span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
						</div>
						<div className='space-y-1 p-4'>
							<div className='truncate text-zinc-200'>
								<span className='text-primary'>❯</span> max open {location.pathname}
							</div>
							<div className='text-rose-300'>❌ Error: Page '{location.pathname}' is not available.</div>
							<div className='text-zinc-500'>💡 Try 'max --help' or head back home.</div>
						</div>
					</div>
					<Button asChild size='lg' className='mt-8 rounded-xl font-semibold'>
						<Link to='/'>
							<ArrowLeft size={18} />
							Return home
						</Link>
					</Button>
				</div>
			</section>
		</SiteLayout>
	);
};

export default NotFound;
