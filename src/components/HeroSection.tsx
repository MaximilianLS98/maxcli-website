import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Github, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GITHUB_URL } from '@/lib/site';
import { useLatestVersion } from '@/hooks/useGitHubReleases';
import { MODULES } from '../data/modules';
import HeroTerminal from './HeroTerminal';
import InstallCommand from './InstallCommand';

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, delay, ease: EASE },
});

const stats = [
	{ value: `${MODULES.length}`, label: 'Modules' },
	{ value: '< 30s', label: 'Install time' },
	{ value: '100%', label: 'Open source' },
	{ value: '0', label: 'Bloat' },
];

const HeroSection = () => {
	const { data: latestVersion } = useLatestVersion();

	return (
		<section className='relative isolate overflow-hidden pb-24 pt-32 sm:pt-40'>
			{/* Background */}
			<div className='bg-grid absolute inset-0 -z-10' />
			<div className='absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.12] blur-[120px]' />
			<div className='absolute -right-40 top-40 -z-10 h-[400px] w-[500px] rounded-full bg-accent/[0.12] blur-[120px]' />

			<div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.05fr_1fr]'>
				<div className='min-w-0 text-center lg:text-left'>
					<motion.div {...fadeUp(0)}>
						<Link
							to='/changelog'
							className='group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary/40'>
							<span className='inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary'>
								<Sparkles size={12} />
								{latestVersion ?? 'New'}
							</span>
							Open source modular CLI
							<ArrowRight
								size={14}
								className='transition-transform group-hover:translate-x-0.5'
							/>
						</Link>
					</motion.div>

					<motion.h1
						{...fadeUp(0.08)}
						className='mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl'>
						<span className='text-gradient'>Customize your</span>
						<br />
						<span className='text-gradient-brand'>command line.</span>
					</motion.h1>

					<motion.p
						{...fadeUp(0.16)}
						className='mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0 sm:text-xl'>
						MaxCLI is the open-source, modular toolkit that adapts to{' '}
						<em className='font-semibold not-italic text-foreground'>your</em> workflow.
						SSH, Docker, Kubernetes, GCP and more, behind one{' '}
						<code className='rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.9em] text-primary'>
							max
						</code>{' '}
						command. Enable only what you need.
					</motion.p>

					<motion.div {...fadeUp(0.24)} className='mx-auto mt-10 max-w-xl lg:mx-0'>
						<InstallCommand />
					</motion.div>

					<motion.div
						{...fadeUp(0.32)}
						className='mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center'>
						<Button
							asChild
							size='lg'
							className='h-12 rounded-xl px-6 text-base font-semibold shadow-[0_0_40px_-8px_hsl(var(--primary)/0.7)] transition-all hover:shadow-[0_0_50px_-6px_hsl(var(--primary)/0.9)]'>
							<Link to='/docs#installation'>
								Get started
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
								Documentation
							</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='ghost'
							className='h-12 rounded-xl px-5 text-base text-muted-foreground hover:bg-white/[0.05] hover:text-foreground'>
							<a href={GITHUB_URL} target='_blank' rel='noopener noreferrer'>
								<Github size={18} />
								GitHub
							</a>
						</Button>
					</motion.div>

					<motion.dl
						{...fadeUp(0.4)}
						className='mx-auto mt-14 grid max-w-xl grid-cols-4 divide-x divide-white/[0.06] lg:mx-0'>
						{stats.map((stat) => (
							<div key={stat.label} className='px-2 text-center first:pl-0 lg:text-left lg:px-5'>
								<dt className='sr-only'>{stat.label}</dt>
								<dd className='font-mono text-2xl font-bold text-foreground'>
									{stat.value}
								</dd>
								<dd className='mt-1 text-xs text-muted-foreground sm:text-sm'>
									{stat.label}
								</dd>
							</div>
						))}
					</motion.dl>
				</div>

				<motion.div
					className='min-w-0'
					initial={{ opacity: 0, y: 30, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
					<HeroTerminal />
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
