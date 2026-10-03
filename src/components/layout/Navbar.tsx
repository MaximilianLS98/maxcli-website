import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Menu, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GITHUB_URL, NAV_LINKS } from '@/lib/site';
import { useLatestVersion } from '@/hooks/useGitHubReleases';
import { useGitHubRepo } from '@/hooks/useGitHubRepo';
import Logo from '../Logo';

const Navbar = () => {
	const location = useLocation();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const { data: latestVersion } = useLatestVersion();
	const { data: repo } = useGitHubRepo();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => setOpen(false), [location.pathname, location.hash]);

	const isActive = (to: string) =>
		to.startsWith('/#') ? false : location.pathname.startsWith(to);

	return (
		<header
			className={cn(
				'fixed inset-x-0 top-0 z-50 transition-all duration-300',
				scrolled || open
					? 'border-b border-white/[0.06] bg-background/75 backdrop-blur-xl'
					: 'border-b border-transparent',
			)}>
			<nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
				<div className='flex items-center gap-8'>
					<Link to='/' aria-label='MaxCLI home'>
						<Logo />
					</Link>
					{latestVersion && (
						<Link
							to='/changelog'
							className='hidden rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary sm:inline-block'>
							{latestVersion}
						</Link>
					)}
				</div>

				<div className='hidden items-center gap-1 md:flex'>
					{NAV_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={cn(
								'rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground',
								isActive(link.to) ? 'text-foreground' : 'text-muted-foreground',
							)}>
							{link.label}
						</Link>
					))}
					<a
						href={GITHUB_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='ml-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.06]'>
						<Github size={15} />
						GitHub
						{repo && (
							<span className='flex items-center gap-1 border-l border-white/10 pl-2 text-muted-foreground'>
								<Star size={12} className='fill-yellow-400/80 text-yellow-400' />
								{repo.stargazers_count}
							</span>
						)}
					</a>
				</div>

				<button
					type='button'
					className='inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground md:hidden'
					onClick={() => setOpen((prev) => !prev)}
					aria-label={open ? 'Close menu' : 'Open menu'}
					aria-expanded={open}>
					{open ? <X size={20} /> : <Menu size={20} />}
				</button>
			</nav>

			{open && (
				<div className='border-t border-white/[0.06] px-6 pb-6 pt-2 md:hidden'>
					{NAV_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className='block rounded-md px-2 py-3 text-muted-foreground hover:text-foreground'>
							{link.label}
						</Link>
					))}
					<a
						href={GITHUB_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='mt-2 flex items-center gap-2 rounded-md px-2 py-3 text-muted-foreground hover:text-foreground'>
						<Github size={16} />
						GitHub
					</a>
				</div>
			)}
		</header>
	);
};

export default Navbar;
