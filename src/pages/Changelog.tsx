import React from 'react';
import { AlertCircle, Calendar, Download, ExternalLink, GitBranch, Github, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { GITHUB_URL } from '@/lib/site';
import { useGitHubReleases } from '@/hooks/useGitHubReleases';
import SiteLayout from '../components/layout/SiteLayout';
import Reveal from '../components/Reveal';

const TYPE_STYLES: Record<string, string> = {
	major: 'border-rose-500/25 bg-rose-500/10 text-rose-300',
	minor: 'border-primary/25 bg-primary/10 text-primary',
	patch: 'border-violet-500/25 bg-violet-500/10 text-violet-300',
};

/**
 * Render the small subset of markdown used in release notes: **bold**, `code` and links.
 * GitHub PR / compare URLs are shortened to "#4" / "v0.8.2...v0.8.3".
 */
const renderInline = (text: string) =>
	text.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/\S+)/g).map((part, index) => {
		if (part.startsWith('**') && part.endsWith('**')) {
			return (
				<strong key={index} className='font-semibold text-foreground'>
					{part.slice(2, -2)}
				</strong>
			);
		}
		if (part.startsWith('`') && part.endsWith('`')) {
			return (
				<code key={index} className='rounded bg-white/[0.06] px-1 py-0.5 text-[0.9em] text-primary'>
					{part.slice(1, -1)}
				</code>
			);
		}
		if (/^https?:\/\//.test(part)) {
			const label =
				part.match(/\/pull\/(\d+)/)?.[1]?.replace(/^/, '#') ??
				part.match(/\/compare\/(.+)$/)?.[1] ??
				part.replace(/^https?:\/\//, '');
			return (
				<a
					key={index}
					href={part}
					target='_blank'
					rel='noopener noreferrer'
					className='text-primary underline-offset-2 hover:underline'>
					{label}
				</a>
			);
		}
		return part;
	});

const LoadingState = () => (
	<div className='space-y-8'>
		{[0, 1, 2].map((item) => (
			<div key={item} className='flex gap-6'>
				<Skeleton className='h-3 w-3 shrink-0 translate-y-2 rounded-full bg-white/10' />
				<div className='flex-1 space-y-3 rounded-2xl border border-white/[0.07] bg-card/60 p-6'>
					<Skeleton className='h-6 w-40 bg-white/10' />
					<Skeleton className='h-4 w-64 bg-white/[0.06]' />
					<Skeleton className='h-4 w-full bg-white/[0.06]' />
					<Skeleton className='h-4 w-3/4 bg-white/[0.06]' />
				</div>
			</div>
		))}
	</div>
);

const ErrorMessage = ({ error, onRetry }: { error: Error; onRetry: () => void }) => (
	<div className='mx-auto max-w-md rounded-2xl border border-rose-500/25 bg-card/60 p-8 text-center'>
		<AlertCircle className='mx-auto mb-4 h-8 w-8 text-rose-400' />
		<h3 className='mb-2 text-lg font-semibold'>Failed to load releases</h3>
		<p className='mb-6 text-sm text-muted-foreground'>
			{error.message || 'Unable to fetch releases from GitHub. Please try again.'}
		</p>
		<div className='flex justify-center gap-2'>
			<Button onClick={onRetry} variant='outline' size='sm' className='border-white/10 bg-transparent'>
				Try again
			</Button>
			<Button asChild variant='outline' size='sm' className='border-primary/30 bg-transparent text-primary'>
				<a href={`${GITHUB_URL}/releases`} target='_blank' rel='noopener noreferrer'>
					View on GitHub
					<ExternalLink size={14} />
				</a>
			</Button>
		</div>
	</div>
);

const Changelog = () => {
	const { data: releases, isLoading, error, refetch } = useGitHubReleases();

	return (
		<SiteLayout>
			<div className='relative isolate overflow-hidden border-b border-white/[0.06] pb-12 pt-32'>
				<div className='bg-grid absolute inset-0 -z-10' />
				<div className='absolute right-1/4 top-0 -z-10 h-72 w-[600px] rounded-full bg-accent/10 blur-[100px]' />
				<div className='mx-auto max-w-4xl px-6'>
					<div className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary'>
						<GitBranch size={14} />
						Changelog
					</div>
					<h1 className='text-gradient mt-4 text-4xl font-bold tracking-tight sm:text-5xl'>
						What&apos;s new in MaxCLI
					</h1>
					<p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
						Track updates and improvements, pulled live from GitHub releases. Update
						anytime with <code className='rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.9em] text-primary'>max update</code>.
					</p>
				</div>
			</div>

			<div className='mx-auto max-w-4xl px-6 py-14'>
				{isLoading && <LoadingState />}
				{error && <ErrorMessage error={error} onRetry={() => refetch()} />}

				{releases && releases.length > 0 && (
					<ol className='relative space-y-8'>
						<div className='absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-primary/60 via-white/10 to-transparent' />
						{releases.map((release) => (
							<li key={release.version} className='relative flex gap-6'>
								<span
									className={cn(
										'relative mt-7 h-3 w-3 shrink-0 rounded-full border-2',
										release.isLatest
											? 'border-primary bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.8)]'
											: 'border-white/20 bg-background',
									)}
								/>
								<Reveal className='min-w-0 flex-1'>
									<article
										className={cn(
											'rounded-2xl border bg-card/60 p-6 transition-colors hover:border-white/[0.14]',
											release.isLatest ? 'border-primary/25' : 'border-white/[0.07]',
										)}>
										<header className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
											<div className='min-w-0'>
												<div className='flex flex-wrap items-center gap-2'>
													<h2 className='font-mono text-xl font-semibold'>
														{release.version}
													</h2>
													<span
														className={cn(
															'rounded-full border px-2 py-0.5 text-[11px] font-medium',
															TYPE_STYLES[release.type],
														)}>
														{release.type}
													</span>
													{release.isLatest && (
														<span className='rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground'>
															Latest
														</span>
													)}
												</div>
												{release.description !== release.version && (
													<p className='mt-2 text-zinc-300'>{release.description}</p>
												)}
												<div className='mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
													<span className='flex items-center gap-1.5'>
														<Calendar size={14} />
														{new Date(release.date).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'long',
															day: 'numeric',
														})}
													</span>
													{release.downloads > 0 && (
														<span className='flex items-center gap-1.5'>
															<Download size={14} />
															{release.downloads.toLocaleString()} downloads
														</span>
													)}
												</div>
											</div>
											<a
												href={release.htmlUrl}
												target='_blank'
												rel='noopener noreferrer'
												className='inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-white/10 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground'>
												<Tag size={14} />
												Release
												<ExternalLink size={12} />
											</a>
										</header>

										<ul className='mt-5 space-y-2 border-t border-white/[0.06] pt-5'>
											{release.changes.map((change, index) => (
												<li key={index} className='flex items-start gap-3 text-sm'>
													<span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-primary' />
													<span
														className={
															change.toLowerCase().includes('breaking')
																? 'text-rose-300'
																: 'text-zinc-300'
														}>
														{renderInline(change)}
													</span>
												</li>
											))}
										</ul>
									</article>
								</Reveal>
							</li>
						))}
					</ol>
				)}

				{releases && releases.length === 0 && (
					<p className='py-12 text-center text-muted-foreground'>
						No releases found for this repository.
					</p>
				)}

				<Reveal>
					<div className='relative mt-16 overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-8 text-center'>
						<div className='absolute -top-20 left-1/2 -z-0 h-40 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
						<div className='relative'>
							<h3 className='text-xl font-semibold'>Stay updated</h3>
							<p className='mt-2 text-muted-foreground'>
								Watch the GitHub repository to get notified about new releases.
							</p>
							<div className='mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row'>
								<Button asChild variant='outline' className='rounded-xl border-white/10 bg-white/[0.03]'>
									<a href={GITHUB_URL} target='_blank' rel='noopener noreferrer'>
										<Github size={16} />
										Watch on GitHub
									</a>
								</Button>
								<Button asChild className='rounded-xl font-semibold'>
									<a href={GITHUB_URL} target='_blank' rel='noopener noreferrer'>
										<Star size={16} />
										Star repository
									</a>
								</Button>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</SiteLayout>
	);
};

export default Changelog;
