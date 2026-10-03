import React from 'react';
import { AnimatedSpan, TypingAnimation } from './magicui/terminal';
import { MODULES } from '../data/modules';

const Prompt = ({ delay, command }: { delay: number; command: string }) => (
	<div className='flex gap-2 text-zinc-100'>
		<AnimatedSpan delay={delay} className='text-primary'>
			❯
		</AnimatedSpan>
		<TypingAnimation delay={delay} duration={35} className='text-zinc-100'>
			{command}
		</TypingAnimation>
	</div>
);

const Line = ({
	delay,
	children,
	className = 'text-zinc-400',
}: {
	delay: number;
	children: React.ReactNode;
	className?: string;
}) => (
	<AnimatedSpan delay={delay} className={className}>
		{children}
	</AnimatedSpan>
);

/**
 * Animated terminal replaying a short MaxCLI session (output mirrors the real CLI).
 */
const HeroTerminal = () => {
	const sorted = [...MODULES].sort((a, b) => a.moduleId.localeCompare(b.moduleId));
	const padding = Math.max(...sorted.map((module) => module.moduleId.length)) + 2;
	const enabledCount = MODULES.filter((module) => module.defaultEnabled).length;

	const listStart = 1400;
	const step = 110;
	const listEnd = listStart + 250 + sorted.length * step;
	const enableAt = listEnd + 500;
	const cleanAt = enableAt + 2200;

	return (
		<div className='relative'>
			{/* Glow behind the window */}
			<div className='absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-white/5 to-accent/40 opacity-70 blur-[2px]' />
			<div className='absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl' />

			<div className='relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0e]/95 shadow-2xl shadow-black/60 backdrop-blur'>
				<div className='flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3'>
					<span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
					<span className='h-3 w-3 rounded-full bg-[#febc2e]' />
					<span className='h-3 w-3 rounded-full bg-[#28c840]' />
					<span className='ml-3 font-mono text-xs text-zinc-500'>~/dev — zsh</span>
				</div>

				<pre className='h-[500px] overflow-hidden p-5 font-mono text-[12.5px] leading-relaxed [overflow-wrap:normal] [white-space:pre] sm:text-[13px]'>
					<code className='grid gap-y-0.5'>
						<Prompt delay={300} command='max modules list' />
						<Line delay={listStart} className='text-zinc-200'>
							📦 Available CLI Modules:
						</Line>
						{sorted.map((module, index) => (
							<Line key={module.key} delay={listStart + 250 + index * step}>
								<span>
									<span className='text-zinc-300'>
										{module.moduleId.padEnd(padding)}
									</span>
									{module.defaultEnabled ? (
										<span className='text-primary'>✅ Enabled</span>
									) : (
										<span className='text-zinc-500'>❌ Disabled</span>
									)}
								</span>
							</Line>
						))}
						<Line delay={listEnd} className='text-zinc-300'>
							{`📊 Status: ${enabledCount}/${MODULES.length} modules enabled`}
						</Line>

						<div className='h-2' />
						<Prompt delay={enableAt} command='max modules enable docker_manager' />
						<Line delay={enableAt + 1500} className='text-primary'>
							✅ Module 'docker_manager' enabled successfully.
						</Line>
						<Line delay={enableAt + 1650}>🔧 New commands available: docker</Line>

						<div className='h-2' />
						<Prompt delay={cleanAt} command='max docker clean --minimal' />
						<Line delay={cleanAt + 1300} className='text-zinc-300'>
							🧹 Performing minimal Docker cleanup...
						</Line>
						<Line delay={cleanAt + 1600}>Removing dangling images...</Line>
						<Line delay={cleanAt + 1900} className='text-primary'>
							✅ Minimal Docker cleanup completed!
						</Line>
						<Line delay={cleanAt + 2200} className='text-zinc-100'>
							<span>
								<span className='text-primary'>❯</span>{' '}
								<span className='terminal-cursor inline-block h-4 w-2 translate-y-0.5 bg-primary' />
							</span>
						</Line>
					</code>
				</pre>
			</div>
		</div>
	);
};

export default HeroTerminal;
