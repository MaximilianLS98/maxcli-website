import React from 'react';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => (
	<span className={cn('inline-flex items-center gap-2.5 font-semibold tracking-tight', className)}>
		<span className='relative flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-sm text-primary shadow-[0_0_20px_-4px_hsl(var(--primary)/0.6)]'>
			&gt;_
		</span>
		<span>
			Max<span className='text-primary'>CLI</span>
		</span>
	</span>
);

export default Logo;
