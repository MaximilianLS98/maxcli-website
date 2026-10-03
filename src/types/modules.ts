import { ReactNode } from 'react';

export type ModuleAccent =
	| 'emerald'
	| 'sky'
	| 'violet'
	| 'orange'
	| 'cyan'
	| 'rose'
	| 'yellow'
	| 'indigo'
	| 'fuchsia';

export type ModuleCategory =
	| 'infrastructure'
	| 'containers'
	| 'cloud'
	| 'deployment'
	| 'development'
	| 'utilities';

export interface ModuleConfig {
	key: string;
	/** Module identifier used by the CLI (`max modules enable <moduleId>`) */
	moduleId: string;
	name: string;
	description: string;
	enabled: boolean;
	defaultEnabled: boolean;
	commands: string[];
	icon: ReactNode;
	accent: ModuleAccent;
	category: ModuleCategory;
	status?: 'wip';
}

export interface ModuleToggleState {
	[key: string]: boolean;
}
