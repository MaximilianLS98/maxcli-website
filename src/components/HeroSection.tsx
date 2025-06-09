import React from 'react';
import { Button } from '@/components/ui/button';
import { GitBranch, Terminal, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
	return (
		<section className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden'>
			{/* Background grid pattern */}
			<div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'></div>

			{/* Terminal cursor animation */}
			<div className='absolute top-20 left-20 text-green-400 animate-pulse'>
				<Terminal size={24} />
			</div>

			<div className='relative z-10 text-center max-w-6xl mx-auto px-6 mt-4'>
				{/* Badge */}
				<div className='inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8'>
					<GitBranch size={16} className='text-purple-400' />
					<span className='text-purple-300 text-sm font-medium'>
						Open Source • Apache 2.0
					</span>
				</div>

				{/* Main headline */}
				<h1 className='text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-green-300 to-green-400 bg-clip-text text-transparent leading-tight'>
					MaxCLI
				</h1>

				<p className='text-2xl md:text-3xl text-gray-300 mb-4 font-light'>
					Customize Your Command-Line Experience
				</p>

				<p className='text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed'>
					The open-source, modular toolkit that adapts to{' '}
					<em className='text-green-400 font-semibold'>your</em> workflow – enable only
					what you need.
				</p>

				{/* Terminal demo */}
				<div className='bg-gray-800 rounded-lg border border-gray-700 p-6 mb-12 max-w-2xl mx-auto font-mono text-left overflow-hidden'>
					<div className='flex items-center gap-2 mb-4'>
						<div className='w-3 h-3 bg-red-500 rounded-full'></div>
						<div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
						<div className='w-3 h-3 bg-green-500 rounded-full'></div>
						<span className='text-gray-400 ml-4 text-sm'>Terminal</span>
					</div>
					<div className='space-y-2 text-sm sm:text-base overflow-x-auto'>
						<div className='text-green-400'>$ maxcli --help</div>
						<div className='text-gray-300 break-words'>
							MaxCLI v2.0 - Your Modular Command-Line Powerhouse
						</div>
						<div className='text-gray-300 break-words'>
							Available modules: ssh, docker, gcp, coolify, setup, misc
						</div>
						<div className='text-green-400 flex items-center gap-2'>
							$<span className='w-2 h-5 bg-green-400 animate-pulse'></span>
						</div>
					</div>
				</div>

				{/* CTA Buttons */}
				<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
					<Button className='bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25'>
						Get Started
						<ArrowRight size={20} className='ml-2' />
					</Button>

					<Button
						asChild
						variant='outline'
						className='border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105'>
						<Link to='/docs'>
							<BookOpen size={20} className='mr-2' />
							Documentation
						</Link>
					</Button>

					<Button
						variant='outline'
						className='border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105'>
						<GitBranch size={20} className='mr-2' />
						GitHub Repo
					</Button>
				</div>

				{/* Stats */}
				<div className='flex items-center justify-center gap-8 mt-16 text-gray-400'>
					<div className='text-center'>
						<div className='text-2xl font-bold text-white'>7+</div>
						<div className='text-sm'>Modules</div>
					</div>
					<div className='w-px h-8 bg-gray-600'></div>
					<div className='text-center'>
						<div className='text-2xl font-bold text-white'>100%</div>
						<div className='text-sm'>Open Source</div>
					</div>
					<div className='w-px h-8 bg-gray-600'></div>
					<div className='text-center'>
						<div className='text-2xl font-bold text-white'>0</div>
						<div className='text-sm'>Bloat</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
