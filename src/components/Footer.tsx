import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Star, Users, Heart, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='bg-gray-900 border-t border-gray-800 py-16'>
			<div className='max-w-7xl mx-auto px-6'>
				{/* Main Footer Content */}
				<div className='grid md:grid-cols-4 gap-12 mb-12'>
					{/* Brand Section */}
					<div className='md:col-span-2'>
						<div className='flex items-center gap-3 mb-4'>
							<Terminal className='w-8 h-8 text-green-400' />
							<span className='text-2xl font-bold'>MaxCLI</span>
						</div>
						<p className='text-gray-400 mb-6 leading-relaxed max-w-md'>
							The modular command-line powerhouse that adapts to your workflow. Built
							by developers, for developers.
						</p>

						{/* GitHub Stats */}
						<div className='flex items-center gap-4'>
							<Button
								variant='outline'
								className='border-gray-600 hover:bg-gray-800 h-10'>
								<GitBranch size={16} className='mr-2' />
								View on GitHub
							</Button>

							<div className='flex items-center gap-2'>
								<Star size={16} className='text-yellow-400' />
								<span className='text-sm text-gray-400'>1.2k stars</span>
							</div>

							<div className='flex items-center gap-2'>
								<Users size={16} className='text-blue-400' />
								<span className='text-sm text-gray-400'>89 contributors</span>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='font-semibold text-white mb-4'>Resources</h3>
						<ul className='space-y-3 text-gray-400'>
							<li>
								<Link to='/docs' className='hover:text-green-400 transition-colors'>
									Documentation
								</Link>
							</li>
							<li>
								<a href='#' className='hover:text-green-400 transition-colors'>
									Installation Guide
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-green-400 transition-colors'>
									Module Registry
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-green-400 transition-colors'>
									Contributing
								</a>
							</li>
							<li>
								<Link
									to='/changelog'
									className='hover:text-green-400 transition-colors'>
									Changelog
								</Link>
							</li>
						</ul>
					</div>

					{/* Community */}
					<div>
						<h3 className='font-semibold text-white mb-4'>Community</h3>
						<ul className='space-y-3 text-gray-400'>
							<li>
								<a href='#' className='hover:text-green-400 transition-colors'>
									GitHub Discussions
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-green-400 transition-colors'>
									Discord Server
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-green-400 transition-colors'>
									Twitter
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-green-400 transition-colors'>
									Stack Overflow
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-green-400 transition-colors'>
									Reddit
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Badges Row */}
				<div className='flex flex-wrap items-center gap-4 py-8 border-t border-gray-800'>
					<Badge variant='outline' className='border-green-500 text-green-400'>
						Apache 2.0 License
					</Badge>
					<Badge variant='outline' className='border-blue-500 text-blue-400'>
						TypeScript
					</Badge>
					<Badge variant='outline' className='border-purple-500 text-purple-400'>
						Cross-Platform
					</Badge>
					<Badge variant='outline' className='border-orange-500 text-orange-400'>
						Zero Dependencies
					</Badge>
				</div>

				{/* Bottom Row */}
				<div className='flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800'>
					<div className='text-gray-400 text-sm mb-4 md:mb-0'>
						© 2024 MaxCLI. Built with{' '}
						<Heart size={14} className='inline text-red-400 mx-1' /> by the open source
						community.
					</div>

					<div className='flex items-center gap-6 text-sm text-gray-400'>
						<span>Made for DevOps Engineers & Power Users</span>
						<div className='w-px h-4 bg-gray-600'></div>
						<span className='text-green-400'>v2.0.1</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
