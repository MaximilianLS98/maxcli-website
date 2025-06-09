import { useQuery } from '@tanstack/react-query';

export interface GitHubRelease {
	id: number;
	tag_name: string;
	name: string;
	body: string;
	published_at: string;
	prerelease: boolean;
	draft: boolean;
	html_url: string;
	assets: Array<{
		id: number;
		name: string;
		download_count: number;
		browser_download_url: string;
	}>;
}

export interface ProcessedRelease {
	version: string;
	date: string;
	type: 'major' | 'minor' | 'patch';
	description: string;
	changes: string[];
	downloads: number;
	isLatest: boolean;
	htmlUrl: string;
}

const fetchGitHubReleases = async (): Promise<GitHubRelease[]> => {
	const response = await fetch('https://api.github.com/repos/MaximilianLS98/MaxCLI/releases');

	if (!response.ok) {
		throw new Error(`Failed to fetch releases: ${response.status} ${response.statusText}`);
	}

	return response.json();
};

const determineReleaseType = (version: string): 'major' | 'minor' | 'patch' => {
	// Parse semantic version to determine type
	const versionMatch = version.match(/^v?(\d+)\.(\d+)\.(\d+)/);
	if (!versionMatch) return 'patch';

	const [, major, minor, patch] = versionMatch;

	// Simple heuristic: if it's x.0.0, it's major; if x.y.0, it's minor; otherwise patch
	if (patch === '0') {
		if (minor === '0') {
			return 'major';
		}
		return 'minor';
	}
	return 'patch';
};

const parseReleaseBody = (body: string): string[] => {
	if (!body) return ['No release notes available'];

	// Parse markdown body into change items
	const lines = body.split('\n').filter((line) => line.trim());
	const changes: string[] = [];

	for (const line of lines) {
		// Skip headers and empty lines
		if (line.startsWith('#') || line.trim() === '') continue;

		// Handle bullet points
		if (line.match(/^[-*+]\s/)) {
			changes.push(line.replace(/^[-*+]\s/, '').trim());
		}
		// Handle numbered lists
		else if (line.match(/^\d+\.\s/)) {
			changes.push(line.replace(/^\d+\.\s/, '').trim());
		}
		// Handle regular paragraphs as single changes
		else if (line.trim() && !line.startsWith('##')) {
			changes.push(line.trim());
		}
	}

	return changes.length > 0 ? changes : ['No detailed release notes available'];
};

const processReleases = (releases: GitHubRelease[]): ProcessedRelease[] => {
	return releases
		.filter((release) => !release.draft) // Filter out draft releases
		.map((release, index) => {
			const totalDownloads = release.assets.reduce(
				(sum, asset) => sum + asset.download_count,
				0,
			);
			const changes = parseReleaseBody(release.body);

			return {
				version: release.tag_name,
				date: release.published_at.split('T')[0], // Extract date part
				type: determineReleaseType(release.tag_name),
				description: release.name || `Release ${release.tag_name}`,
				changes,
				downloads: totalDownloads,
				isLatest: index === 0, // First release is the latest
				htmlUrl: release.html_url,
			};
		});
};

export const useGitHubReleases = () => {
	return useQuery({
		queryKey: ['github-releases', 'MaximilianLS98/MaxCLI'],
		queryFn: fetchGitHubReleases,
		select: processReleases,
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
};
