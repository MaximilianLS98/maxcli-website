import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { MODULES, ACCENT_STYLES, CATEGORY_LABELS } from '../data/modules';
import { ModuleConfig, ModuleCategory } from '../types/modules';
import CopyButton from './CopyButton';
import SectionHeading from './SectionHeading';

const categories = Array.from(new Set(MODULES.map((module) => module.category)));

const ModuleCard = ({ module }: { module: ModuleConfig }) => {
	const accent = ACCENT_STYLES[module.accent];

	// Spotlight that follows the cursor
	const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
		event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
	};

	return (
		<div
			onMouseMove={onMouseMove}
			style={{ '--glow': accent.glow } as React.CSSProperties}
			className='group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14]'>
			<div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--x)_var(--y),var(--glow),transparent_60%)]' />

			<div className='relative p-6'>
				<div className='flex items-start justify-between gap-3'>
					<div
						className={cn(
							'flex h-11 w-11 items-center justify-center rounded-xl border',
							accent.bg,
							accent.border,
							accent.text,
						)}>
						{module.icon}
					</div>
					<div className='flex flex-wrap justify-end gap-1.5'>
						{module.status === 'wip' && (
							<span className='rounded-full border border-yellow-500/25 bg-yellow-500/10 px-2 py-0.5 text-[11px] font-medium text-yellow-300'>
								WIP
							</span>
						)}
						{module.defaultEnabled ? (
							<span className='rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary'>
								Default
							</span>
						) : (
							<span className='rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-muted-foreground'>
								Opt-in
							</span>
						)}
					</div>
				</div>

				<h3 className='mt-5 text-lg font-semibold'>{module.name}</h3>
				<p className='mt-1 font-mono text-xs text-muted-foreground'>{module.moduleId}</p>
				<p className='mt-3 text-sm leading-relaxed text-zinc-400'>{module.description}</p>
			</div>

			<div className='relative mt-auto space-y-1.5 border-t border-white/[0.06] bg-black/20 p-4'>
				{module.commands.map((command) => (
					<div
						key={command}
						className='flex items-center justify-between gap-2 rounded-lg px-2 py-1 font-mono text-[13px] transition-colors hover:bg-white/[0.04]'>
						<code className='truncate text-zinc-300'>
							<span className='select-none text-muted-foreground'>max </span>
							{command}
						</code>
						<CopyButton
							text={`max ${command}`}
							className='h-7 w-7 opacity-60 group-hover:opacity-100'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

const FeatureShowcase = () => {
	const [category, setCategory] = useState<ModuleCategory | 'all'>('all');
	const visible = MODULES.filter(
		(module) => module.enabled && (category === 'all' || module.category === category),
	);

	return (
		<section id='modules' className='relative scroll-mt-20 py-28'>
			<div className='bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]' />
			<div className='mx-auto max-w-7xl px-6'>
				<SectionHeading
					eyebrow='Modules'
					title='Powerful modules. Any combination.'
					description='Each module is purpose-built for a specific workflow. Mix and match to create your perfect CLI.'
				/>

				<div className='scrollbar-none -mx-6 mb-10 flex justify-start gap-2 overflow-x-auto px-6 sm:justify-center'>
					{(['all', ...categories] as const).map((item) => (
						<button
							key={item}
							type='button'
							onClick={() => setCategory(item)}
							className={cn(
								'relative shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors',
								category === item
									? 'text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground',
							)}>
							{category === item && (
								<motion.span
									layoutId='category-pill'
									className='absolute inset-0 rounded-full bg-primary'
									transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
								/>
							)}
							<span className='relative'>
								{item === 'all' ? 'All modules' : CATEGORY_LABELS[item]}
							</span>
						</button>
					))}
				</div>

				<motion.div layout className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
					<AnimatePresence mode='popLayout'>
						{visible.map((module) => (
							<motion.div
								key={module.key}
								layout
								initial={{ opacity: 0, scale: 0.96 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.96 }}
								transition={{ duration: 0.25 }}>
								<ModuleCard module={module} />
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
};

export default FeatureShowcase;
