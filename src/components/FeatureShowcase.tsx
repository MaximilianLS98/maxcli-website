import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { MODULES, getEnabledModules, getDisabledModules } from '../data/modules';

const FeatureShowcase = () => {
	const [copiedCommands, setCopiedCommands] = useState<string[]>([]);

	const copyToClipboard = async (text: string, commandId: string) => {
		await navigator.clipboard.writeText(text);
		setCopiedCommands((prev) => [...prev, commandId]);
		setTimeout(() => {
			setCopiedCommands((prev) => prev.filter((id) => id !== commandId));
		}, 2000);
	};

	return (
		<section className='py-24 bg-gray-900'>
			<div className='max-w-7xl mx-auto px-6'>
				<div className='text-center mb-16'>
					<h2 className='text-5xl font-bold mb-6'>
						Powerful Modules
						<span className='block text-3xl text-green-400 font-normal mt-2'>
							(Enable Any Combo)
						</span>
					</h2>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
						Each module is purpose-built for specific workflows. Mix and match to create
						your perfect CLI experience.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{MODULES.map((module, index) => (
						<div
							key={module.name}
							className={`group relative bg-gray-800 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
								module.enabled
									? 'border-green-500/30 hover:border-green-500/50'
									: 'border-gray-600 hover:border-gray-500 opacity-75'
							}`}>
							{/* Header */}
							<div className='p-6 border-b border-gray-700'>
								<div className='flex items-center justify-between mb-3'>
									<div className='flex items-center gap-3'>
										<div
											className={`${module.color} p-2 rounded-lg text-white`}>
											{module.icon}
										</div>
										<h3 className='text-xl font-semibold'>{module.name}</h3>
									</div>

									<Badge
										variant={module.enabled ? 'default' : 'secondary'}
										className={`${
											module.enabled
												? 'bg-green-500 text-black hover:bg-green-600'
												: 'bg-gray-600 text-gray-300'
										}`}>
										{module.enabled ? 'Enabled' : 'Disabled'}
									</Badge>
								</div>

								<p className='text-gray-300 text-sm leading-relaxed'>
									{module.description}
								</p>
							</div>

							{/* Commands */}
							<div className='p-6'>
								<div className='text-sm text-gray-400 mb-3 font-medium'>
									Key Commands:
								</div>
								<div className='space-y-2'>
									{module.commands.map((command, cmdIndex) => {
										const commandId = `${module.name}-${cmdIndex}`;
										const isCopied = copiedCommands.includes(commandId);

										return (
											<div
												key={cmdIndex}
												className='flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors overflow-hidden'>
												<code className='text-green-400 font-mono text-xs sm:text-sm break-all flex-1 mr-2'>
													max {command}
												</code>

												<Button
													size='sm'
													variant='ghost'
													className='h-6 w-6 p-0 hover:bg-gray-700 flex-shrink-0'
													onClick={() =>
														copyToClipboard(
															`maxcli ${command}`,
															commandId,
														)
													}>
													{isCopied ? (
														<Check
															size={12}
															className='text-green-400'
														/>
													) : (
														<Copy size={12} className='text-gray-400' />
													)}
												</Button>
											</div>
										);
									})}
								</div>
							</div>

							{/* Disabled overlay */}
							{!module.enabled && (
								<div className='absolute inset-0 bg-gray-900/50 rounded-xl flex items-center justify-center'>
									<div className='text-center'>
										<div className='text-2xl mb-2'>🔒</div>
										<div className='text-sm text-gray-400'>
											Disabled by default
										</div>
										<Button
											size='sm'
											className='mt-3 bg-green-500 hover:bg-green-600 text-black'>
											Enable Module
										</Button>
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Module Stats */}
				<div className='mt-16 text-center'>
					<div className='inline-flex items-center gap-4 sm:gap-8 bg-gray-800 rounded-xl border border-gray-700 px-4 sm:px-8 py-4 max-w-full overflow-hidden'>
						<div className='text-center min-w-0'>
							<div className='text-xl sm:text-2xl font-bold text-green-400'>
								{getEnabledModules().length}
							</div>
							<div className='text-xs sm:text-sm text-gray-400'>Enabled</div>
						</div>
						<div className='w-px h-6 sm:h-8 bg-gray-600 flex-shrink-0'></div>
						<div className='text-center min-w-0'>
							<div className='text-xl sm:text-2xl font-bold text-gray-400'>
								{getDisabledModules().length}
							</div>
							<div className='text-xs sm:text-sm text-gray-400'>Disabled</div>
						</div>
						<div className='w-px h-6 sm:h-8 bg-gray-600 flex-shrink-0'></div>
						<div className='text-center min-w-0'>
							<div className='text-xl sm:text-2xl font-bold text-purple-400'>∞</div>
							<div className='text-xs sm:text-sm text-gray-400'>Possibilities</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeatureShowcase;
