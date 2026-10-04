import React from 'react';
import { Download, Puzzle, Rocket } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const steps = [
	{
		icon: <Download className='h-5 w-5' />,
		title: 'Install in one line',
		description: 'The bootstrap script sets up MaxCLI and lets you pick modules interactively.',
		code: ['curl -fsSL …/bootstrap.sh | bash'],
	},
	{
		icon: <Puzzle className='h-5 w-5' />,
		title: 'Pick your modules',
		description: 'Turn modules on or off at any time. Disabled modules are never loaded.',
		code: ['max modules list', 'max modules enable gcp_manager'],
	},
	{
		icon: <Rocket className='h-5 w-5' />,
		title: 'Ship faster',
		description: 'One consistent command for the tools you use every day.',
		code: ['max ssh connect prod', 'max gcp config switch production'],
	},
];

const HowItWorks = () => (
	<section className='relative py-28'>
		<div className='mx-auto max-w-7xl px-6'>
			<SectionHeading
				eyebrow='How it works'
				title='From zero to productive in three steps'
				description='No heavyweight framework, no unused features. Just the commands you actually need.'
			/>

			<div className='relative grid gap-6 md:grid-cols-3'>
				{/* Connector line */}
				<div className='absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block' />

				{steps.map((step, index) => (
					<Reveal key={step.title} delay={index * 0.1}>
						<div className='relative h-full rounded-2xl border border-white/[0.07] bg-card/60 p-6 backdrop-blur transition-colors hover:border-white/[0.12]'>
							<div className='flex items-center gap-4'>
								<div className='relative flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-background text-primary shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)]'>
									{step.icon}
								</div>
								<span className='font-mono text-sm text-muted-foreground'>
									0{index + 1}
								</span>
							</div>
							<h3 className='mt-6 text-xl font-semibold'>{step.title}</h3>
							<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
								{step.description}
							</p>
							<div className='mt-6 space-y-1 rounded-lg border border-white/[0.06] bg-black/40 p-3 font-mono text-xs'>
								{step.code.map((line) => (
									<div key={line} className='truncate text-zinc-300'>
										<span className='mr-2 select-none text-primary'>$</span>
										{line}
									</div>
								))}
							</div>
						</div>
					</Reveal>
				))}
			</div>
		</div>
	</section>
);

export default HowItWorks;
