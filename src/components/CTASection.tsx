import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InstallCommand from './InstallCommand';
import Reveal from './Reveal';

const highlights = [
	{ value: '< 30s', label: 'Installation time', detail: 'Get up and running instantly' },
	{ value: 'max update', label: 'Self-updating', detail: 'Pull the latest release from GitHub' },
	{ value: '100%', label: 'Open source', detail: 'Read, fork and extend it' },
];

const CTASection = () => (
	<section className='relative py-28'>
		<div className='mx-auto max-w-6xl px-6'>
			<Reveal>
				<div className='relative isolate overflow-hidden rounded-3xl border border-white/10 bg-card/70 px-6 py-16 text-center sm:px-16'>
					<div className='bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]' />
					<div className='absolute -top-32 left-1/2 -z-10 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]' />
					<div className='absolute -bottom-32 right-0 -z-10 h-64 w-[400px] rounded-full bg-accent/20 blur-[100px]' />
					<div className='hairline absolute inset-x-12 top-0 h-px' />

					<h2 className='text-gradient mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl'>
						Ready to build your ultimate CLI?
					</h2>
					<p className='mx-auto mt-5 max-w-xl text-lg text-muted-foreground'>
						Install in seconds, enable what you need, and contribute on GitHub.
					</p>

					<InstallCommand className='mx-auto mt-10 max-w-2xl' />
					<p className='mt-3 font-mono text-xs text-muted-foreground'>
						✅ Installation complete! Run{' '}
						<span className='text-primary'>max --help</span> to get started.
					</p>

					<div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
						<Button
							asChild
							size='lg'
							className='h-12 rounded-xl px-6 text-base font-semibold shadow-[0_0_40px_-8px_hsl(var(--primary)/0.7)]'>
							<Link to='/docs#installation'>
								Installation guide
								<ArrowRight size={18} />
							</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='h-12 rounded-xl border-white/10 bg-white/[0.03] px-6 text-base hover:bg-white/[0.07]'>
							<Link to='/docs'>
								<BookOpen size={18} />
								View documentation
							</Link>
						</Button>
					</div>

					<div className='mt-14 grid gap-4 border-t border-white/[0.06] pt-10 sm:grid-cols-3'>
						{highlights.map((item) => (
							<div key={item.label}>
								<div className='font-mono text-2xl font-bold text-primary'>
									{item.value}
								</div>
								<div className='mt-1 font-medium'>{item.label}</div>
								<div className='mt-1 text-sm text-muted-foreground'>
									{item.detail}
								</div>
							</div>
						))}
					</div>
				</div>
			</Reveal>
		</div>
	</section>
);

export default CTASection;
