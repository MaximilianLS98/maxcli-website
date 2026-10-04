import React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface CopyButtonProps {
	text: string;
	className?: string;
	label?: string;
}

const CopyButton = ({ text, className, label = 'Copy to clipboard' }: CopyButtonProps) => {
	const { copied, copy } = useCopyToClipboard();

	return (
		<button
			type='button'
			onClick={() => copy(text)}
			aria-label={copied ? 'Copied' : label}
			className={cn(
				'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
				className,
			)}>
			{copied ? <Check size={14} className='text-primary' /> : <Copy size={14} />}
		</button>
	);
};

export default CopyButton;
