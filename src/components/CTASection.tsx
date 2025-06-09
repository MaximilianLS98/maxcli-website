import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, Settings, Download } from 'lucide-react';

const CTASection = () => {
	return (
		<section className='py-24 bg-gradient-to-r from-purple-900/20 via-gray-900 to-green-900/20'>
			<div className='max-w-6xl mx-auto px-6 text-center'>
				<div className='mb-12'>
					<h2 className='text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-white to-green-400 bg-clip-text text-transparent'>
						Ready to Build Your Ultimate CLI?
					</h2>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
						Install in seconds. Contribute on GitHub. Join thousands of developers
						who've taken control of their command-line experience.
					</p>
				</div>

				{/* Installation Preview */}
				<div className='bg-gray-800 rounded-xl border border-gray-700 p-8 mb-12 max-w-3xl mx-auto overflow-hidden'>
					<div className='text-left'>
						<div className='flex items-center gap-2 mb-4'>
							<div className='w-3 h-3 bg-red-500 rounded-full'></div>
							<div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
							<div className='w-3 h-3 bg-green-500 rounded-full'></div>
							<span className='text-gray-400 ml-4 text-sm'>Quick Install</span>
						</div>

						<div className='space-y-3 font-mono text-sm sm:text-base overflow-x-auto'>
							<div className='text-gray-400'># Install MaxCLI</div>
							<div className='text-green-400 break-all sm:break-normal whitespace-pre-wrap'>
								$ curl -sSL https://raw.githubusercontent.com/maxcli/install.sh |
								bash
							</div>
							<div className='text-gray-400'># Or with npm</div>
							<div className='text-green-400 break-all sm:break-normal'>
								$ npm install -g @maxcli/core
							</div>
							<div className='text-gray-300 mt-4 break-words'>
								✅ Installation complete! Run 'maxcli --help' to get started.
							</div>
						</div>
					</div>
				</div>

				{/* CTA Buttons */}
				<div className='flex flex-col sm:flex-row items-center justify-center gap-6 mb-16'>
					<Button className='bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25'>
						<Download size={20} className='mr-2' />
						Installation Guide
						<ArrowRight size={20} className='ml-2' />
					</Button>

					<Button
						variant='outline'
						className='border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105'>
						<Book size={20} className='mr-2' />
						View Documentation
					</Button>

					<Button
						variant='outline'
						className='border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105'>
						<Settings size={20} className='mr-2' />
						Customize Modules
					</Button>
				</div>

				{/* Trust Indicators */}
				<div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
					<div className='bg-gray-800/50 rounded-lg border border-gray-700 p-6'>
						<div className='text-3xl font-bold text-green-400 mb-2'>&lt; 30s</div>
						<div className='text-gray-300'>Installation Time</div>
						<div className='text-sm text-gray-400 mt-2'>
							Get up and running instantly
						</div>
					</div>

					<div className='bg-gray-800/50 rounded-lg border border-gray-700 p-6'>
						<div className='text-3xl font-bold text-purple-400 mb-2'>100%</div>
						<div className='text-gray-300'>Open Source</div>
						<div className='text-sm text-gray-400 mt-2'>Apache 2.0 License</div>
					</div>

					<div className='bg-gray-800/50 rounded-lg border border-gray-700 p-6'>
						<div className='text-3xl font-bold text-blue-400 mb-2'>24/7</div>
						<div className='text-gray-300'>Community Support</div>
						<div className='text-sm text-gray-400 mt-2'>Active GitHub discussions</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
