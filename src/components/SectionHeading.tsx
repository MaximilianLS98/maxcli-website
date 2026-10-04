import React from 'react';
import { cn } from '@/lib/utils';
import Reveal from './Reveal';

interface SectionHeadingProps {
	eyebrow: string;
	title: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
}

const SectionHeading = ({ eyebrow, title, description, className }: SectionHeadingProps) => (
	<Reveal className={cn('mx-auto mb-14 max-w-3xl text-center', className)}>
		<div className='mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary'>
			<span className='h-px w-6 bg-primary/60' />
			{eyebrow}
			<span className='h-px w-6 bg-primary/60' />
		</div>
		<h2 className='text-gradient text-balance text-4xl font-bold tracking-tight sm:text-5xl'>{title}</h2>
		{description && (
			<p className='mt-5 text-lg leading-relaxed text-muted-foreground'>{description}</p>
		)}
	</Reveal>
);

export default SectionHeading;
