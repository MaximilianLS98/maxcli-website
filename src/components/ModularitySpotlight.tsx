import React, { useState } from 'react';
import { Check, Shield, Zap, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { buildInstallCommand } from '@/lib/site';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { MODULES, ACCENT_STYLES, MODULE_PRESETS, getInitialToggleState } from '../data/modules';
import { ModuleToggleState } from '../types/modules';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const features = [
	{
		icon: <Check className='h-4 w-4' />,
		title: 'Enable or disable anytime',
		text: 'max modules enable / disable — no reinstall needed.',
	},
	{
		icon: <Zap className='h-4 w-4' />,
		title: 'Zero bloat',
		text: 'Only enabled modules are loaded, so the CLI stays fast and focused.',
	},
	{
		icon: <Shield className='h-4 w-4' />,
		title: 'Open source',
		text: 'Read the code, fork it, or write your own module in plain Python.',
	},
];

const ModularitySpotlight = () => {
	const [modules, setModules] = useState<ModuleToggleState>(getInitialToggleState());
	const { copied, copy } = useCopyToClipboard();

	const selected = MODULES.filter((module) => modules[module.key]);
	const command = buildInstallCommand(selected.map((module) => module.moduleId));
	const activePreset = MODULE_PRESETS.find(
		(preset) =>
			preset.modules.length === selected.length &&
			preset.modules.every((key) => modules[key]),
	);

	const toggleModule = (moduleKey: string) => {
		setModules((prev) => ({ ...prev, [moduleKey]: !prev[moduleKey] }));
	};

	const applyPreset = (keys: string[]) => {
		setModules(
			MODULES.reduce((acc, module) => {
				acc[module.key] = keys.includes(module.key);
				return acc;
			}, {} as ModuleToggleState),
		);
	};

	return (
		<section id='configure' className='relative scroll-mt-20 py-28'>
			<div className='absolute inset-x-0 top-1/2 -z-10 h-[500px] -translate-y-1/2 bg-gradient-to-r from-accent/[0.06] via-transparent to-primary/[0.06] blur-3xl' />
			<div className='mx-auto max-w-7xl px-6'>
				<SectionHeading
					eyebrow='Configure'
					title='Your CLI, your rules'
					description='Pick the modules you want and get a ready-to-run install command. Change your mind later with a single command.'
				/>

				<div className='grid gap-8 lg:grid-cols-[1.15fr_1fr]'>
					{/* Module picker */}
					<Reveal>
						<div className='rounded-2xl border border-white/[0.07] bg-card/70 p-5 backdrop-blur sm:p-6'>
							<div className='mb-5 flex flex-wrap items-center gap-2'>
								<span className='mr-1 text-sm text-muted-foreground'>Presets</span>
								{MODULE_PRESETS.map((preset) => (
									<button
										key={preset.name}
										type='button'
										onClick={() => applyPreset(preset.modules)}
										className={cn(
											'rounded-full border px-3 py-1 text-xs transition-colors',
											activePreset?.name === preset.name
												? 'border-primary/40 bg-primary/10 text-primary'
												: 'border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground',
										)}>
										{preset.name}
									</button>
								))}
								<button
									type='button'
									onClick={() => setModules(getInitialToggleState())}
									className='ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground'
									aria-label='Reset to defaults'>
									<RotateCcw size={12} />
									Reset
								</button>
							</div>

							<div className='grid gap-2 sm:grid-cols-2'>
								{MODULES.map((module) => {
									const enabled = modules[module.key];
									const accent = ACCENT_STYLES[module.accent];
									return (
										<label
											key={module.key}
											className={cn(
												'flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all',
												enabled
													? 'border-white/[0.12] bg-white/[0.04]'
													: 'border-white/[0.05] bg-transparent opacity-70 hover:opacity-100',
											)}>
											<span
												className={cn(
													'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
													enabled
														? cn(accent.bg, accent.border, accent.text)
														: 'border-white/10 text-muted-foreground',
												)}>
												{module.icon}
											</span>
											<span className='min-w-0 flex-1'>
												<span className='block truncate text-sm font-medium'>
													{module.name}
												</span>
												<span className='block truncate font-mono text-[11px] text-muted-foreground'>
													{module.moduleId}
												</span>
											</span>
											<Switch
												checked={enabled}
												onCheckedChange={() => toggleModule(module.key)}
												aria-label={`Toggle ${module.name}`}
											/>
										</label>
									);
								})}
							</div>
						</div>
					</Reveal>

					{/* Output + features */}
					<div className='flex min-w-0 flex-col gap-6'>
						<Reveal delay={0.1}>
							<div className='overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0e]'>
								<div className='flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5'>
									<div className='flex items-center gap-2'>
										<span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
										<span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
										<span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
										<span className='ml-2 font-mono text-xs text-zinc-500'>
											install.sh
										</span>
									</div>
									<span className='font-mono text-xs text-muted-foreground'>
										{selected.length}/{MODULES.length} modules
									</span>
								</div>
								<pre className='min-h-[132px] p-4 font-mono text-[13px] leading-relaxed'>
									<code className='break-all text-zinc-300'>
										<span className='select-none text-primary'>$ </span>
										{command}
									</code>
								</pre>
								<div className='flex items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3'>
									<p className='text-xs text-muted-foreground'>
										{selected.length === 0
											? 'No modules selected: the installer will ask you.'
											: 'Already installed? Use max modules enable.'}
									</p>
									<button
										type='button'
										onClick={() => copy(command)}
										className='inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90'>
										{copied ? 'Copied!' : 'Copy command'}
									</button>
								</div>
							</div>
						</Reveal>

						<div className='space-y-3'>
							{features.map((feature, index) => (
								<Reveal key={feature.title} delay={0.15 + index * 0.08}>
									<div className='flex items-start gap-4 rounded-xl border border-white/[0.06] bg-card/40 p-4'>
										<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
											{feature.icon}
										</div>
										<div>
											<p className='font-medium'>{feature.title}</p>
											<p className='mt-0.5 text-sm text-muted-foreground'>
												{feature.text}
											</p>
										</div>
									</div>
								</Reveal>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ModularitySpotlight;
