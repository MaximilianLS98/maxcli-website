import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Heart, Star } from 'lucide-react';
import { GITHUB_URL } from '@/lib/site';
import { useLatestVersion } from '@/hooks/useGitHubReleases';
import { useGitHubRepo } from '@/hooks/useGitHubRepo';
import Logo from './Logo';

const columns = [
	{
		title: 'Product',
		links: [
			{ label: 'Modules', to: '/#modules' },
			{ label: 'Configure', to: '/#configure' },
			{ label: 'Changelog', to: '/changelog' },
		],
	},
	{
		title: 'Docs',
		links: [
			{ label: 'Installation', to: '/docs#installation' },
			{ label: 'Configuration', to: '/docs#configuration' },
			{ label: 'Troubleshooting', to: '/docs#troubleshooting' },
			{ label: 'Custom modules', to: '/docs#development' },
		],
	},
	{
		title: 'Community',
		links: [
			{ label: 'GitHub', href: GITHUB_URL },
			{ label: 'Issues', href: `${GITHUB_URL}/issues` },
			{ label: 'Releases', href: `${GITHUB_URL}/releases` },
			{ label: 'Contributing', to: '/docs#development' },
		],
	},
];

const badges = ['Python', 'macOS', 'Modular', 'Zero Bloat'];

const Footer = () => {
	const { data: latestVersion } = useLatestVersion();
	const { data: repo } = useGitHubRepo();

	return (
		<footer className='relative border-t border-white/[0.06] bg-black/20'>
			<div className='hairline absolute inset-x-0 top-0 h-px opacity-50' />
			<div className='mx-auto max-w-7xl px-6 py-16'>
				<div className='grid gap-12 md:grid-cols-5'>
					<div className='md:col-span-2'>
						<Logo className='text-xl' />
						<p className='mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground'>
							The modular command-line powerhouse that adapts to your workflow. Built
							by developers, for developers.
						</p>
						<a
							href={GITHUB_URL}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm transition-colors hover:border-white/20 hover:bg-white/[0.06]'>
							<Github size={16} />
							Star on GitHub
							{repo && (
								<span className='flex items-center gap-1 border-l border-white/10 pl-2 text-muted-foreground'>
									<Star size={12} className='fill-yellow-400/80 text-yellow-400' />
									{repo.stargazers_count}
								</span>
							)}
						</a>
						<div className='mt-6 flex flex-wrap gap-2'>
							{badges.map((badge) => (
								<span
									key={badge}
									className='rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground'>
									{badge}
								</span>
							))}
						</div>
					</div>

					{columns.map((column) => (
						<div key={column.title}>
							<h3 className='text-sm font-semibold'>{column.title}</h3>
							<ul className='mt-4 space-y-3 text-sm text-muted-foreground'>
								{column.links.map((link) => (
									<li key={link.label}>
										{'href' in link ? (
											<a
												href={link.href}
												target='_blank'
												rel='noopener noreferrer'
												className='transition-colors hover:text-primary'>
												{link.label}
											</a>
										) : (
											<Link
												to={link.to}
												className='transition-colors hover:text-primary'>
												{link.label}
											</Link>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className='mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-sm text-muted-foreground md:flex-row'>
					<p>
						© {new Date().getFullYear()} MaxCLI. Built with{' '}
						<Heart size={13} className='mx-0.5 inline fill-red-400/80 text-red-400' /> by
						the open source community.
					</p>
					<div className='flex items-center gap-4'>
						<span>Made for DevOps Engineers & Power Users</span>
						{latestVersion && (
							<>
								<span className='h-4 w-px bg-white/10' />
								<Link
									to='/changelog'
									className='font-mono text-primary hover:underline'>
									{latestVersion}
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
