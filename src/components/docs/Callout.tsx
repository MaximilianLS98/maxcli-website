import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = {
	info: { box: 'border-sky-500/25 bg-sky-500/[0.06]', icon: <Info size={16} className='text-sky-400' /> },
	warning: {
		box: 'border-yellow-500/25 bg-yellow-500/[0.06]',
		icon: <AlertTriangle size={16} className='text-yellow-400' />,
	},
	success: {
		box: 'border-primary/25 bg-primary/[0.06]',
		icon: <CheckCircle size={16} className='text-primary' />,
	},
};

interface CalloutProps {
	type: keyof typeof styles;
	title: string;
	children: React.ReactNode;
}

const Callout = ({ type, title, children }: CalloutProps) => (
	<div className={cn('my-6 rounded-xl border p-5', styles[type].box)}>
		<div className='mb-2 flex items-center gap-2'>
			{styles[type].icon}
			<h4 className='font-medium'>{title}</h4>
		</div>
		<div className='text-sm leading-relaxed text-zinc-300'>{children}</div>
	</div>
);

export default Callout;
