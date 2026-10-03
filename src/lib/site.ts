/**
 * Shared links and copy used across pages.
 */
export const GITHUB_REPO = 'MaximilianLS98/MaxCLI';
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;
export const BOOTSTRAP_URL = 'https://raw.githubusercontent.com/maximilianls98/maxcli/main/bootstrap.sh';
export const INSTALL_COMMAND = `curl -fsSL ${BOOTSTRAP_URL} | bash`;

/**
 * Build the bootstrap command that pre-selects the given modules.
 */
export const buildInstallCommand = (moduleIds: string[]) =>
	moduleIds.length === 0
		? INSTALL_COMMAND
		: `${INSTALL_COMMAND} -s -- --modules "${moduleIds.join(',')}"`;

export const NAV_LINKS = [
	{ to: '/#modules', label: 'Modules' },
	{ to: '/#configure', label: 'Configure' },
	{ to: '/docs', label: 'Docs' },
	{ to: '/changelog', label: 'Changelog' },
];
