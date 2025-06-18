import { ReactNode } from 'react';

export interface ModuleConfig {
	key: string;
	name: string;
	description: string;
	enabled: boolean;
	defaultEnabled: boolean;
	commands: string[];
	icon: ReactNode;
	color: string;
	category?: string;
}

export interface ModuleToggleState {
	[key: string]: boolean;
}
