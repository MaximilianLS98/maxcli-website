import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	ArrowLeft,
	Terminal,
	Download,
	Settings,
	Shield,
	Zap,
	GitBranch,
	Package,
	Code,
	ExternalLink,
	CheckCircle,
	AlertTriangle,
	Info,
	Copy,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Documentation page for MaxCLI - A comprehensive guide covering installation,
 * configuration, modules, and troubleshooting.
 */
const Documentation: React.FC = () => {
	/**
	 * Copy text to clipboard functionality
	 */
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	/**
	 * Code block component with copy functionality
	 */
	const CodeBlock: React.FC<{ children: string; language?: string }> = ({
		children,
		language = 'bash',
	}) => {
		return (
			<div className='relative bg-gray-900 border border-gray-700 rounded-lg p-4 my-4'>
				<div className='flex items-center justify-between mb-2'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>
						{language}
					</span>
					<Button
						onClick={() => copyToClipboard(children)}
						variant='ghost'
						size='sm'
						className='h-6 w-6 p-0 text-gray-400 hover:text-white'>
						<Copy size={12} />
					</Button>
				</div>
				<pre className='text-sm text-gray-300 overflow-x-auto'>
					<code>{children}</code>
				</pre>
			</div>
		);
	};

	/**
	 * Section header component
	 */
	const SectionHeader: React.FC<{
		title: string;
		icon: React.ReactNode;
		description?: string;
		id: string;
	}> = ({ title, icon, description, id }) => (
		<div className='mb-8' id={id}>
			<div className='flex items-center gap-3 mb-2'>
				<div className='text-green-400'>{icon}</div>
				<h2 className='text-3xl font-bold text-white'>{title}</h2>
			</div>
			{description && <p className='text-gray-400 text-lg'>{description}</p>}
		</div>
	);

	/**
	 * Info callout component
	 */
	const InfoCallout: React.FC<{
		type: 'info' | 'warning' | 'success';
		title: string;
		children: React.ReactNode;
	}> = ({ type, title, children }) => {
		const styles = {
			info: 'border-blue-500/30 bg-blue-500/10',
			warning: 'border-yellow-500/30 bg-yellow-500/10',
			success: 'border-green-500/30 bg-green-500/10',
		};

		const icons = {
			info: <Info size={16} className='text-blue-400' />,
			warning: <AlertTriangle size={16} className='text-yellow-400' />,
			success: <CheckCircle size={16} className='text-green-400' />,
		};

		return (
			<div className={`border rounded-lg p-4 my-4 ${styles[type]}`}>
				<div className='flex items-center gap-2 mb-2'>
					{icons[type]}
					<h4 className='font-medium text-white'>{title}</h4>
				</div>
				<div className='text-gray-300 text-sm'>{children}</div>
			</div>
		);
	};

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			{/* Header */}
			<header className='border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-50'>
				<div className='max-w-6xl mx-auto px-6 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<Link to='/'>
								<Button
									variant='ghost'
									size='sm'
									className='text-gray-400 hover:text-white hover:bg-gray-800'>
									<ArrowLeft size={16} className='mr-2' />
									Back to Home
								</Button>
							</Link>
							<div>
								<h1 className='text-2xl font-bold text-white'>Documentation</h1>
								<p className='text-gray-400'>
									Complete guide to MaxCLI installation and usage
								</p>
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<Terminal size={16} className='text-green-400' />
							<span className='text-sm text-gray-400'>MaxCLI Guide</span>
						</div>
					</div>
				</div>
			</header>

			{/* Navigation */}
			<nav className='bg-gray-800/50 border-b border-gray-800'>
				<div className='max-w-6xl mx-auto px-6 py-3'>
					<div className='flex gap-6 text-sm overflow-x-auto'>
						{[
							{ href: '#overview', label: 'Overview' },
							{ href: '#installation', label: 'Installation' },
							{ href: '#modules', label: 'Modules' },
							{ href: '#configuration', label: 'Configuration' },
							{ href: '#usage', label: 'Usage' },
							{ href: '#troubleshooting', label: 'Troubleshooting' },
							{ href: '#development', label: 'Development' },
						].map((item) => (
							<a
								key={item.href}
								href={item.href}
								className='text-gray-400 hover:text-white whitespace-nowrap transition-colors'>
								{item.label}
							</a>
						))}
					</div>
				</div>
			</nav>

			{/* Content */}
			<main className='max-w-6xl mx-auto px-6 py-12'>
				{/* Overview Section */}
				<SectionHeader
					id='overview'
					title='Overview'
					icon={<Zap size={24} />}
					description='MaxCLI is a powerful, modular command-line interface designed for developers and DevOps engineers.'
				/>

				<div className='mb-12'>
					<div className='grid md:grid-cols-2 gap-6 mb-8'>
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-3'>Key Features</h3>
							<ul className='space-y-2 text-gray-300'>
								<li className='flex items-center gap-2'>
									<CheckCircle size={16} className='text-green-400' />
									Modular Architecture
								</li>
								<li className='flex items-center gap-2'>
									<CheckCircle size={16} className='text-green-400' />
									Dynamic Loading
								</li>
								<li className='flex items-center gap-2'>
									<CheckCircle size={16} className='text-green-400' />
									Personal Configuration
								</li>
								<li className='flex items-center gap-2'>
									<CheckCircle size={16} className='text-green-400' />
									Comprehensive Tools
								</li>
								<li className='flex items-center gap-2'>
									<CheckCircle size={16} className='text-green-400' />
									Smart Bootstrap
								</li>
							</ul>
						</div>

						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-3'>Quick Start</h3>
							<p className='text-gray-300 mb-4'>
								Install MaxCLI with a single command:
							</p>
							<CodeBlock>
								{`curl -fsSL https://raw.githubusercontent.com/maximilianls98/maxcli/main/bootstrap.sh | bash`}
							</CodeBlock>
						</div>
					</div>
				</div>

				{/* Installation Section */}
				<SectionHeader
					id='installation'
					title='Installation'
					icon={<Download size={24} />}
					description='MaxCLI supports two installation methods: Standalone and Local.'
				/>

				<div className='mb-12'>
					<div className='space-y-8'>
						{/* Standalone Installation */}
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<div className='flex items-center gap-2 mb-4'>
								<Badge className='bg-green-500/20 text-green-400 border-green-500/30'>
									Recommended
								</Badge>
								<h3 className='text-xl font-semibold text-white'>
									Standalone Installation
								</h3>
							</div>

							<p className='text-gray-300 mb-4'>
								The standalone method automatically downloads and installs MaxCLI
								with a single command:
							</p>

							<div className='space-y-4'>
								<div>
									<h4 className='font-medium text-white mb-2'>
										Basic Installation
									</h4>
									<CodeBlock>
										{`curl -fsSL https://raw.githubusercontent.com/maximilianls98/maxcli/main/bootstrap.sh | bash`}
									</CodeBlock>
								</div>

								<div>
									<h4 className='font-medium text-white mb-2'>
										With Preset Modules
									</h4>
									<CodeBlock>
										{`curl -fsSL https://raw.githubusercontent.com/maximilianls98/maxcli/main/bootstrap.sh | bash -s -- --modules "ssh_manager,setup_manager,docker_manager"`}
									</CodeBlock>
								</div>

								<div>
									<h4 className='font-medium text-white mb-2'>All Modules</h4>
									<CodeBlock>
										{`curl -fsSL https://raw.githubusercontent.com/maximilianls98/maxcli/main/bootstrap.sh | bash -s -- --modules "ssh_manager,docker_manager,kubernetes_manager,gcp_manager,coolify_manager,setup_manager,misc_manager,config_manager"`}
									</CodeBlock>
								</div>
							</div>
						</div>

						{/* Local Installation */}
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Local Installation
							</h3>
							<p className='text-gray-300 mb-4'>
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
						</div>

						{/* Post-Installation */}
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Post-Installation
							</h3>
							<p className='text-gray-300 mb-4'>
								After installation, follow these steps:
							</p>

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
max ssh list-targets`}
							</CodeBlock>
						</div>
					</div>
				</div>

				{/* Modules Section */}
				<SectionHeader
					id='modules'
					title='Available Modules'
					icon={<Package size={24} />}
					description='MaxCLI provides a collection of specialized modules for different development needs.'
				/>

				<div className='mb-12'>
					<div className='grid gap-6'>
						{[
							{
								name: 'ssh_manager',
								description:
									'Complete SSH management: connections, keys, backups, and file transfers with GPG encryption',
								commands: [
									'ssh targets add/list',
									'ssh connect',
									'ssh generate-keypair',
									'ssh backup export/import',
								],
								badge: 'Core',
							},
							{
								name: 'docker_manager',
								description:
									'Docker container management, image operations, and development environments',
								commands: ['docker clean --extensive', 'docker clean --minimal'],
								badge: 'DevOps',
							},
							{
								name: 'kubernetes_manager',
								description: 'Kubernetes context switching and cluster management',
								commands: ['kctx <context>', 'kubectl', 'k8s'],
								badge: 'DevOps',
							},
							{
								name: 'gcp_manager',
								description:
									'Google Cloud Platform configuration and authentication management',
								commands: ['gcp config switch/create/list', 'gcloud'],
								badge: 'Cloud',
							},
							{
								name: 'coolify_manager',
								description: 'Coolify instance management through REST API',
								commands: ['coolify health', 'coolify status', 'coolify services'],
								badge: 'Cloud',
							},
							{
								name: 'setup_manager',
								description:
									'Development environment setup and configuration profiles',
								commands: ['setup minimal', 'setup dev-full', 'setup apps'],
								badge: 'Setup',
							},
							{
								name: 'misc_manager',
								description:
									'Database backup utilities, CSV data processing, and application deployment tools',
								commands: ['backup-db', 'deploy-app', 'process-csv'],
								badge: 'Utility',
							},
							{
								name: 'config_manager',
								description:
									'Personal configuration management with init, backup, and restore functionality',
								commands: ['config init', 'config backup', 'config restore'],
								badge: 'Core',
							},
						].map((module) => (
							<div
								key={module.name}
								className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
								<div className='flex items-start justify-between mb-3'>
									<div className='flex items-center gap-3'>
										<h3 className='text-lg font-semibold text-white font-mono'>
											{module.name}
										</h3>
										<Badge className='bg-blue-500/20 text-blue-400 border-blue-500/30'>
											{module.badge}
										</Badge>
									</div>
								</div>
								<p className='text-gray-300 mb-4'>{module.description}</p>
								<div>
									<h4 className='font-medium text-white mb-2'>Key Commands:</h4>
									<div className='flex flex-wrap gap-2'>
										{module.commands.map((command) => (
											<code
												key={command}
												className='bg-gray-900 text-green-400 px-2 py-1 rounded text-sm'>
												{command}
											</code>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Configuration Section */}
				<SectionHeader
					id='configuration'
					title='Configuration'
					icon={<Settings size={24} />}
					description='Set up and manage your MaxCLI configuration.'
				/>

				<div className='mb-12'>
					<div className='space-y-6'>
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Personal Configuration
							</h3>
							<p className='text-gray-300 mb-4'>
								Initialize your personal configuration with:
							</p>
							<CodeBlock>{`max config init`}</CodeBlock>
							<p className='text-gray-300 text-sm'>
								This creates{' '}
								<code className='bg-gray-900 text-green-400 px-1 rounded'>
									~/.config/maxcli/config.json
								</code>{' '}
								with your git settings, dotfiles repository URL, GCP project
								mappings, and Coolify instance details.
							</p>
						</div>

						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Module Management
							</h3>
							<div className='space-y-4'>
								<div>
									<h4 className='font-medium text-white mb-2'>
										List Available Modules
									</h4>
									<CodeBlock>{`max modules list`}</CodeBlock>
								</div>
								<div>
									<h4 className='font-medium text-white mb-2'>
										Enable/Disable Modules
									</h4>
									<CodeBlock>
										{`# Enable a module
max modules enable kubernetes_manager

# Disable a module
max modules disable ssh_backup

# Enable multiple modules
max modules enable kubernetes_manager gcp_manager misc_manager`}
									</CodeBlock>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Usage Section */}
				<SectionHeader
					id='usage'
					title='Usage Examples'
					icon={<Terminal size={24} />}
					description='Common usage patterns and examples for MaxCLI modules.'
				/>

				<div className='mb-12'>
					<div className='space-y-6'>
						{/* SSH Manager Examples */}
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>SSH Manager</h3>
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
						</div>

						{/* Docker Manager Examples */}
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Docker Manager
							</h3>
							<CodeBlock>
								{`# Extensive cleanup (removes all unused resources)
max docker clean --extensive

# Minimal cleanup (preserves recent items)
max docker clean --minimal

# Default cleanup (defaults to minimal for safety)
max docker clean`}
							</CodeBlock>
						</div>

						{/* GCP Manager Examples */}
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>GCP Manager</h3>
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
						</div>
					</div>
				</div>

				{/* Troubleshooting Section */}
				<SectionHeader
					id='troubleshooting'
					title='Troubleshooting'
					icon={<Shield size={24} />}
					description='Common issues and their solutions.'
				/>

				<div className='mb-12'>
					<div className='space-y-6'>
						<InfoCallout type='warning' title='Installation Issues'>
							<p>If installation times out waiting for Homebrew:</p>
							<CodeBlock>
								{`export HOMEBREW_NO_AUTO_UPDATE=1
curl -fsSL https://raw.githubusercontent.com/maximilianls98/maxcli/main/bootstrap.sh | bash --modules "ssh_manager"`}
							</CodeBlock>
						</InfoCallout>

						<InfoCallout type='info' title='Mock Response Issue'>
							<p>
								If the max command only responds with mock responses after running
								test scripts:
							</p>
							<CodeBlock>{`cp -r maxcli ~/.local/lib/python/`}</CodeBlock>
						</InfoCallout>

						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Race Condition Issues (Fixed)
							</h3>
							<p className='text-gray-300 mb-4'>
								The latest bootstrap script includes fixes for race conditions and
								output mixing. Always use the latest version:
							</p>
							<CodeBlock>
								{`# Always use the latest version from main branch
curl -fsSL https://raw.githubusercontent.com/maximilianls98/maxcli/main/bootstrap.sh | bash

# Or force download even if you have local files
./bootstrap.sh --force-download`}
							</CodeBlock>
						</div>
					</div>
				</div>

				{/* Development Section */}
				<SectionHeader
					id='development'
					title='Development'
					icon={<Code size={24} />}
					description='Contributing to MaxCLI and creating custom modules.'
				/>

				<div className='mb-12'>
					<div className='space-y-6'>
						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Development Setup
							</h3>
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
						</div>

						<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Creating Custom Modules
							</h3>
							<p className='text-gray-300 mb-4'>
								Create a new module in{' '}
								<code className='bg-gray-900 text-green-400 px-1 rounded'>
									maxcli/modules/
								</code>
								:
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
						</div>

						<InfoCallout type='success' title='Contributing'>
							<ol className='list-decimal list-inside space-y-1'>
								<li>Fork the repository</li>
								<li>Create a feature branch</li>
								<li>Add your module or improvements</li>
								<li>Write tests</li>
								<li>Submit a pull request</li>
							</ol>
						</InfoCallout>
					</div>
				</div>

				{/* Uninstalling Section */}
				<div className='mb-12'>
					<SectionHeader
						id='uninstalling'
						title='Uninstalling MaxCLI'
						icon={<AlertTriangle size={24} />}
						description='Complete system removal with safety confirmations.'
					/>

					<InfoCallout type='warning' title='WARNING: Complete System Removal'>
						<p>
							The uninstall command completely removes all traces of MaxCLI from your
							system. This operation is <strong>IRREVERSIBLE</strong> and will
							permanently delete all your configurations, settings, and
							customizations.
						</p>
					</InfoCallout>

					<div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
						<h3 className='text-xl font-semibold text-white mb-4'>Usage</h3>
						<CodeBlock>
							{`# Standard uninstall with double confirmation
max uninstall

# Skip confirmations (NOT RECOMMENDED - dangerous)
max uninstall --force`}
						</CodeBlock>

						<p className='text-gray-300 mt-4'>
							The uninstall command requires double confirmation to prevent accidental
							deletion.
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className='border-t border-gray-800 pt-8 mt-12'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						<div className='text-gray-400'>
							<p>Need help? Check the GitHub repository or create an issue.</p>
						</div>
						<div className='flex gap-3'>
							<Button
								asChild
								variant='outline'
								className='border-gray-600 text-white hover:bg-gray-700'>
								<a
									href='https://github.com/maximilianls98/maxcli'
									target='_blank'
									rel='noopener noreferrer'>
									<GitBranch size={16} className='mr-2' />
									GitHub Repository
									<ExternalLink size={12} className='ml-1' />
								</a>
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Documentation;
