import React from 'react';
import { cn } from '@/lib/utils';
import { INSTALL_COMMAND } from '@/lib/site';
import CopyButton from './CopyButton';

interface InstallCommandProps {
	command?: string;
	className?: string;
}

/**
 * Single-line, copyable shell command.
 */
const InstallCommand = ({ command = INSTALL_COMMAND, className }: InstallCommandProps) => (
	<div
		className={cn(
			'group flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 py-2 pl-4 pr-2 font-mono text-sm shadow-inner backdrop-blur',
			className,
		)}>
		<span className='select-none text-primary'>$</span>
		<code className='scrollbar-none flex-1 overflow-x-auto whitespace-nowrap text-left text-zinc-300 [overflow-wrap:normal]'>
			{command}
		</code>
		<CopyButton text={command} label='Copy install command' />
	</div>
);

export default InstallCommand;
