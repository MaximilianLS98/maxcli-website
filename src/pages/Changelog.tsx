import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	ArrowLeft,
	Calendar,
	Download,
	GitBranch,
	Star,
	Loader2,
	AlertCircle,
	ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGitHubReleases } from '@/hooks/useGitHubReleases';

const getTypeColor = (type: string) => {
	switch (type) {
		case 'major':
			return 'bg-red-500/20 text-red-400 border-red-500/30';
		case 'minor':
			return 'bg-green-500/20 text-green-400 border-green-500/30';
		case 'patch':
			return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
		default:
			return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
	}
};

const LoadingSpinner = () => (
	<div className='flex items-center justify-center py-12'>
		<div className='text-center'>
			<Loader2 className='w-8 h-8 animate-spin text-green-400 mx-auto mb-4' />
			<p className='text-gray-400'>Loading releases from GitHub...</p>
		</div>
	</div>
);

const ErrorMessage = ({ error, onRetry }: { error: Error; onRetry: () => void }) => (
	<div className='flex items-center justify-center py-12'>
		<div className='text-center bg-gray-800 border border-red-500/30 rounded-lg p-8 max-w-md'>
			<AlertCircle className='w-8 h-8 text-red-400 mx-auto mb-4' />
			<h3 className='text-lg font-semibold text-white mb-2'>Failed to Load Releases</h3>
			<p className='text-gray-300 mb-4 text-sm'>
				{error.message || 'Unable to fetch releases from GitHub. Please try again.'}
			</p>
			<div className='flex gap-2 justify-center'>
				<Button
					onClick={onRetry}
					variant='outline'
					size='sm'
					className='border-gray-600 text-white hover:bg-gray-700'>
					Try Again
				</Button>
				<Button
					asChild
					variant='outline'
					size='sm'
					className='border-green-500/30 text-green-400 hover:bg-green-500/10'>
					<a
						href='https://github.com/MaximilianLS98/MaxCLI/releases'
						target='_blank'
						rel='noopener noreferrer'>
						View on GitHub
						<ExternalLink className='w-4 h-4 ml-1' />
					</a>
				</Button>
			</div>
		</div>
	</div>
);

const Changelog = () => {
	const { data: releases, isLoading, error, refetch } = useGitHubReleases();

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			{/* Header */}
			<header className='border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60'>
				<div className='max-w-6xl mx-auto px-6 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<Link to='/'>
								<Button
									variant='ghost'
									size='sm'
									className='text-gray-400 hover:text-white hover:bg-gray-800'>
									<ArrowLeft size={16} className='mr-2' />
									Back to Home
								</Button>
							</Link>
							<div>
								<h1 className='text-2xl font-bold text-white'>Changelog</h1>
								<p className='text-gray-400'>
									Track MaxCLI updates and improvements
								</p>
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<GitBranch size={16} className='text-green-400' />
							<span className='text-sm text-gray-400'>GitHub Releases</span>
						</div>
					</div>
				</div>
			</header>

			{/* Content */}
			<main className='max-w-4xl mx-auto px-6 py-12'>
				{isLoading && <LoadingSpinner />}

				{error && <ErrorMessage error={error} onRetry={() => refetch()} />}

				{releases && releases.length > 0 && (
					<div className='space-y-12'>
						{releases.map((release, index) => (
							<div key={release.version} className='relative'>
								{/* Timeline Line */}
								{index < releases.length - 1 && (
									<div className='absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-green-400/50 to-gray-700'></div>
								)}

								<div className='flex gap-6'>
									{/* Timeline Dot */}
									<div className='flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center hover:bg-green-500/30 transition-colors'>
										<Star size={20} className='text-green-400' />
									</div>

									{/* Release Content */}
									<div className='flex-1 bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/80 transition-colors'>
										{/* Release Header */}
										<div className='flex items-start justify-between mb-4'>
											<div>
												<div className='flex items-center gap-3 mb-2'>
													<h2 className='text-xl font-semibold text-white'>
														{release.version}
													</h2>
													<Badge
														className={`${getTypeColor(release.type)} border`}>
														{release.type}
													</Badge>
													{release.isLatest && (
														<Badge className='bg-green-500/20 text-green-400 border-green-500/30'>
															Latest
														</Badge>
													)}
												</div>
												<p className='text-gray-300 mb-1'>
													{release.description}
												</p>
												<div className='flex items-center gap-4 text-sm text-gray-400'>
													<div className='flex items-center gap-1'>
														<Calendar
															size={14}
															className='text-green-400'
														/>
														{new Date(release.date).toLocaleDateString(
															'en-US',
															{
																year: 'numeric',
																month: 'long',
																day: 'numeric',
															},
														)}
													</div>
													<div className='flex items-center gap-1'>
														<Download
															size={14}
															className='text-green-400'
														/>
														{release.downloads.toLocaleString()}{' '}
														downloads
													</div>
												</div>
											</div>

											<Button
												asChild
												variant='outline'
												size='sm'
												className='border-gray-600 text-white hover:bg-gray-700 hover:text-white'>
												<a
													href={release.htmlUrl}
													target='_blank'
													rel='noopener noreferrer'>
													<Download size={14} className='mr-2' />
													View Release
													<ExternalLink size={12} className='ml-1' />
												</a>
											</Button>
										</div>

										{/* Changes List */}
										<div>
											<h3 className='font-medium mb-3 text-white'>
												What's Changed
											</h3>
											<ul className='space-y-2'>
												{release.changes.map((change, changeIndex) => (
													<li
														key={changeIndex}
														className='flex items-start gap-2 text-sm'>
														<span className='text-green-400 mt-1.5'>
															•
														</span>
														<span
															className={
																change.includes('Breaking:') ||
																change
																	.toLowerCase()
																	.includes('breaking')
																	? 'text-red-400'
																	: 'text-gray-300'
															}>
															{change}
														</span>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{releases && releases.length === 0 && (
					<div className='text-center py-12'>
						<p className='text-gray-400'>No releases found for this repository.</p>
					</div>
				)}

				{/* Footer CTA */}
				<div className='mt-16 text-center bg-gray-800 border border-gray-700 rounded-lg p-8'>
					<h3 className='text-lg font-semibold mb-2 text-white'>Stay Updated</h3>
					<p className='text-gray-300 mb-4'>
						Follow our GitHub repository to get notified about new releases
					</p>
					<div className='flex items-center justify-center gap-4'>
						<Button
							asChild
							variant='outline'
							className='border-gray-600 text-white hover:bg-gray-700 hover:text-white'>
							<a
								href='https://github.com/MaximilianLS98/MaxCLI'
								target='_blank'
								rel='noopener noreferrer'>
								<GitBranch size={16} className='mr-2' />
								Watch on GitHub
								<ExternalLink size={12} className='ml-1' />
							</a>
						</Button>
						<Button asChild className='bg-green-500 hover:bg-green-600 text-black'>
							<a
								href='https://github.com/MaximilianLS98/MaxCLI'
								target='_blank'
								rel='noopener noreferrer'>
								<Star size={16} className='mr-2' />
								Star Repository
								<ExternalLink size={12} className='ml-1' />
							</a>
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Changelog;
