import React, { useEffect, useState } from 'react';
import {
	AlertTriangle,
	BookOpen,
	CheckCircle,
	Code,
	Download,
	ExternalLink,
	Github,
	Package,
	Settings,
	Shield,
	Terminal,
	Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GITHUB_URL, INSTALL_COMMAND, buildInstallCommand } from '@/lib/site';
import SiteLayout from '../components/layout/SiteLayout';
import CodeBlock from '../components/docs/CodeBlock';
import Callout from '../components/docs/Callout';
import { MODULES, ACCENT_STYLES, CATEGORY_LABELS } from '../data/modules';

const SECTIONS = [
	{ id: 'overview', label: 'Overview', icon: <Zap size={15} /> },
	{ id: 'installation', label: 'Installation', icon: <Download size={15} /> },
	{ id: 'modules', label: 'Modules', icon: <Package size={15} /> },
	{ id: 'configuration', label: 'Configuration', icon: <Settings size={15} /> },
	{ id: 'usage', label: 'Usage', icon: <Terminal size={15} /> },
	{ id: 'troubleshooting', label: 'Troubleshooting', icon: <Shield size={15} /> },
	{ id: 'development', label: 'Development', icon: <Code size={15} /> },
	{ id: 'uninstalling', label: 'Uninstalling', icon: <AlertTriangle size={15} /> },
];

/**
 * Track which section is currently in view for the sidebar highlight.
 */
const useActiveSection = (ids: string[]) => {
	const [active, setActive] = useState(ids[0]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: '-80px 0px -65% 0px' },
		);
		ids.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});
		return () => observer.disconnect();
	}, [ids]);

	return active;
};

const SectionHeader = ({
	id,
	title,
	icon,
	description,
}: {
	id: string;
	title: string;
	icon: React.ReactNode;
	description?: string;
}) => (
	<div className='mb-8'>
		<a href={`#${id}`} className='group inline-flex items-center gap-3'>
			<span className='flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary'>
				{icon}
			</span>
			<h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
			<span className='text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100'>
				#
			</span>
		</a>
		{description && <p className='mt-3 text-lg text-muted-foreground'>{description}</p>}
	</div>
);

const Section = ({ id, children }: { id: string; children: React.ReactNode }) => (
	<section id={id} className='scroll-mt-24 border-b border-white/[0.06] py-14 first:pt-0 last:border-0'>
		{children}
	</section>
);

const Card = ({ title, children, badge }: { title?: string; children: React.ReactNode; badge?: string }) => (
	<div className='rounded-2xl border border-white/[0.07] bg-card/60 p-6'>
		{title && (
			<div className='mb-3 flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>{title}</h3>
				{badge && (
					<span className='rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary'>
						{badge}
					</span>
				)}
			</div>
		)}
		{children}
	</div>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
	<code className='rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.9em] text-primary'>{children}</code>
);

const Documentation: React.FC = () => {
	const active = useActiveSection(SECTIONS.map((section) => section.id));

	return (
		<SiteLayout>
			{/* Page header */}
			<div className='relative isolate overflow-hidden border-b border-white/[0.06] pb-12 pt-32'>
				<div className='bg-grid absolute inset-0 -z-10' />
				<div className='absolute left-1/3 top-0 -z-10 h-72 w-[600px] rounded-full bg-primary/10 blur-[100px]' />
				<div className='mx-auto max-w-7xl px-6'>
					<div className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary'>
						<BookOpen size={14} />
						Documentation
					</div>
					<h1 className='text-gradient mt-4 text-4xl font-bold tracking-tight sm:text-5xl'>
						MaxCLI Guide
					</h1>
					<p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
						Everything you need to install, configure and extend MaxCLI.
					</p>
				</div>
			</div>

			{/* Mobile section nav */}
			<nav className='scrollbar-none sticky top-16 z-40 flex gap-1 overflow-x-auto border-b border-white/[0.06] bg-background/80 px-6 py-2 backdrop-blur-xl lg:hidden'>
				{SECTIONS.map((section) => (
					<a
						key={section.id}
						href={`#${section.id}`}
						className={cn(
							'shrink-0 rounded-full px-3 py-1 text-sm transition-colors',
							active === section.id
								? 'bg-primary/10 text-primary'
								: 'text-muted-foreground hover:text-foreground',
						)}>
						{section.label}
					</a>
				))}
			</nav>

			<div className='mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[220px_1fr]'>
				{/* Sidebar */}
				<aside className='hidden lg:block'>
					<nav className='sticky top-28 space-y-1'>
						<p className='mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
							On this page
						</p>
						{SECTIONS.map((section) => (
							<a
								key={section.id}
								href={`#${section.id}`}
								className={cn(
									'relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
									active === section.id
										? 'bg-white/[0.04] text-foreground'
										: 'text-muted-foreground hover:text-foreground',
								)}>
								{active === section.id && (
									<span className='absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary' />
								)}
								<span className={active === section.id ? 'text-primary' : ''}>
									{section.icon}
								</span>
								{section.label}
							</a>
						))}
						<div className='!mt-8 rounded-xl border border-white/[0.07] bg-card/60 p-4'>
							<p className='text-sm font-medium'>Need help?</p>
							<p className='mt-1 text-xs text-muted-foreground'>
								Open an issue on GitHub.
							</p>
							<a
								href={`${GITHUB_URL}/issues`}
								target='_blank'
								rel='noopener noreferrer'
								className='mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:underline'>
								<Github size={13} />
								GitHub issues
								<ExternalLink size={11} />
							</a>
						</div>
					</nav>
				</aside>

				{/* Content */}
				<div className='min-w-0 max-w-4xl'>
					<Section id='overview'>
						<SectionHeader
							id='overview'
							title='Overview'
							icon={<Zap size={18} />}
							description='MaxCLI is a powerful, modular command-line interface designed for developers and DevOps engineers.'
						/>
						<div className='grid gap-4 md:grid-cols-2'>
							<Card title='Key Features'>
								<ul className='space-y-2.5 text-sm text-zinc-300'>
									{[
										'Modular Architecture',
										'Dynamic Loading',
										'Personal Configuration',
										'Comprehensive Tools',
										'Smart Bootstrap',
									].map((feature) => (
										<li key={feature} className='flex items-center gap-2'>
											<CheckCircle size={15} className='text-primary' />
											{feature}
										</li>
									))}
								</ul>
							</Card>
							<Card title='Quick Start'>
								<p className='text-sm text-zinc-300'>Install MaxCLI with a single command:</p>
								<CodeBlock>{INSTALL_COMMAND}</CodeBlock>
							</Card>
						</div>
					</Section>

					<Section id='installation'>
						<SectionHeader
							id='installation'
							title='Installation'
							icon={<Download size={18} />}
							description='MaxCLI supports two installation methods: Standalone and Local.'
						/>
						<div className='space-y-6'>
							<Card title='Standalone Installation' badge='Recommended'>
								<p className='text-sm text-zinc-300'>
									The standalone method automatically downloads and installs MaxCLI
									with a single command.
								</p>
								<h4 className='mt-6 text-sm font-medium'>Basic Installation</h4>
								<CodeBlock>{INSTALL_COMMAND}</CodeBlock>
								<h4 className='mt-6 text-sm font-medium'>With Preset Modules</h4>
								<CodeBlock>
									{buildInstallCommand(['ssh_manager', 'setup_manager', 'docker_manager'])}
								</CodeBlock>
								<h4 className='mt-6 text-sm font-medium'>All Modules</h4>
								<CodeBlock>
									{buildInstallCommand(MODULES.map((module) => module.moduleId))}
								</CodeBlock>
							</Card>

							<Card title='Local Installation'>
								<p className='text-sm text-zinc-300'>
									The local method gives you full control and is ideal for development
									or customization:
								</p>
								<CodeBlock>
									{`# Clone the repository
git clone https://github.com/maximilianls98/maxcli.git
cd maxcli

# Run the bootstrap script
./bootstrap.sh

# Or with preset modules
./bootstrap.sh --modules "ssh_manager,setup_manager,docker_manager"`}
								</CodeBlock>
							</Card>

							<Card title='Post-Installation'>
								<p className='text-sm text-zinc-300'>After installation, follow these steps:</p>
								<CodeBlock>
									{`# 1. Restart your terminal or reload your shell
source ~/.zshrc

# 2. Initialize your personal configuration
max config init

# 3. Verify installation
max --help

# 4. Check enabled modules
max modules list

# 5. Test a command (if ssh_manager is enabled)
max ssh targets list`}
								</CodeBlock>
							</Card>
						</div>
					</Section>

					<Section id='modules'>
						<SectionHeader
							id='modules'
							title='Available Modules'
							icon={<Package size={18} />}
							description='MaxCLI provides a collection of specialized modules for different development needs.'
						/>
						<div className='grid gap-4'>
							{MODULES.map((module) => {
								const accent = ACCENT_STYLES[module.accent];
								return (
									<div
										key={module.key}
										className='flex gap-4 rounded-2xl border border-white/[0.07] bg-card/60 p-5'>
										<div
											className={cn(
												'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border',
												accent.bg,
												accent.border,
												accent.text,
											)}>
											{module.icon}
										</div>
										<div className='min-w-0 flex-1'>
											<div className='flex flex-wrap items-center gap-2'>
												<h3 className='font-mono font-semibold'>{module.moduleId}</h3>
												<span className='rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-muted-foreground'>
													{CATEGORY_LABELS[module.category]}
												</span>
												{module.defaultEnabled && (
													<span className='rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] text-primary'>
														Default
													</span>
												)}
											</div>
											<p className='mt-1.5 text-sm text-zinc-400'>{module.description}</p>
											<div className='mt-3 flex flex-wrap gap-2'>
												{module.commands.map((command) => (
													<code
														key={command}
														className='rounded-md border border-white/[0.06] bg-black/40 px-2 py-1 text-xs text-zinc-300'>
														max {command}
													</code>
												))}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</Section>

					<Section id='configuration'>
						<SectionHeader
							id='configuration'
							title='Configuration'
							icon={<Settings size={18} />}
							description='Set up and manage your MaxCLI configuration.'
						/>
						<div className='space-y-6'>
							<Card title='Personal Configuration'>
								<p className='text-sm text-zinc-300'>Initialize your personal configuration with:</p>
								<CodeBlock>{`max config init`}</CodeBlock>
								<p className='text-sm leading-relaxed text-zinc-400'>
									This creates <InlineCode>~/.config/maxcli/config.json</InlineCode> with
									your git settings, dotfiles repository URL, GCP project mappings, and
									Coolify instance details.
								</p>
							</Card>

							<Card title='Module Management'>
								<h4 className='text-sm font-medium'>List Available Modules</h4>
								<CodeBlock>{`max modules list`}</CodeBlock>
								<h4 className='mt-6 text-sm font-medium'>Enable/Disable Modules</h4>
								<CodeBlock>
									{`# Enable a module
max modules enable kubernetes_manager

# Disable a module
max modules disable docker_manager

# Enable multiple modules
max modules enable kubernetes_manager gcp_manager misc_manager`}
								</CodeBlock>
							</Card>
						</div>
					</Section>

					<Section id='usage'>
						<SectionHeader
							id='usage'
							title='Usage Examples'
							icon={<Terminal size={18} />}
							description='Common usage patterns and examples for MaxCLI modules.'
						/>
						<div className='space-y-6'>
							<Card title='SSH Manager'>
								<CodeBlock>
									{`# Manage SSH targets
max ssh targets add prod ubuntu 192.168.1.100 --port 2222 --key ~/.ssh/prod_key
max ssh targets list
max ssh targets remove old-server

# Connect to targets
max ssh connect prod
max ssh connect                    # Interactive selection

# Generate SSH keypairs
max ssh generate-keypair dev ~/.ssh/dev_key --type ed25519
max ssh copy-public-key prod       # Copy public key to target

# SSH key backup and restore with GPG encryption
max ssh backup export              # Create encrypted backup
max ssh backup import              # Restore from backup`}
								</CodeBlock>
							</Card>

							<Card title='Docker Manager'>
								<CodeBlock>
									{`# Extensive cleanup (removes all unused resources)
max docker clean --extensive

# Minimal cleanup (preserves recent items)
max docker clean --minimal

# Default cleanup (defaults to minimal for safety)
max docker clean`}
								</CodeBlock>
							</Card>

							<Card title='GCP Manager'>
								<CodeBlock>
									{`# List available configurations
max gcp config list

# Switch configurations (with automatic ADC and quota project switching)
max gcp config switch production

# Create new configuration (with full authentication setup)
max gcp config create development

# Interactive mode - choose from menu
max gcp config switch`}
								</CodeBlock>
							</Card>

							<Card title='OpenClaw Manager'>
								<CodeBlock>
									{`# Check local OpenClaw status
max openclaw status

# Control the gateway
max openclaw gateway status
max openclaw gateway restart

# Tail recent logs
max openclaw logs --lines 100`}
								</CodeBlock>
							</Card>
						</div>
					</Section>

					<Section id='troubleshooting'>
						<SectionHeader
							id='troubleshooting'
							title='Troubleshooting'
							icon={<Shield size={18} />}
							description='Common issues and their solutions.'
						/>
						<Callout type='warning' title='Installation Issues'>
							<p>If installation times out waiting for Homebrew:</p>
							<CodeBlock>
								{`export HOMEBREW_NO_AUTO_UPDATE=1
${buildInstallCommand(['ssh_manager'])}`}
							</CodeBlock>
						</Callout>

						<Callout type='info' title='Mock Response Issue'>
							<p>
								If the max command only responds with mock responses after running test
								scripts:
							</p>
							<CodeBlock>{`cp -r maxcli ~/.local/lib/python/`}</CodeBlock>
						</Callout>

						<Card title='Race Condition Issues (Fixed)'>
							<p className='text-sm text-zinc-300'>
								The latest bootstrap script includes fixes for race conditions and output
								mixing. Always use the latest version:
							</p>
							<CodeBlock>
								{`# Always use the latest version from main branch
${INSTALL_COMMAND}

# Or force download even if you have local files
./bootstrap.sh --force-download`}
							</CodeBlock>
						</Card>
					</Section>

					<Section id='development'>
						<SectionHeader
							id='development'
							title='Development'
							icon={<Code size={18} />}
							description='Contributing to MaxCLI and creating custom modules.'
						/>
						<div className='space-y-6'>
							<Card title='Development Setup'>
								<CodeBlock>
									{`# Clone and install in development mode
git clone https://github.com/maximilianls98/maxcli.git
cd maxcli
pip install -e .

# Install development dependencies
pip install -r requirements-dev.txt

# Run tests
python -m pytest tests/

# Run linting
flake8 maxcli/
mypy maxcli/`}
								</CodeBlock>
							</Card>

							<Card title='Creating Custom Modules'>
								<p className='text-sm text-zinc-300'>
									Create a new module in <InlineCode>maxcli/modules/</InlineCode>:
								</p>
								<CodeBlock language='python'>
									{`# maxcli/modules/my_module.py
"""
My Custom Module

This module provides custom functionality for my specific needs.
"""

import argparse


def register_commands(subparsers) -> None:
    """Register commands for this module."""
    parser = subparsers.add_parser(
        'my-command',
        help='Description of my command',
        description='Detailed description of what this command does.'
    )

    parser.add_argument('--option', help='Command option')
    parser.set_defaults(func=my_command_function)


def my_command_function(args):
    """Implementation of my command."""
    print(f"Running my command with option: {args.option}")`}
								</CodeBlock>
							</Card>

							<Callout type='success' title='Contributing'>
								<ol className='list-inside list-decimal space-y-1'>
									<li>Fork the repository</li>
									<li>Create a feature branch</li>
									<li>Add your module or improvements</li>
									<li>Write tests</li>
									<li>Submit a pull request</li>
								</ol>
							</Callout>
						</div>
					</Section>

					<Section id='uninstalling'>
						<SectionHeader
							id='uninstalling'
							title='Uninstalling MaxCLI'
							icon={<AlertTriangle size={18} />}
							description='Complete system removal with safety confirmations.'
						/>
						<Callout type='warning' title='WARNING: Complete System Removal'>
							<p>
								The uninstall command completely removes all traces of MaxCLI from your
								system. This operation is <strong>IRREVERSIBLE</strong> and will
								permanently delete all your configurations, settings, and customizations.
							</p>
						</Callout>
						<Card title='Usage'>
							<CodeBlock>
								{`# Standard uninstall with double confirmation
max uninstall

# Skip confirmations (NOT RECOMMENDED - dangerous)
max uninstall --force`}
							</CodeBlock>
							<p className='text-sm text-zinc-400'>
								The uninstall command requires double confirmation to prevent accidental
								deletion.
							</p>
						</Card>
					</Section>
				</div>
			</div>
		</SiteLayout>
	);
};

export default Documentation;
