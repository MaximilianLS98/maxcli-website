import React from 'react';
import {
	Terminal,
	Cloud,
	Server,
	Settings,
	Archive,
	Layers,
	Wrench,
	Ship,
	Radio,
} from 'lucide-react';
import { ModuleAccent, ModuleCategory, ModuleConfig } from '../types/modules';

/**
 * Centralized module configuration
 * Add new modules here and they will automatically appear in all relevant components.
 * Mirrors AVAILABLE_MODULES in maxcli/modules/module_manager.py.
 */
export const MODULES: ModuleConfig[] = [
	{
		key: 'ssh',
		moduleId: 'ssh_manager',
		name: 'SSH Manager',
		description:
			'Complete SSH management: connections, keys, backups & GPG-encrypted file transfers',
		enabled: true,
		defaultEnabled: true,
		commands: ['ssh connect prod', 'ssh targets list', 'ssh backup export'],
		icon: <Terminal className='w-5 h-5' />,
		accent: 'emerald',
		category: 'infrastructure',
	},
	{
		key: 'setup',
		moduleId: 'setup_manager',
		name: 'Setup Manager',
		description: 'Dev environment setup & config profiles (Useful for new machines)',
		enabled: true,
		defaultEnabled: true,
		commands: ['setup minimal', 'setup dev-full', 'setup apps'],
		icon: <Wrench className='w-5 h-5' />,
		accent: 'cyan',
		category: 'development',
	},
	{
		key: 'config',
		moduleId: 'config_manager',
		name: 'Config Manager',
		description: 'MaxCLI config management with init, backup & restore',
		enabled: true,
		defaultEnabled: true,
		commands: ['config init', 'config backup', 'config restore'],
		icon: <Settings className='w-5 h-5' />,
		accent: 'rose',
		category: 'development',
	},
	{
		key: 'docker',
		moduleId: 'docker_manager',
		name: 'Docker Manager',
		description: 'Docker system management & cleanup tools',
		enabled: true,
		defaultEnabled: false,
		commands: ['docker clean --minimal', 'docker clean --extensive'],
		icon: <Layers className='w-5 h-5' />,
		accent: 'sky',
		category: 'containers',
	},
	{
		key: 'kubernetes',
		moduleId: 'kubernetes_manager',
		name: 'Kubernetes Manager',
		description: 'Kubernetes context switching & cluster management',
		enabled: true,
		defaultEnabled: false,
		commands: ['kctx my-k8s-context'],
		icon: <Ship className='w-5 h-5' />,
		accent: 'indigo',
		category: 'containers',
		status: 'wip',
	},
	{
		key: 'gcp',
		moduleId: 'gcp_manager',
		name: 'GCP Manager',
		description: 'Google Cloud CLI auth & configuration toolkit',
		enabled: true,
		defaultEnabled: false,
		commands: ['gcp config list', 'gcp config switch production'],
		icon: <Cloud className='w-5 h-5' />,
		accent: 'orange',
		category: 'cloud',
	},
	{
		key: 'coolify',
		moduleId: 'coolify_manager',
		name: 'Coolify Manager',
		description: 'Control Coolify instances via REST API',
		enabled: true,
		defaultEnabled: false,
		commands: ['coolify status', 'coolify applications', 'coolify health'],
		icon: <Server className='w-5 h-5' />,
		accent: 'violet',
		category: 'deployment',
	},
	{
		key: 'openclaw',
		moduleId: 'openclaw_manager',
		name: 'OpenClaw Manager',
		description: 'Local OpenClaw service management: status, gateway lifecycle & logs',
		enabled: true,
		defaultEnabled: false,
		commands: ['openclaw status', 'openclaw gateway restart', 'openclaw logs --lines 100'],
		icon: <Radio className='w-5 h-5' />,
		accent: 'fuchsia',
		category: 'deployment',
	},
	{
		key: 'misc',
		moduleId: 'misc_manager',
		name: 'Misc Manager',
		description: 'DB backups, CSV processing & app deployment',
		enabled: true,
		defaultEnabled: false,
		commands: ['backup-db', 'deploy-app', 'process-csv'],
		icon: <Archive className='w-5 h-5' />,
		accent: 'yellow',
		category: 'utilities',
	},
];

/**
 * Full Tailwind class strings per accent (kept literal so Tailwind can detect them).
 */
export const ACCENT_STYLES: Record<
	ModuleAccent,
	{ text: string; bg: string; border: string; glow: string; dot: string }
> = {
	emerald: {
		text: 'text-emerald-300',
		bg: 'bg-emerald-500/10',
		border: 'border-emerald-500/25',
		glow: 'rgba(16, 185, 129, 0.18)',
		dot: 'bg-emerald-400',
	},
	sky: {
		text: 'text-sky-300',
		bg: 'bg-sky-500/10',
		border: 'border-sky-500/25',
		glow: 'rgba(14, 165, 233, 0.18)',
		dot: 'bg-sky-400',
	},
	violet: {
		text: 'text-violet-300',
		bg: 'bg-violet-500/10',
		border: 'border-violet-500/25',
		glow: 'rgba(139, 92, 246, 0.2)',
		dot: 'bg-violet-400',
	},
	orange: {
		text: 'text-orange-300',
		bg: 'bg-orange-500/10',
		border: 'border-orange-500/25',
		glow: 'rgba(249, 115, 22, 0.18)',
		dot: 'bg-orange-400',
	},
	cyan: {
		text: 'text-cyan-300',
		bg: 'bg-cyan-500/10',
		border: 'border-cyan-500/25',
		glow: 'rgba(6, 182, 212, 0.18)',
		dot: 'bg-cyan-400',
	},
	rose: {
		text: 'text-rose-300',
		bg: 'bg-rose-500/10',
		border: 'border-rose-500/25',
		glow: 'rgba(244, 63, 94, 0.18)',
		dot: 'bg-rose-400',
	},
	yellow: {
		text: 'text-yellow-300',
		bg: 'bg-yellow-500/10',
		border: 'border-yellow-500/25',
		glow: 'rgba(234, 179, 8, 0.16)',
		dot: 'bg-yellow-400',
	},
	indigo: {
		text: 'text-indigo-300',
		bg: 'bg-indigo-500/10',
		border: 'border-indigo-500/25',
		glow: 'rgba(99, 102, 241, 0.2)',
		dot: 'bg-indigo-400',
	},
	fuchsia: {
		text: 'text-fuchsia-300',
		bg: 'bg-fuchsia-500/10',
		border: 'border-fuchsia-500/25',
		glow: 'rgba(217, 70, 239, 0.18)',
		dot: 'bg-fuchsia-400',
	},
};

export const CATEGORY_LABELS: Record<ModuleCategory, string> = {
	infrastructure: 'Infrastructure',
	containers: 'Containers',
	cloud: 'Cloud',
	deployment: 'Deployment',
	development: 'Development',
	utilities: 'Utilities',
};

/**
 * Module presets from the MaxCLI README ("Module Presets").
 */
export const MODULE_PRESETS: { name: string; modules: string[] }[] = [
	{ name: 'Minimalist', modules: ['ssh', 'setup'] },
	{ name: 'Frontend Dev', modules: ['setup', 'ssh', 'docker'] },
	{ name: 'Full Stack', modules: ['ssh', 'setup', 'docker', 'gcp', 'misc'] },
	{ name: 'DevOps', modules: ['ssh', 'docker', 'kubernetes', 'gcp', 'config'] },
	{ name: 'Power User', modules: MODULES.map((module) => module.key) },
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
