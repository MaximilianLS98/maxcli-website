import React from 'react';
import { cn } from '@/lib/utils';
import CopyButton from '../CopyButton';

interface CodeBlockProps {
	children: string;
	language?: string;
	className?: string;
}

/**
 * Highlights shell comments so long snippets are easier to scan.
 */
const renderLine = (line: string, index: number, language: string) => {
	const isComment = language === 'bash' ? line.trimStart().startsWith('#') : false;
	const inlineComment = language === 'bash' ? line.match(/^(.*?\S)(\s{2,}#.*)$/) : null;

	if (isComment) {
		return (
			<span key={index} className='block text-zinc-500'>
				{line || ' '}
			</span>
		);
	}
	if (inlineComment) {
		return (
			<span key={index} className='block'>
				{inlineComment[1]}
				<span className='text-zinc-500'>{inlineComment[2]}</span>
			</span>
		);
	}
	return (
		<span key={index} className='block'>
			{line || ' '}
		</span>
	);
};

const CodeBlock = ({ children, language = 'bash', className }: CodeBlockProps) => (
	<div
		className={cn(
			'group relative my-4 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b0b0e]',
			className,
		)}>
		<div className='flex items-center justify-between border-b border-white/[0.06] px-4 py-1.5'>
			<span className='font-mono text-[11px] uppercase tracking-wider text-zinc-500'>
				{language}
			</span>
			<CopyButton text={children} className='h-7 w-7' />
		</div>
		<pre className='overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300'>
			<code>{children.split('\n').map((line, index) => renderLine(line, index, language))}</code>
		</pre>
	</div>
);

export default CodeBlock;
