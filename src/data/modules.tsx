import React from 'react';
import { Terminal, Database, Cloud, Server, Settings, Archive, Layers } from 'lucide-react';
import { ModuleConfig } from '../types/modules';

/**
 * Centralized module configuration
 * Add new modules here and they will automatically appear in all relevant components
 */
export const MODULES: ModuleConfig[] = [
	{
		key: 'setup',
		name: 'Setup Manager',
		description: 'Dev environment setup & config profiles (Useful for new machines)',
		enabled: true,
		defaultEnabled: true,
		commands: ['setup app', 'setup dev-full'],
		icon: <Settings className='w-6 h-6' />,
		color: 'bg-cyan-500',
		category: 'development',
	},
	{
		key: 'config',
		name: 'Config Manager',
		description: 'MaxCLI Config management & backup tools',
		enabled: true,
		defaultEnabled: true,
		commands: ['config init', 'config backup', 'config restore'],
		icon: <Settings className='w-6 h-6' />,
		color: 'bg-red-500',
		category: 'development',
	},
	{
		key: 'ssh',
		name: 'SSH Manager',
		description:
			'Complete SSH management: connections, keys, backups & GPG-encrypted file transfers',
		enabled: true,
		defaultEnabled: true,
		commands: ['ssh connect', 'ssh targets', 'ssh backup'],
		icon: <Terminal className='w-6 h-6' />,
		color: 'bg-green-500',
		category: 'infrastructure',
	},
	{
		key: 'docker',
		name: 'Docker Manager',
		description: 'Docker system management & cleanup tools',
		enabled: true,
		defaultEnabled: true,
		commands: ['docker clean'],
		icon: <Layers className='w-6 h-6' />,
		color: 'bg-blue-500',
		category: 'containers',
	},
	{
		key: 'coolify',
		name: 'Coolify Manager',
		description: 'Control Coolify instances via REST API',
		enabled: true,
		defaultEnabled: false,
		commands: ['coolify status', 'coolify applications'],
		icon: <Server className='w-6 h-6' />,
		color: 'bg-purple-500',
		category: 'deployment',
	},
	{
		key: 'gcp',
		name: 'GCP Manager',
		description: 'Google Cloud CLI auth & configuration toolkit',
		enabled: true,
		defaultEnabled: false,
		commands: ['gcp config add', 'gcp config switch'],
		icon: <Cloud className='w-6 h-6' />,
		color: 'bg-orange-500',
		category: 'cloud',
	},
	{
		key: 'misc',
		name: 'Misc Manager',
		description: 'DB backups, CSV processing & app deployment',
		enabled: false,
		defaultEnabled: false,
		commands: ['backup-db', 'deploy-app', 'process-csv'],
		icon: <Archive className='w-6 h-6' />,
		color: 'bg-yellow-500',
		category: 'utilities',
	},
	{
		key: 'kubernetes',
		name: 'Kubernetes Manager',
		description: 'Kubernetes context switching & cluster mgmt (WIP)',
		enabled: true,
		defaultEnabled: false,
		commands: ['kctx switch', 'kctx list'],
		icon: <Database className='w-6 h-6' />,
		color: 'bg-red-500',
		category: 'containers',
	},
];

/**
 * Helper functions for working with modules
 */
export const getEnabledModules = (): ModuleConfig[] => {
	return MODULES.filter((module) => module.enabled);
};

export const getDisabledModules = (): ModuleConfig[] => {
	return MODULES.filter((module) => !module.enabled);
};

export const getModulesByCategory = (category: string): ModuleConfig[] => {
	return MODULES.filter((module) => module.category === category);
};

export const getModuleByKey = (key: string): ModuleConfig | undefined => {
	return MODULES.find((module) => module.key === key);
};

/**
 * Get initial toggle state for components
 */
export const getInitialToggleState = () => {
	return MODULES.reduce((acc, module) => {
		acc[module.key] = module.defaultEnabled;
		return acc;
	}, {} as Record<string, boolean>);
};
